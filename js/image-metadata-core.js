/**
 * Đọc và xoá metadata ảnh (JPEG, PNG, WebP) ở mức byte — không giải mã / nén lại điểm ảnh,
 * nên ảnh xuất ra giữ nguyên chất lượng. Dùng chung cho trang /images-metadata và test Node.
 *
 * strip() là thao tác cấp thấp: giữ những gì ảnh hưởng tới cách hiển thị (ICC, gamma, trong suốt,
 * animation, orientation) và tuỳ chọn giữ C2PA; xoá EXIF, XMP, IPTC, comment, text chunk.
 * Trang không gọi strip() trực tiếp mà đi qua ImageMetadataEditor.clean/apply — nơi áp chính sách
 * giữ bản quyền và nhãn AI.
 */
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    root.ImageMetadataCore = factory();
  }
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';

  var MIME = { jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' };
  var EXT = { jpeg: 'jpg', png: 'png', webp: 'webp' };

  var AI_TOOL_RE = /midjourney|dall[·\-\s]?e|chatgpt|openai|stable ?diffusion|comfyui|automatic1111|invokeai|novelai|firefly|imagen|gemini|leonardo|ideogram|\bflux\b|runway|\bsora\b|bing image|microsoft designer|meta ai|\bgrok\b|krea|nightcafe|dreamstudio|fooocus|\baigc\b/i;
  // IPTC DigitalSourceType: trainedAlgorithmicMedia, compositeWithTrainedAlgorithmicMedia, algorithmicMedia
  var AI_SOURCE_RE = /algorithmicMedia/i;
  var AI_PNG_KEY_RE = /^(parameters|prompt|workflow|dream|sd-metadata|invokeai_\w+|negative_prompt|generation_data|aigc|ai_metadata)$/i;

  var PNG_KEEP = ['IHDR', 'PLTE', 'IDAT', 'IEND', 'tRNS', 'gAMA', 'cHRM', 'sRGB', 'iCCP', 'sBIT',
    'pHYs', 'bKGD', 'cICP', 'mDCv', 'cLLI', 'acTL', 'fcTL', 'fdAT'];
  var WEBP_KEEP = ['VP8 ', 'VP8L', 'VP8X', 'ALPH', 'ANIM', 'ANMF', 'ICCP'];

  var XMP_SIG = 'http://ns.adobe.com/xap/1.0/\0';
  var XMP_EXT_SIG = 'http://ns.adobe.com/xmp/extension/\0';

  // ---------- byte helpers ----------

  function u16be(b, p) { return (b[p] << 8) | b[p + 1]; }
  function u32be(b, p) { return ((b[p] << 24) >>> 0) + ((b[p + 1] << 16) | (b[p + 2] << 8) | b[p + 3]); }
  function u32le(b, p) { return ((b[p + 3] << 24) >>> 0) + ((b[p + 2] << 16) | (b[p + 1] << 8) | b[p]); }

  function latin1(b) {
    var s = '';
    for (var i = 0; i < b.length; i += 8192) {
      s += String.fromCharCode.apply(null, b.subarray(i, Math.min(i + 8192, b.length)));
    }
    return s;
  }

  function utf8(b) {
    return new TextDecoder('utf-8').decode(b);
  }

  function startsWith(b, p, str) {
    if (p + str.length > b.length) return false;
    for (var i = 0; i < str.length; i++) if (b[p + i] !== str.charCodeAt(i)) return false;
    return true;
  }

  function concat(parts) {
    var total = 0;
    parts.forEach(function (p) { total += p.length; });
    var out = new Uint8Array(total);
    var off = 0;
    parts.forEach(function (p) { out.set(p, off); off += p.length; });
    return out;
  }

  function cleanText(s) {
    return String(s).replace(/\0+$/, '').trim();
  }

  function detectFormat(b) {
    if (!b || b.length < 12) return null;
    if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return 'jpeg';
    if (b[0] === 0x89 && startsWith(b, 1, 'PNG\r\n\x1a\n')) return 'png';
    if (startsWith(b, 0, 'RIFF') && startsWith(b, 8, 'WEBP')) return 'webp';
    return null;
  }

  // ---------- EXIF (TIFF) ----------

  var TYPE_SIZE = { 1: 1, 2: 1, 3: 2, 4: 4, 5: 8, 6: 1, 7: 1, 8: 2, 9: 4, 10: 8, 11: 4, 12: 8, 13: 4 };
  var IFD_POINTERS = { 0x8769: 'Exif', 0x8825: 'GPS', 0xa005: 'Interop' };
  var IFD0_TAGS = {
    0x010e: 'ImageDescription', 0x010f: 'Make', 0x0110: 'Model', 0x0112: 'Orientation',
    0x0131: 'Software', 0x0132: 'DateTime', 0x013b: 'Artist', 0x8298: 'Copyright'
  };
  var EXIF_TAGS = {
    0x9003: 'DateTimeOriginal', 0x9286: 'UserComment', 0xa430: 'CameraOwnerName',
    0xa433: 'LensMake', 0xa434: 'LensModel'
  };
  var ORIENTATION_LABELS = {
    1: 'Bình thường', 2: 'Lật ngang', 3: 'Xoay 180°', 4: 'Lật dọc',
    5: 'Lật ngang + xoay 270°', 6: 'Xoay 90° theo chiều kim đồng hồ',
    7: 'Lật ngang + xoay 90°', 8: 'Xoay 270° theo chiều kim đồng hồ'
  };

  // ASCII trong EXIF thực tế hay chứa UTF-8 (tiếng Việt); không hợp lệ thì coi là latin1
  function decodeText(b) {
    try { return cleanText(new TextDecoder('utf-8', { fatal: true }).decode(b)); } catch (e) { return cleanText(latin1(b)); }
  }

  function decodeUserComment(v, le) {
    // 8 byte đầu là mã charset: "ASCII\0\0\0", "UNICODE\0" (UCS-2 theo byte order của TIFF), "JIS"...
    var body = v.subarray(8);
    if (startsWith(v, 0, 'UNICODE')) {
      try { return cleanText(new TextDecoder(le ? 'utf-16le' : 'utf-16be').decode(body)); } catch (e) { /* rơi xuống text */ }
    }
    return decodeText(body);
  }

  /**
   * Đọc toàn bộ TIFF/EXIF: IFD0, Exif, GPS, Interop, IFD1 (thumbnail).
   * Mỗi entry: { tag, type, count, value } — value là string (ASCII), number/number[] (số),
   * number[] + raw [[tử, mẫu]] (RATIONAL), Uint8Array (BYTE/UNDEFINED).
   */
  function readTiff(t) {
    if (!t || t.length < 8) return null;
    var le = t[0] === 0x49 && t[1] === 0x49;
    if (!le && !(t[0] === 0x4d && t[1] === 0x4d)) return null;
    var dv = new DataView(t.buffer, t.byteOffset, t.byteLength);
    var r16 = function (p) { return dv.getUint16(p, le); };
    var r32 = function (p) { return dv.getUint32(p, le); };
    if (r16(2) !== 42) return null;

    var ifds = {};
    var order = [];
    var seen = {};
    var queue = [];

    function num(type, p) {
      switch (type) {
        case 3: return dv.getUint16(p, le);
        case 8: return dv.getInt16(p, le);
        case 4: case 13: return dv.getUint32(p, le);
        case 9: return dv.getInt32(p, le);
        case 11: return dv.getFloat32(p, le);
        case 12: return dv.getFloat64(p, le);
        default: return t[p];
      }
    }

    function decode(type, count, vp) {
      if (type === 2) return { value: decodeText(t.subarray(vp, vp + count)) };
      if (type === 1 || type === 6 || type === 7) return { value: t.subarray(vp, vp + count) };
      if (type === 5 || type === 10) {
        var raw = [];
        for (var k = 0; k < count; k++) {
          var n = type === 5 ? r32(vp + k * 8) : dv.getInt32(vp + k * 8, le);
          var d = type === 5 ? r32(vp + k * 8 + 4) : dv.getInt32(vp + k * 8 + 4, le);
          raw.push([n, d]);
        }
        return { value: raw.map(function (r) { return r[1] ? r[0] / r[1] : 0; }), raw: raw };
      }
      var size = TYPE_SIZE[type];
      if (count === 1) return { value: num(type, vp) };
      var arr = [];
      for (var i = 0; i < count; i++) arr.push(num(type, vp + i * size));
      return { value: arr };
    }

    function readIfd(name, off) {
      if (!off || seen[off] || off < 8 || off + 2 > t.length) return 0;
      seen[off] = true;
      var list = ifds[name] = [];
      order.push(name);
      var n = r16(off);
      for (var i = 0; i < n; i++) {
        var e = off + 2 + i * 12;
        if (e + 12 > t.length) break;
        var tag = r16(e), type = r16(e + 2), count = r32(e + 4);
        if (!TYPE_SIZE[type] || count > 1000000) continue;
        var size = TYPE_SIZE[type] * count;
        var vp = size <= 4 ? e + 8 : r32(e + 8);
        if (vp + size > t.length) continue;
        var d = decode(type, count, vp);
        var entry = { tag: tag, type: type, count: count, value: d.value };
        if (d.raw) entry.raw = d.raw;
        list.push(entry);
        if (IFD_POINTERS[tag] && typeof d.value === 'number') queue.push([IFD_POINTERS[tag], d.value]);
      }
      var next = off + 2 + n * 12;
      return next + 4 <= t.length ? r32(next) : 0;
    }

    var ifd1 = readIfd('IFD0', r32(4));
    while (queue.length) { var q = queue.shift(); readIfd(q[0], q[1]); }
    readIfd('IFD1', ifd1);
    return { le: le, ifds: ifds, order: order };
  }

  function tagMap(tiff, name) {
    var map = {};
    (tiff.ifds[name] || []).forEach(function (e) { map[e.tag] = e.value; });
    return map;
  }

  function gpsDegrees(tiff) {
    if (!tiff.ifds.GPS) return null;
    var gps = tagMap(tiff, 'GPS');
    var toDeg = function (a, ref) {
      if (!Array.isArray(a) || a.length < 3) return null;
      var d = a[0] + a[1] / 60 + a[2] / 3600;
      return /[SW]/.test(ref || '') ? -d : d;
    };
    return { lat: toDeg(gps[2], gps[1]), lon: toDeg(gps[4], gps[3]) };
  }

  function parseTiff(t) {
    var tiff = readTiff(t);
    if (!tiff) return null;
    var ifd0 = tagMap(tiff, 'IFD0');
    var out = { fields: {}, orientation: 1, gps: null };
    Object.keys(IFD0_TAGS).forEach(function (k) {
      var v = ifd0[k];
      if (v !== undefined && v !== null && v !== '' && !(v instanceof Uint8Array)) out.fields[IFD0_TAGS[k]] = v;
    });
    if (typeof ifd0[0x0112] === 'number') out.orientation = ifd0[0x0112];
    var exif = tagMap(tiff, 'Exif');
    Object.keys(EXIF_TAGS).forEach(function (k) {
      var v = exif[k];
      if (v === undefined || v === null) return;
      if (v instanceof Uint8Array) v = decodeUserComment(v, tiff.le);
      if (v !== '') out.fields[EXIF_TAGS[k]] = v;
    });
    var g = gpsDegrees(tiff);
    if (g) out.gps = g.lat !== null && g.lon !== null ? g.lat.toFixed(6) + ', ' + g.lon.toFixed(6) : 'Có (không đọc được toạ độ)';
    return out;
  }

  function minimalTiff(orientation) {
    // TIFF big-endian với đúng 1 tag Orientation (SHORT), next-IFD = 0
    return new Uint8Array([0x4d, 0x4d, 0x00, 0x2a, 0x00, 0x00, 0x00, 0x08,
      0x00, 0x01, 0x01, 0x12, 0x00, 0x03, 0x00, 0x00, 0x00, 0x01, 0x00, orientation, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00]);
  }

  function minimalExifApp1(orientation) {
    var tiff = minimalTiff(orientation);
    var len = 2 + 6 + tiff.length;
    return concat([new Uint8Array([0xff, 0xe1, len >> 8, len & 0xff, 0x45, 0x78, 0x69, 0x66, 0x00, 0x00]), tiff]);
  }

  function hasOrientation(o) {
    return o >= 2 && o <= 8;
  }

  var CRC_TABLE = null;
  function crc32(b) {
    if (!CRC_TABLE) {
      CRC_TABLE = new Uint32Array(256);
      for (var n = 0; n < 256; n++) {
        var c = n;
        for (var k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
        CRC_TABLE[n] = c >>> 0;
      }
    }
    var crc = 0xffffffff;
    for (var i = 0; i < b.length; i++) crc = CRC_TABLE[(crc ^ b[i]) & 0xff] ^ (crc >>> 8);
    return (crc ^ 0xffffffff) >>> 0;
  }

  // ---------- XMP / C2PA text scanning ----------

  function xmpField(xml, name) {
    var esc = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    var m = xml.match(new RegExp(esc + '\\s*=\\s*"([^"]*)"')) ||
      xml.match(new RegExp('<' + esc + '[^>]*rdf:resource="([^"]*)"')) ||
      xml.match(new RegExp('<' + esc + '(?:\\s[^>]*)?>([\\s\\S]*?)</' + esc + '>'));
    if (!m) return null;
    var v = m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    return v || null;
  }

  var XMP_FIELDS = ['xmp:CreatorTool', 'Iptc4xmpExt:DigitalSourceType', 'photoshop:Credit', 'dc:creator',
    'dc:description', 'dc:title', 'xmp:CreateDate', 'tiff:Software', 'exif:UserComment', 'dc:rights'];

  function c2paSummary(bytes) {
    var s = latin1(bytes);
    var out = { generator: null, tools: [], aiSource: AI_SOURCE_RE.test(s) };
    var i = s.indexOf('claim_generator');
    if (i !== -1) {
      var p = i + 15, h = bytes[p], len = -1;
      if (h >= 0x60 && h <= 0x77) { len = h - 0x60; p += 1; }
      else if (h === 0x78) { len = bytes[p + 1]; p += 2; }
      if (len > 0) out.generator = cleanText(utf8(bytes.subarray(p, p + len)));
    }
    var known = ['OpenAI', 'ChatGPT', 'DALL-E', 'Adobe Firefly', 'Adobe Photoshop', 'Google', 'Gemini', 'Imagen',
      'Microsoft', 'Bing', 'Designer', 'Midjourney', 'Meta', 'Truepic', 'Samsung', 'Leica', 'Sony', 'Nikon'];
    known.forEach(function (k) { if (s.indexOf(k) !== -1) out.tools.push(k); });
    return out;
  }

  // ---------- JPEG ----------

  function walkJpeg(b, onSegment) {
    // onSegment(marker, start, end, payloadStart) cho mỗi segment; trả về vị trí ngay sau EOI, -1 nếu thiếu EOI
    var p = 2;
    while (p < b.length) {
      if (b[p] !== 0xff) throw new Error('JPEG hỏng: thiếu marker tại byte ' + p);
      var m = b[p + 1];
      if (m === 0xff) { p++; continue; }
      if (m === 0xd9) return p + 2;
      if (m === 0x01 || (m >= 0xd0 && m <= 0xd7)) { onSegment(m, p, p + 2, p + 2); p += 2; continue; }
      if (p + 4 > b.length) throw new Error('JPEG hỏng: segment bị cắt');
      var end = p + 2 + u16be(b, p + 2);
      if (end > b.length) throw new Error('JPEG hỏng: segment vượt quá độ dài file');
      if (m === 0xda) {
        // SOS: nhảy qua entropy data tới marker thật kế tiếp (bỏ qua FF00 và RSTn)
        var q = end;
        while (q < b.length - 1) {
          if (b[q] === 0xff) {
            var n = b[q + 1];
            if (n !== 0x00 && n !== 0xff && !(n >= 0xd0 && n <= 0xd7)) break;
          }
          q++;
        }
        if (q >= b.length - 1) q = b.length;
        onSegment(m, p, q, p + 4);
        p = q;
        continue;
      }
      onSegment(m, p, end, p + 4);
      p = end;
    }
    return -1;
  }

  function classifyJpegSegment(b, m, payload) {
    if (m === 0xe0 && (startsWith(b, payload, 'JFIF\0') || startsWith(b, payload, 'JFXX\0'))) return { keep: true };
    if (m === 0xee && startsWith(b, payload, 'Adobe')) return { keep: true };
    if (m === 0xe2 && startsWith(b, payload, 'ICC_PROFILE\0')) return { keep: true, label: 'ICC profile' };
    if (m === 0xe1 && startsWith(b, payload, 'Exif\0')) return { keep: false, group: 'EXIF', label: 'EXIF' };
    if (m === 0xe1 && startsWith(b, payload, XMP_SIG)) return { keep: false, group: 'XMP', label: 'XMP' };
    if (m === 0xe1 && startsWith(b, payload, XMP_EXT_SIG)) return { keep: false, group: 'XMP', label: 'Extended XMP' };
    if (m === 0xeb) return { keep: false, group: 'C2PA', label: 'C2PA / JUMBF (APP11)' };
    if (m === 0xed) return { keep: false, group: 'IPTC', label: 'Photoshop / IPTC (APP13)' };
    if (m === 0xe2 && startsWith(b, payload, 'MPF\0')) return { keep: false, group: 'Khác', label: 'MPF (ảnh phụ)' };
    if (m === 0xfe) return { keep: false, group: 'Comment', label: 'Comment (COM)' };
    if (m >= 0xe0 && m <= 0xef) return { keep: false, group: 'Khác', label: 'APP' + (m - 0xe0) };
    return { keep: true };
  }

  function stripJpeg(b, opts) {
    var parts = [b.subarray(0, 2)];
    var removed = [];
    var orientation = 1;
    var insertAt = 1; // chèn EXIF tối thiểu ngay sau SOI (+ APP0 JFIF nếu có)
    var eoi = walkJpeg(b, function (m, start, end, payload) {
      var c = classifyJpegSegment(b, m, payload);
      if (c.keep || (opts.keepC2pa && c.group === 'C2PA')) {
        parts.push(b.subarray(start, end));
        if (m === 0xe0 && parts.length === 2) insertAt = 2;
        return;
      }
      if (c.label === 'EXIF') {
        var exif = parseTiff(b.subarray(payload + 6, end));
        if (exif) orientation = exif.orientation;
      }
      removed.push({ group: c.group, label: c.label, size: end - start });
    });
    if (eoi !== -1) parts.push(b.subarray(eoi - 2, eoi));
    if (eoi !== -1 && eoi < b.length) {
      removed.push({ group: 'Khác', label: 'Dữ liệu sau EOI (ảnh phụ / gain map / trailer)', size: b.length - eoi });
    }
    if (opts.keepOrientation && hasOrientation(orientation)) {
      parts.splice(insertAt, 0, minimalExifApp1(orientation));
    }
    return { bytes: concat(parts), removed: removed };
  }

  function inspectJpeg(b, add) {
    var c2pa = [];
    walkJpeg(b, function (m, start, end, payload) {
      var c = classifyJpegSegment(b, m, payload);
      if (m === 0xe2 && c.label === 'ICC profile') {
        add('Màu (giữ lại)', 'ICC profile', (end - start) + ' byte');
      } else if (c.label === 'EXIF') {
        addExif(parseTiff(b.subarray(payload + 6, end)), add);
      } else if (c.label === 'XMP') {
        addXmp(utf8(b.subarray(payload + XMP_SIG.length, end)), add);
      } else if (c.label === 'Extended XMP') {
        add('XMP', 'Extended XMP', (end - start) + ' byte');
      } else if (c.group === 'C2PA') {
        c2pa.push(b.subarray(payload, end));
      } else if (c.group === 'IPTC') {
        var s = latin1(b.subarray(payload, end));
        add('IPTC', 'Photoshop / IPTC', (end - start) + ' byte', AI_SOURCE_RE.test(s));
      } else if (c.group === 'Comment') {
        var txt = cleanText(utf8(b.subarray(payload, end)));
        add('Comment', 'COM', txt, AI_TOOL_RE.test(txt));
      } else if (!c.keep) {
        add('Khác', c.label, (end - start) + ' byte');
      }
    });
    if (c2pa.length) addC2pa(concat(c2pa), add);
  }

  // ---------- PNG ----------

  function walkPng(b, onChunk) {
    var p = 8;
    while (p + 12 <= b.length) {
      var len = u32be(b, p);
      var type = latin1(b.subarray(p + 4, p + 8));
      var end = p + 12 + len;
      if (end > b.length) throw new Error('PNG hỏng: chunk ' + type + ' vượt quá độ dài file');
      onChunk(type, p, end, b.subarray(p + 8, p + 8 + len));
      p = end;
      if (type === 'IEND') return p;
    }
    throw new Error('PNG hỏng: không có IEND');
  }

  function pngLabel(type) {
    if (type === 'tEXt' || type === 'zTXt' || type === 'iTXt') return { group: 'PNG text', label: 'Text chunk ' + type };
    if (type === 'eXIf') return { group: 'EXIF', label: 'EXIF (eXIf)' };
    if (type === 'caBX') return { group: 'C2PA', label: 'C2PA (caBX)' };
    if (type === 'tIME') return { group: 'Khác', label: 'Thời gian sửa (tIME)' };
    return { group: 'Khác', label: 'Chunk ' + type };
  }

  function pngChunk(type, data) {
    var out = new Uint8Array(12 + data.length);
    var len = data.length;
    out.set([len >>> 24, (len >>> 16) & 0xff, (len >>> 8) & 0xff, len & 0xff]);
    for (var i = 0; i < 4; i++) out[4 + i] = type.charCodeAt(i);
    out.set(data, 8);
    var crc = crc32(out.subarray(4, 8 + len));
    out.set([crc >>> 24, (crc >>> 16) & 0xff, (crc >>> 8) & 0xff, crc & 0xff], 8 + len);
    return out;
  }

  function stripPng(b, opts) {
    var parts = [b.subarray(0, 8)];
    var removed = [];
    var orientation = 1;
    var iend = walkPng(b, function (type, start, end, data) {
      if (PNG_KEEP.indexOf(type) !== -1 || (opts.keepC2pa && type === 'caBX')) {
        // eXIf phải đứng trước IDAT đầu tiên: chèn lại Orientation tối thiểu ngay trước nó
        if (type === 'IDAT' && opts.keepOrientation && hasOrientation(orientation)) {
          parts.push(pngChunk('eXIf', minimalTiff(orientation)));
          orientation = 1;
        }
        parts.push(b.subarray(start, end));
        return;
      }
      if (type === 'eXIf') {
        var exif = parseTiff(data);
        if (exif) orientation = exif.orientation;
      }
      var l = pngLabel(type);
      if (type === 'tEXt' || type === 'zTXt' || type === 'iTXt') {
        var z = data.indexOf(0);
        if (z > 0) l.label += ' "' + latin1(data.subarray(0, z)) + '"';
      }
      removed.push({ group: l.group, label: l.label, size: end - start });
    });
    if (iend < b.length) removed.push({ group: 'Khác', label: 'Dữ liệu sau IEND', size: b.length - iend });
    return { bytes: concat(parts), removed: removed };
  }

  function parsePngText(type, d) {
    var z = d.indexOf(0);
    if (z < 0) return null;
    var key = latin1(d.subarray(0, z));
    if (type === 'tEXt') return { key: key, value: latin1(d.subarray(z + 1)) };
    if (type === 'zTXt') return { key: key, compressed: d.subarray(z + 2) };
    // iTXt: key\0 flag method lang\0 translated\0 text
    var flag = d[z + 1];
    var p = z + 3;
    var z2 = d.indexOf(0, p); if (z2 < 0) return null;
    var z3 = d.indexOf(0, z2 + 1); if (z3 < 0) return null;
    var body = d.subarray(z3 + 1);
    return flag ? { key: key, compressed: body, utf8: true } : { key: key, value: utf8(body) };
  }

  function inspectPng(b, add) {
    walkPng(b, function (type, start, end, data) {
      if (type === 'iCCP') { add('Màu (giữ lại)', 'ICC profile (iCCP)', (end - start) + ' byte'); return; }
      if (type === 'eXIf') { addExif(parseTiff(data), add); return; }
      if (type === 'caBX') { addC2pa(data, add); return; }
      if (type === 'tIME' && data.length >= 7) {
        add('Khác', 'tIME', u16be(data, 0) + '-' + data[2] + '-' + data[3] + ' ' + data[4] + ':' + data[5] + ':' + data[6]);
        return;
      }
      if (type === 'tEXt' || type === 'zTXt' || type === 'iTXt') {
        var t = parsePngText(type, data);
        if (!t) return;
        if (t.key === 'XML:com.adobe.xmp' && t.value !== undefined) { addXmp(t.value, add); return; }
        var isAi = AI_PNG_KEY_RE.test(t.key) || (t.value !== undefined && (AI_TOOL_RE.test(t.value) || AI_SOURCE_RE.test(t.value)));
        add('PNG text', t.key, t.value !== undefined ? t.value : null, isAi, t.compressed ? { data: t.compressed } : null);
        return;
      }
      if (PNG_KEEP.indexOf(type) === -1) add('Khác', 'Chunk ' + type, (end - start) + ' byte');
    });
  }

  // ---------- WebP ----------

  function walkWebp(b, onChunk) {
    var riffEnd = Math.min(b.length, 8 + u32le(b, 4));
    var p = 12;
    while (p + 8 <= riffEnd) {
      var type = latin1(b.subarray(p, p + 4));
      var len = u32le(b, p + 4);
      var end = p + 8 + len + (len & 1);
      if (p + 8 + len > b.length) throw new Error('WebP hỏng: chunk ' + type + ' vượt quá độ dài file');
      onChunk(type, p, Math.min(end, b.length), b.subarray(p + 8, p + 8 + len));
      p = end;
    }
  }

  function webpLabel(type) {
    if (type === 'EXIF') return { group: 'EXIF', label: 'EXIF' };
    if (type === 'XMP ') return { group: 'XMP', label: 'XMP' };
    if (type === 'C2PA') return { group: 'C2PA', label: 'C2PA' };
    return { group: 'Khác', label: 'Chunk ' + type.trim() };
  }

  function stripWebp(b, opts) {
    var parts = [];
    var removed = [];
    var vp8x = null;
    var orientation = 1;
    walkWebp(b, function (type, start, end, data) {
      if (WEBP_KEEP.indexOf(type) === -1 && !(opts.keepC2pa && type === 'C2PA')) {
        if (type === 'EXIF') {
          var exif = parseTiff(startsWith(data, 0, 'Exif\0\0') ? data.subarray(6) : data);
          if (exif) orientation = exif.orientation;
        }
        var l = webpLabel(type);
        removed.push({ group: l.group, label: l.label, size: end - start });
        return;
      }
      var chunk = b.slice(start, end);
      if (type === 'VP8X') { chunk[8] &= ~0x0c; vp8x = chunk; } // tắt cờ EXIF (0x08) và XMP (0x04)
      parts.push(chunk);
    });
    // EXIF chỉ hợp lệ khi có VP8X; đặt ở cuối file theo spec, bật lại cờ EXIF
    if (vp8x && opts.keepOrientation && hasOrientation(orientation)) {
      var tiff = minimalTiff(orientation);
      var head = new Uint8Array([0x45, 0x58, 0x49, 0x46, tiff.length, 0, 0, 0]);
      parts.push(concat([head, tiff]));
      vp8x[8] |= 0x08;
    }
    var body = concat(parts);
    var out = new Uint8Array(12 + body.length);
    out.set(b.subarray(0, 12));
    var size = 4 + body.length;
    out[4] = size & 0xff; out[5] = (size >>> 8) & 0xff; out[6] = (size >>> 16) & 0xff; out[7] = (size >>> 24) & 0xff;
    out.set(body, 12);
    return { bytes: out, removed: removed };
  }

  function inspectWebp(b, add) {
    walkWebp(b, function (type, start, end, data) {
      if (type === 'ICCP') add('Màu (giữ lại)', 'ICC profile', (end - start) + ' byte');
      else if (type === 'EXIF') addExif(parseTiff(startsWith(data, 0, 'Exif\0\0') ? data.subarray(6) : data), add);
      else if (type === 'XMP ') addXmp(utf8(data), add);
      else if (type === 'C2PA') addC2pa(data, add);
      else if (WEBP_KEEP.indexOf(type) === -1) add('Khác', 'Chunk ' + type.trim(), (end - start) + ' byte');
    });
  }

  // ---------- shared inspect adders ----------

  function addExif(exif, add) {
    if (!exif) { add('EXIF', 'EXIF', 'Không đọc được'); return; }
    Object.keys(exif.fields).forEach(function (k) {
      var v = exif.fields[k];
      var text = Array.isArray(v) ? v.join(', ') : String(v);
      add('EXIF', k, text, (k === 'Software' || k === 'Artist' || k === 'ImageDescription' || k === 'UserComment' || k === 'Make') && AI_TOOL_RE.test(text));
    });
    if (exif.gps) add('EXIF', 'GPS', exif.gps);
    if (!Object.keys(exif.fields).length && !exif.gps) add('EXIF', 'EXIF', 'Có (không có trường phổ biến)');
  }

  function addXmp(xml, add) {
    var found = false;
    XMP_FIELDS.forEach(function (name) {
      var v = xmpField(xml, name);
      if (!v) return;
      found = true;
      add('XMP', name, v, AI_SOURCE_RE.test(v) || AI_TOOL_RE.test(v));
    });
    if (!found || (AI_SOURCE_RE.test(xml) && !xmpField(xml, 'Iptc4xmpExt:DigitalSourceType'))) {
      add('XMP', 'XMP', xml.length + ' ký tự', AI_SOURCE_RE.test(xml));
    }
    if (/c2pa|contentcredentials/i.test(xml)) add('XMP', 'Tham chiếu C2PA', 'Có', true);
  }

  function addC2pa(bytes, add) {
    var s = c2paSummary(bytes);
    add('C2PA', 'Content Credentials', bytes.length + ' byte', true);
    if (s.generator) add('C2PA', 'claim_generator', s.generator, true);
    if (s.tools.length) add('C2PA', 'Nhắc tới', s.tools.join(', '));
    if (s.aiSource) add('C2PA', 'digitalSourceType', 'trainedAlgorithmicMedia (tạo bởi AI)', true);
  }

  // TIFF (EXIF) đầu tiên tìm thấy trong file, bất kể định dạng
  function findExif(b) {
    var format = detectFormat(b);
    var found = null;
    if (format === 'jpeg') {
      walkJpeg(b, function (m, start, end, payload) {
        if (!found && m === 0xe1 && startsWith(b, payload, 'Exif\0')) found = b.subarray(payload + 6, end);
      });
    } else if (format === 'png') {
      walkPng(b, function (type, start, end, data) { if (!found && type === 'eXIf') found = data; });
    } else if (format === 'webp') {
      walkWebp(b, function (type, start, end, data) {
        if (!found && type === 'EXIF') found = startsWith(data, 0, 'Exif\0\0') ? data.subarray(6) : data;
      });
    }
    return found;
  }

  // Gói XMP đầu tiên (không nén) tìm thấy trong file
  function findXmp(b) {
    var format = detectFormat(b);
    var found = null;
    if (format === 'jpeg') {
      walkJpeg(b, function (m, start, end, payload) {
        if (found === null && m === 0xe1 && startsWith(b, payload, XMP_SIG)) found = utf8(b.subarray(payload + XMP_SIG.length, end));
      });
    } else if (format === 'png') {
      walkPng(b, function (type, start, end, data) {
        if (found !== null || type !== 'iTXt') return;
        var t = parsePngText(type, data);
        if (t && t.key === 'XML:com.adobe.xmp' && t.value !== undefined) found = t.value;
      });
    } else if (format === 'webp') {
      walkWebp(b, function (type, start, end, data) { if (found === null && type === 'XMP ') found = utf8(data); });
    }
    return found;
  }

  // ---------- public API ----------

  function inspect(bytes) {
    var format = detectFormat(bytes);
    if (!format) throw new Error('Định dạng không hỗ trợ. Chỉ nhận JPEG, PNG, WebP.');
    var entries = [];
    var add = function (group, key, value, isAi, compressed) {
      var e = { group: group, key: key, value: value, isAi: !!isAi };
      if (compressed) e.compressed = compressed.data;
      entries.push(e);
    };
    if (format === 'jpeg') inspectJpeg(bytes, add);
    else if (format === 'png') inspectPng(bytes, add);
    else inspectWebp(bytes, add);
    return {
      format: format,
      mime: MIME[format],
      size: bytes.length,
      entries: entries,
      aiSignals: aiSignals(entries)
    };
  }

  function aiSignals(entries) {
    var seen = {};
    return entries.filter(function (e) { return e.isAi; }).map(function (e) {
      var v = e.value === null || e.value === undefined ? '(nén)' : String(e.value);
      return e.group + ' · ' + e.key + (v.length > 80 ? ': ' + v.slice(0, 80) + '…' : ': ' + v);
    }).filter(function (s) { return seen[s] ? false : (seen[s] = true); });
  }

  function strip(bytes, opts) {
    opts = Object.assign({ keepOrientation: true, keepC2pa: false }, opts || {});
    var format = detectFormat(bytes);
    if (!format) throw new Error('Định dạng không hỗ trợ. Chỉ nhận JPEG, PNG, WebP.');
    var r = format === 'jpeg' ? stripJpeg(bytes, opts) : format === 'png' ? stripPng(bytes, opts) : stripWebp(bytes, opts);
    r.format = format;
    r.mime = MIME[format];
    return r;
  }

  return {
    MIME: MIME,
    EXT: EXT,
    AI_TOOL_RE: AI_TOOL_RE,
    AI_SOURCE_RE: AI_SOURCE_RE,
    AI_PNG_KEY_RE: AI_PNG_KEY_RE,
    ORIENTATION_LABELS: ORIENTATION_LABELS,
    detectFormat: detectFormat,
    inspect: inspect,
    aiSignals: aiSignals,
    strip: strip,
    readTiff: readTiff,
    findExif: findExif,
    findXmp: findXmp,
    // Dùng chung cho image-metadata-details.js / image-metadata-editor.js
    internal: {
      u16be: u16be, u32be: u32be, u32le: u32le, latin1: latin1, utf8: utf8, decodeText: decodeText,
      startsWith: startsWith, concat: concat, cleanText: cleanText, crc32: crc32, pngChunk: pngChunk,
      walkJpeg: walkJpeg, walkPng: walkPng, walkWebp: walkWebp, classifyJpegSegment: classifyJpegSegment,
      parsePngText: parsePngText, c2paSummary: c2paSummary, decodeUserComment: decodeUserComment,
      gpsDegrees: gpsDegrees, tagMap: tagMap, PNG_KEEP: PNG_KEEP, WEBP_KEEP: WEBP_KEEP,
      XMP_SIG: XMP_SIG, XMP_EXT_SIG: XMP_EXT_SIG
    }
  };
});
