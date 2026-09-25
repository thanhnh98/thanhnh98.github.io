/**
 * Chỉnh sửa / làm sạch thông số ảnh. Mọi ảnh xuất ra đều đi qua chính sách ở đây:
 *  - Bản quyền được bảo vệ: trường `protected` (bản quyền, tác giả, credit, điều khoản…) đã có trong
 *    ảnh gốc thì luôn được ghi lại nguyên giá trị gốc — không sửa, không xoá được. Ảnh chưa có thì được thêm.
 *  - Nhãn AI theo quy định: ảnh có dấu hiệu tạo bởi AI luôn mang nhãn IPTC DigitalSourceType trong XMP,
 *    và khối C2PA / Content Credentials gốc luôn được giữ nguyên byte.
 * Ảnh mới = ảnh đã bỏ metadata cũ + EXIF/XMP mới dựng từ form (+ DPI vào JFIF / pHYs). Các trường chữ
 * ghi thêm vào XMP (dc:*) vì EXIF ASCII không chuẩn cho tiếng Việt. Không đụng tới dữ liệu điểm ảnh.
 * Phụ thuộc js/image-metadata-core.js + js/image-metadata-details.js.
 */
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory(require('./image-metadata-core.js'), require('./image-metadata-details.js'));
  } else {
    root.ImageMetadataEditor = factory(root.ImageMetadataCore, root.ImageMetadataDetails);
  }
})(typeof window !== 'undefined' ? window : globalThis, function (core, details) {
  'use strict';

  var I = core.internal;
  var MAX_TEXT = 2000;
  var IPTC_SOURCE = 'http://cv.iptc.org/newscodes/digitalsourcetype/';
  var AI_SOURCE_TYPES = {
    trainedAlgorithmicMedia: 'Tạo hoàn toàn bởi AI',
    compositeWithTrainedAlgorithmicMedia: 'Có thành phần tạo bởi AI'
  };

  /**
   * Trường trong form. `tag`/`ifd` = nơi ghi trong EXIF, `xmp` = thuộc tính XMP; kind quyết định cách mã hoá.
   * group (logic): 'rights' (bản quyền, được bảo vệ) · 'ai' (nhãn AI) · 'info' (sửa tự do).
   * section (hiển thị): nhóm nhỏ trong form. writes: các trường metadata thực sự được ghi — hiện ngay dưới
   * tên ô cho người dùng biết, và được test đối chiếu với file xuất ra.
   */
  var FIELDS = [
    { id: 'copyright', group: 'rights', section: 'rights', protected: true, label: 'Bản quyền', input: 'text', ifd: 'IFD0', tag: 0x8298, kind: 'ascii', xmp: 'dc:rights', placeholder: '© 2026 Tên của bạn', writes: ['EXIF Copyright', 'XMP dc:rights'] },
    { id: 'artist', group: 'rights', section: 'rights', protected: true, label: 'Tác giả', input: 'text', ifd: 'IFD0', tag: 0x013b, kind: 'ascii', xmp: 'dc:creator', writes: ['EXIF Artist', 'XMP dc:creator'] },
    { id: 'credit', group: 'rights', section: 'rights', protected: true, label: 'Nguồn / credit', input: 'text', kind: 'xmpText', xmp: 'photoshop:Credit', writes: ['XMP photoshop:Credit'] },
    { id: 'rightsUrl', group: 'rights', section: 'rights', protected: true, label: 'Link bản quyền', input: 'url', kind: 'xmpText', xmp: 'xmpRights:WebStatement', placeholder: 'https://', writes: ['XMP xmpRights:WebStatement'] },
    { id: 'usageTerms', group: 'rights', section: 'rights', protected: true, label: 'Điều khoản sử dụng', input: 'textarea', kind: 'xmpText', xmp: 'xmpRights:UsageTerms', writes: ['XMP xmpRights:UsageTerms'] },
    { id: 'aiLabel', group: 'ai', section: 'ai', label: 'Ảnh do AI tạo', input: 'checkbox', kind: 'ai', writes: ['XMP Iptc4xmpExt:DigitalSourceType'] },
    { id: 'title', group: 'info', section: 'describe', label: 'Tiêu đề', input: 'text', ifd: 'IFD0', tag: 0x9c9b, kind: 'xp', xmp: 'dc:title', writes: ['EXIF XPTitle', 'XMP dc:title'] },
    { id: 'description', group: 'info', section: 'describe', label: 'Mô tả', input: 'textarea', ifd: 'IFD0', tag: 0x010e, kind: 'ascii', xmp: 'dc:description', writes: ['EXIF ImageDescription', 'XMP dc:description'] },
    { id: 'keywords', group: 'info', section: 'describe', label: 'Từ khoá', input: 'text', ifd: 'IFD0', tag: 0x9c9e, kind: 'xp', xmp: 'dc:subject', placeholder: 'tết; hoa đào; gia đình', writes: ['EXIF XPKeywords', 'XMP dc:subject'] },
    { id: 'comment', group: 'info', section: 'describe', label: 'Ghi chú', input: 'textarea', ifd: 'Exif', tag: 0x9286, kind: 'comment', writes: ['EXIF UserComment'] },
    { id: 'make', group: 'info', section: 'device', label: 'Hãng máy', input: 'text', ifd: 'IFD0', tag: 0x010f, kind: 'ascii', placeholder: 'Canon, Apple…', writes: ['EXIF Make'] },
    { id: 'model', group: 'info', section: 'device', label: 'Dòng máy', input: 'text', ifd: 'IFD0', tag: 0x0110, kind: 'ascii', writes: ['EXIF Model'] },
    { id: 'software', group: 'info', section: 'device', label: 'Phần mềm', input: 'text', ifd: 'IFD0', tag: 0x0131, kind: 'ascii', writes: ['EXIF Software'] },
    { id: 'dateTimeOriginal', group: 'info', section: 'time', label: 'Ngày chụp', input: 'datetime-local', ifd: 'Exif', tag: 0x9003, kind: 'date', writes: ['EXIF DateTimeOriginal', 'EXIF DateTimeDigitized'] },
    { id: 'dateTime', group: 'info', section: 'time', label: 'Ngày chỉnh sửa', input: 'datetime-local', ifd: 'IFD0', tag: 0x0132, kind: 'date', writes: ['EXIF DateTime'] },
    { id: 'latitude', group: 'info', section: 'location', label: 'Vĩ độ', input: 'number', kind: 'gps', placeholder: 'Vĩ độ, vd 21.0285', writes: ['EXIF GPSLatitude', 'EXIF GPSLatitudeRef'] },
    { id: 'longitude', group: 'info', section: 'location', label: 'Kinh độ', input: 'number', kind: 'gps', placeholder: 'Kinh độ, vd 105.8048', writes: ['EXIF GPSLongitude', 'EXIF GPSLongitudeRef'] },
    { id: 'orientation', group: 'info', section: 'display', label: 'Hướng xoay', input: 'select', ifd: 'IFD0', tag: 0x0112, kind: 'orientation', writes: ['EXIF Orientation'] },
    { id: 'dpi', group: 'info', section: 'display', label: 'DPI khi in', input: 'number', kind: 'dpi', placeholder: '72, 300…', writes: ['EXIF XResolution', 'EXIF YResolution', 'JFIF (JPEG)', 'pHYs (PNG)'] }
  ];

  // ---------- đọc giá trị hiện tại ----------

  var MONTHS = { jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06', jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12' };
  var pad2 = function (n) { return ('0' + n).slice(-2); };

  /**
   * Chuẩn hoá mọi kiểu ngày giờ hay gặp trong metadata về giá trị ô datetime-local (YYYY-MM-DDTHH:MM:SS).
   * Giữ nguyên "giờ treo tường" đã ghi, bỏ múi giờ (ô datetime-local không có múi giờ).
   *  EXIF "2026:01:28 08:30:00" · XMP/ISO "2026-01-28T08:30:00+07:00", "2026-01-28"
   *  IPTC "20260128" + "083000+0700" · PNG RFC 1123 "Tue, 28 Jan 2026 08:30:00 +0700"
   */
  function toInputDate(s) {
    s = String(s || '').trim();
    var m = /^(\d{4})[:-](\d{2})[:-](\d{2})(?:[ T](\d{2}):(\d{2})(?::(\d{2}))?)?/.exec(s);
    if (!m) {
      var c = /^(\d{4})(\d{2})(\d{2})(?:\s+(\d{2})(\d{2})(\d{2})?)?/.exec(s);
      if (c) m = c;
    }
    if (!m) {
      var r = /(\d{1,2})\s+([a-z]{3})[a-z]*\s+(\d{4})(?:\s+(\d{2}):(\d{2})(?::(\d{2}))?)?/i.exec(s);
      if (r && MONTHS[r[2].toLowerCase()]) m = [r[0], r[3], MONTHS[r[2].toLowerCase()], pad2(r[1]), r[4], r[5], r[6]];
    }
    if (!m || m[1] === '0000' || m[2] === '00') return '';
    return m[1] + '-' + m[2] + '-' + m[3] + 'T' + (m[4] || '00') + ':' + (m[5] || '00') + ':' + (m[6] || '00');
  }

  // "21,1.71N" / "21,1,42.6N" (XMP exif:GPSLatitude) → độ thập phân
  function xmpGps(v) {
    var m = /^(\d+(?:\.\d+)?),(\d+(?:\.\d+)?)(?:,(\d+(?:\.\d+)?))?([NSEW])$/i.exec(String(v || '').trim());
    if (!m) return null;
    var d = Number(m[1]) + Number(m[2]) / 60 + (m[3] ? Number(m[3]) / 3600 : 0);
    return /[SW]/i.test(m[4]) ? -d : d;
  }

  function rationalText(v) {
    var m = /^(\d+(?:\.\d+)?)(?:\/(\d+(?:\.\d+)?))?$/.exec(String(v || '').trim());
    if (!m) return null;
    var d = m[2] ? Number(m[2]) : 1;
    return d ? Number(m[1]) / d : null;
  }

  function readDpi(b, format, tiff, xmp) {
    var dpi = '';
    if (format === 'jpeg') {
      I.walkJpeg(b, function (m, start, end, payload) {
        if (dpi || m !== 0xe0 || !I.startsWith(b, payload, 'JFIF\0')) return;
        var units = b[payload + 7], xd = I.u16be(b, payload + 8);
        if (units === 1) dpi = String(xd);
        else if (units === 2) dpi = String(Math.round(xd * 2.54));
      });
    } else if (format === 'png') {
      I.walkPng(b, function (type, start, end, d) {
        if (type === 'pHYs' && d[8] === 1) dpi = String(Math.round(I.u32be(d, 0) * 0.0254));
      });
    }
    if (!dpi && tiff) {
      var ifd0 = I.tagMap(tiff, 'IFD0');
      var x = ifd0[0x011a], unit = ifd0[0x0128] || 2;
      if (Array.isArray(x) && x[0] > 0) dpi = String(Math.round(unit === 3 ? x[0] * 2.54 : x[0]));
    }
    if (!dpi && xmp['tiff:XResolution']) {
      var xr = rationalText(xmp['tiff:XResolution']);
      if (xr > 0) dpi = String(Math.round(xmp['tiff:ResolutionUnit'] === '3' ? xr * 2.54 : xr));
    }
    return dpi;
  }

  /**
   * Nơi đọc giá trị có sẵn cho từng ô, theo thứ tự ưu tiên (chuẩn trước, chỗ thay thế sau).
   * exif: [ifd, tag, tên] · xmp / iptc / png: tên thuộc tính / key.
   * Nhãn nguồn dùng cùng quy ước với `writes` ("EXIF Copyright", "XMP dc:rights"…).
   */
  var READ_SOURCES = {
    copyright: [['exif', 'IFD0', 0x8298, 'Copyright'], ['xmp', 'dc:rights'], ['iptc', 'CopyrightNotice'], ['png', 'Copyright']],
    artist: [['exif', 'IFD0', 0x013b, 'Artist'], ['exif', 'IFD0', 0x9c9d, 'XPAuthor'], ['xmp', 'dc:creator'], ['iptc', 'By-line'], ['png', 'Author']],
    credit: [['xmp', 'photoshop:Credit'], ['iptc', 'Credit']],
    rightsUrl: [['xmp', 'xmpRights:WebStatement']],
    usageTerms: [['xmp', 'xmpRights:UsageTerms'], ['png', 'Disclaimer']],
    title: [['exif', 'IFD0', 0x9c9b, 'XPTitle'], ['xmp', 'dc:title'], ['xmp', 'photoshop:Headline'], ['iptc', 'ObjectName'], ['iptc', 'Headline'], ['png', 'Title']],
    description: [['exif', 'IFD0', 0x010e, 'ImageDescription'], ['xmp', 'dc:description'], ['iptc', 'Caption-Abstract'], ['exif', 'IFD0', 0x9c9f, 'XPSubject'], ['png', 'Description']],
    keywords: [['exif', 'IFD0', 0x9c9e, 'XPKeywords'], ['xmp', 'dc:subject'], ['iptc', 'Keywords']],
    comment: [['exif', 'Exif', 0x9286, 'UserComment'], ['exif', 'IFD0', 0x9c9c, 'XPComment'], ['xmp', 'exif:UserComment'], ['png', 'Comment']],
    make: [['exif', 'IFD0', 0x010f, 'Make'], ['xmp', 'tiff:Make']],
    model: [['exif', 'IFD0', 0x0110, 'Model'], ['xmp', 'tiff:Model'], ['png', 'Source']],
    software: [['exif', 'IFD0', 0x0131, 'Software'], ['xmp', 'tiff:Software'], ['xmp', 'xmp:CreatorTool'], ['png', 'Software']],
    dateTimeOriginal: [['exif', 'Exif', 0x9003, 'DateTimeOriginal'], ['exif', 'Exif', 0x9004, 'DateTimeDigitized'], ['xmp', 'exif:DateTimeOriginal'],
      ['xmp', 'photoshop:DateCreated'], ['xmp', 'xmp:CreateDate'], ['iptc', 'DateCreated'], ['png', 'Creation Time']],
    dateTime: [['exif', 'IFD0', 0x0132, 'DateTime'], ['xmp', 'xmp:ModifyDate'], ['png', 'tIME']],
    orientation: [['exif', 'IFD0', 0x0112, 'Orientation'], ['xmp', 'tiff:Orientation']]
  };

  function sourceLabel(src) {
    if (src[0] === 'exif') return 'EXIF ' + src[3];
    if (src[0] === 'xmp') return 'XMP ' + src[1];
    if (src[0] === 'iptc') return 'IPTC ' + src[1];
    return src[1] === 'tIME' ? 'PNG tIME' : 'PNG ' + src[1];
  }

  // Gom mọi nguồn metadata của file một lần: EXIF, XMP, IPTC (JPEG), PNG text + tIME
  function collect(b, format) {
    var raw = core.findExif(b);
    var bag = { tiff: raw ? core.readTiff(raw) : null, xmp: {}, iptc: {}, png: {} };
    var xml = core.findXmp(b);
    if (xml) details.xmpProps(xml).forEach(function (r) { if (!(r.key in bag.xmp)) bag.xmp[r.key] = r.value; });
    if (format === 'jpeg') {
      I.walkJpeg(b, function (m, start, end, payload) {
        if (m !== 0xed) return;
        details.parseIptc(b.subarray(payload, end)).forEach(function (r) {
          if (r.key === 'Keywords' && bag.iptc.Keywords) bag.iptc.Keywords += '; ' + r.value; // IPTC lặp record cho mỗi từ khoá
          else if (!(r.key in bag.iptc)) bag.iptc[r.key] = r.value;
        });
      });
      if (bag.iptc.DateCreated) bag.iptc.DateCreated += ' ' + (bag.iptc.TimeCreated || '').slice(0, 6);
    } else if (format === 'png') {
      I.walkPng(b, function (type, start, end, d) {
        if (type === 'tIME' && d.length >= 7) {
          bag.png.time = I.u16be(d, 0) + '-' + pad2(d[2]) + '-' + pad2(d[3]) + 'T' + pad2(d[4]) + ':' + pad2(d[5]) + ':' + pad2(d[6]);
          return;
        }
        if (type !== 'tEXt' && type !== 'iTXt') return; // zTXt nén: bỏ qua (đọc đồng bộ)
        var t = I.parsePngText(type, d);
        if (t && t.value !== undefined && !(t.key.toLowerCase() in bag.png)) bag.png[t.key.toLowerCase()] = t.value;
      });
    }
    return bag;
  }

  function readSource(bag, src, f) {
    var v;
    if (src[0] === 'exif') {
      if (!bag.tiff) return '';
      v = I.tagMap(bag.tiff, src[1])[src[2]];
      if (v === undefined || v === null) return '';
      if (v instanceof Uint8Array) {
        v = src[3].indexOf('XP') === 0 ? new TextDecoder('utf-16le').decode(v).replace(/\0+$/, '')
          : src[3] === 'UserComment' ? I.decodeUserComment(v, bag.tiff.le) : '';
      }
    } else if (src[0] === 'xmp') v = bag.xmp[src[1]];
    else if (src[0] === 'iptc') v = bag.iptc[src[1]];
    else v = src[1] === 'tIME' ? bag.png.time : bag.png[src[1].toLowerCase()];
    if (v === undefined || v === null) return '';
    if (f.kind === 'date') return toInputDate(v);
    if (f.kind === 'orientation') { var o = parseInt(v, 10); return o >= 1 && o <= 8 ? String(o) : ''; }
    return String(v).trim();
  }

  /**
   * Giá trị có sẵn của mọi ô + nơi lấy được: { values: {id: string}, sources: {id: 'EXIF Copyright'} }.
   */
  function readEditableDetailed(b) {
    var format = core.detectFormat(b);
    if (!format) throw new Error('Định dạng không hỗ trợ. Chỉ nhận JPEG, PNG, WebP.');
    var bag = collect(b, format);
    var values = {};
    var sources = {};
    FIELDS.forEach(function (f) {
      values[f.id] = '';
      (READ_SOURCES[f.id] || []).some(function (src) {
        var v = readSource(bag, src, f);
        if (!v) return false;
        values[f.id] = v;
        sources[f.id] = sourceLabel(src);
        return true;
      });
    });
    if (!values.orientation) values.orientation = '1';

    var g = bag.tiff ? I.gpsDegrees(bag.tiff) : null;
    if (g && g.lat !== null && g.lon !== null) {
      sources.latitude = sources.longitude = 'EXIF GPS';
    } else {
      g = { lat: xmpGps(bag.xmp['exif:GPSLatitude']), lon: xmpGps(bag.xmp['exif:GPSLongitude']) };
      if (g.lat !== null && g.lon !== null) sources.latitude = sources.longitude = 'XMP exif:GPSLatitude';
    }
    if (g && g.lat !== null && g.lon !== null) {
      values.latitude = String(+g.lat.toFixed(6));
      values.longitude = String(+g.lon.toFixed(6));
    }
    values.dpi = readDpi(b, format, bag.tiff, bag.xmp);
    values.aiLabel = core.inspect(b).aiSignals.length ? 'true' : '';
    return { values: values, sources: sources };
  }

  function readEditable(b) {
    return readEditableDetailed(b).values;
  }

  // ---------- kiểm tra form ----------

  function normalize(values) {
    var out = {};
    FIELDS.forEach(function (f) {
      var v = values[f.id] === undefined || values[f.id] === null ? '' : String(values[f.id]).trim();
      if (f.kind === 'ai') {
        out[f.id] = v === 'true' || v === 'on' || values[f.id] === true;
      } else if (f.kind === 'ascii' || f.kind === 'xp' || f.kind === 'comment' || f.kind === 'xmpText') {
        if (v.length > MAX_TEXT) throw new Error('"' + f.label + '" quá dài (tối đa ' + MAX_TEXT + ' ký tự).');
        out[f.id] = v;
      } else if (f.kind === 'date') {
        if (!v) { out[f.id] = ''; return; }
        var m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(v);
        if (!m) throw new Error('"' + f.label + '" không đúng định dạng ngày giờ.');
        out[f.id] = m[1] + ':' + m[2] + ':' + m[3] + ' ' + m[4] + ':' + m[5] + ':' + (m[6] || '00');
      } else if (f.kind === 'orientation') {
        var o = parseInt(v || '1', 10);
        if (!(o >= 1 && o <= 8)) throw new Error('Hướng xoay không hợp lệ.');
        out[f.id] = o;
      } else if (f.kind === 'dpi') {
        if (!v) { out[f.id] = null; return; }
        var d = Number(v);
        if (!Number.isInteger(d) || d < 1 || d > 65535) throw new Error('DPI phải là số nguyên từ 1 đến 65535.');
        out[f.id] = d;
      } else if (f.kind === 'gps') {
        out[f.id] = v;
      }
    });
    if (out.latitude || out.longitude) {
      var lat = Number(out.latitude), lon = Number(out.longitude);
      if (!out.latitude || !out.longitude) throw new Error('Cần nhập cả vĩ độ và kinh độ (hoặc để trống cả hai).');
      if (!isFinite(lat) || lat < -90 || lat > 90) throw new Error('Vĩ độ phải nằm trong khoảng -90 đến 90.');
      if (!isFinite(lon) || lon < -180 || lon > 180) throw new Error('Kinh độ phải nằm trong khoảng -180 đến 180.');
      out.gps = { lat: lat, lon: lon };
    } else {
      out.gps = null;
    }
    return out;
  }

  // ---------- ghi EXIF (TIFF big-endian) ----------

  var encoder = new TextEncoder();

  function asciiBytes(s) { return I.concat([encoder.encode(s), new Uint8Array([0])]); }
  function shortBytes(n) { return new Uint8Array([n >> 8, n & 0xff]); }
  function longBytes(n) { return new Uint8Array([n >>> 24, (n >>> 16) & 0xff, (n >>> 8) & 0xff, n & 0xff]); }
  function rationalBytes(pairs) { return I.concat(pairs.map(function (p) { return I.concat([longBytes(p[0]), longBytes(p[1])]); })); }

  function ucs2(s, bigEndian) {
    var out = new Uint8Array(s.length * 2);
    for (var i = 0; i < s.length; i++) {
      var c = s.charCodeAt(i);
      out[i * 2] = bigEndian ? c >> 8 : c & 0xff;
      out[i * 2 + 1] = bigEndian ? c & 0xff : c >> 8;
    }
    return out;
  }

  function degToRational(v) {
    var a = Math.abs(v);
    var d = Math.floor(a);
    var mFloat = (a - d) * 60;
    var m = Math.floor(mFloat);
    var s = Math.round((mFloat - m) * 60 * 10000);
    return [[d, 1], [m, 1], [s, 10000]];
  }

  function entry(tag, type, data, count) {
    return { tag: tag, type: type, data: data, count: count === undefined ? data.length : count };
  }

  function buildTiff(e) {
    var ifd0 = [], exif = [], gps = [];
    var put = function (f, list, item) { if (item) list.push(item); };
    FIELDS.forEach(function (f) {
      var v = e[f.id];
      if (!f.tag || v === '' || v === null || v === undefined) return;
      var list = f.ifd === 'Exif' ? exif : ifd0;
      if (f.kind === 'ascii' || f.kind === 'date') put(f, list, entry(f.tag, 2, asciiBytes(v)));
      else if (f.kind === 'xp') put(f, list, entry(f.tag, 1, I.concat([ucs2(v, false), new Uint8Array(2)])));
      else if (f.kind === 'comment') {
        var isAscii = /^[\x00-\x7f]*$/.test(v);
        var head = I.concat([encoder.encode(isAscii ? 'ASCII' : 'UNICODE'), new Uint8Array(isAscii ? 3 : 1)]);
        put(f, list, entry(f.tag, 7, I.concat([head, isAscii ? encoder.encode(v) : ucs2(v, true)])));
      } else if (f.kind === 'orientation' && v !== 1) put(f, list, entry(f.tag, 3, shortBytes(v), 1));
    });
    if (e.dateTimeOriginal) exif.push(entry(0x9004, 2, asciiBytes(e.dateTimeOriginal))); // DateTimeDigitized
    if (e.dpi) {
      ifd0.push(entry(0x011a, 5, rationalBytes([[e.dpi, 1]]), 1));
      ifd0.push(entry(0x011b, 5, rationalBytes([[e.dpi, 1]]), 1));
      ifd0.push(entry(0x0128, 3, shortBytes(2), 1));
    }
    if (e.gps) {
      gps.push(entry(0, 1, new Uint8Array([2, 3, 0, 0])));
      gps.push(entry(1, 2, asciiBytes(e.gps.lat < 0 ? 'S' : 'N')));
      gps.push(entry(2, 5, rationalBytes(degToRational(e.gps.lat)), 3));
      gps.push(entry(3, 2, asciiBytes(e.gps.lon < 0 ? 'W' : 'E')));
      gps.push(entry(4, 5, rationalBytes(degToRational(e.gps.lon)), 3));
    }
    if (exif.length) exif.push(entry(0x9000, 7, encoder.encode('0232')));
    if (!ifd0.length && !exif.length && !gps.length) return null;

    var ifds = [{ name: 'IFD0', entries: ifd0 }];
    if (exif.length) { ifd0.push(entry(0x8769, 4, longBytes(0), 1)); ifds.push({ name: 'Exif', entries: exif }); }
    if (gps.length) { ifd0.push(entry(0x8825, 4, longBytes(0), 1)); ifds.push({ name: 'GPS', entries: gps }); }

    // Bố cục: header 8 byte, rồi lần lượt [IFD + vùng dữ liệu của nó]
    var cur = 8;
    ifds.forEach(function (ifd) {
      ifd.entries.sort(function (a, z) { return a.tag - z.tag; });
      ifd.off = cur;
      cur += 2 + ifd.entries.length * 12 + 4;
      ifd.dataOff = cur;
      ifd.entries.forEach(function (en) { if (en.data.length > 4) cur += en.data.length + (en.data.length & 1); });
    });
    var byName = {};
    ifds.forEach(function (ifd) { byName[ifd.name] = ifd; });
    ifd0.forEach(function (en) {
      if (en.tag === 0x8769) en.data = longBytes(byName.Exif.off);
      if (en.tag === 0x8825) en.data = longBytes(byName.GPS.off);
    });

    var out = new Uint8Array(cur);
    out.set([0x4d, 0x4d, 0x00, 0x2a, 0x00, 0x00, 0x00, 0x08]);
    ifds.forEach(function (ifd) {
      var p = ifd.off;
      out.set(shortBytes(ifd.entries.length), p);
      var dp = ifd.dataOff;
      ifd.entries.forEach(function (en, i) {
        var e0 = p + 2 + i * 12;
        out.set(shortBytes(en.tag), e0);
        out.set(shortBytes(en.type), e0 + 2);
        out.set(longBytes(en.count), e0 + 4);
        if (en.data.length <= 4) {
          out.set(en.data, e0 + 8);
        } else {
          out.set(longBytes(dp), e0 + 8);
          out.set(en.data, dp);
          dp += en.data.length + (en.data.length & 1);
        }
      });
      // next-IFD = 0 (đã là 0)
    });
    return out;
  }

  // ---------- ghi XMP (dc:*) ----------

  function xmlEscape(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  var XMP_NS = {
    dc: 'http://purl.org/dc/elements/1.1/',
    photoshop: 'http://ns.adobe.com/photoshop/1.0/',
    xmpRights: 'http://ns.adobe.com/xap/1.0/rights/',
    Iptc4xmpExt: 'http://iptc.org/std/Iptc4xmpExt/2008-02-29/'
  };
  var XMP_ALT = ['dc:title', 'dc:description', 'dc:rights', 'xmpRights:UsageTerms'];

  function buildXmp(e, aiSourceType) {
    var parts = [];
    FIELDS.forEach(function (f) {
      var v = e[f.id];
      if (!f.xmp || !v) return;
      if (f.xmp === 'dc:subject') {
        var items = v.split(/[;,]/).map(function (k) { return k.trim(); }).filter(Boolean);
        parts.push('<dc:subject><rdf:Bag>' + items.map(function (k) { return '<rdf:li>' + xmlEscape(k) + '</rdf:li>'; }).join('') + '</rdf:Bag></dc:subject>');
      } else if (f.xmp === 'dc:creator') {
        parts.push('<dc:creator><rdf:Seq><rdf:li>' + xmlEscape(v) + '</rdf:li></rdf:Seq></dc:creator>');
      } else if (XMP_ALT.indexOf(f.xmp) !== -1) {
        parts.push('<' + f.xmp + '><rdf:Alt><rdf:li xml:lang="x-default">' + xmlEscape(v) + '</rdf:li></rdf:Alt></' + f.xmp + '>');
      } else {
        parts.push('<' + f.xmp + '>' + xmlEscape(v) + '</' + f.xmp + '>');
      }
    });
    if (e.copyright) parts.push('<xmpRights:Marked>True</xmpRights:Marked>');
    if (e.aiLabel) parts.push('<Iptc4xmpExt:DigitalSourceType>' + IPTC_SOURCE + (aiSourceType || 'trainedAlgorithmicMedia') + '</Iptc4xmpExt:DigitalSourceType>');
    if (!parts.length) return null;
    var ns = Object.keys(XMP_NS).map(function (k) { return ' xmlns:' + k + '="' + XMP_NS[k] + '"'; }).join('');
    return '<?xpacket begin="\ufeff" id="W5M0MpCehiHzreSzNTczkc9d"?>' +
      '<x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">' +
      '<rdf:Description rdf:about=""' + ns + '>' + parts.join('') +
      '</rdf:Description></rdf:RDF></x:xmpmeta><?xpacket end="w"?>';
  }

  // ---------- chèn vào từng định dạng ----------

  function applyJpeg(base, tiff, xmp, dpi) {
    var b = base.slice();
    var insertAt = 2;
    if (b[2] === 0xff && b[3] === 0xe0 && I.startsWith(b, 6, 'JFIF\0')) {
      // JFIF: units ở byte 13, X/Y density ở 14..17
      if (dpi) { b[13] = 1; b.set(shortBytes(dpi), 14); b.set(shortBytes(dpi), 16); }
      else { b[13] = 0; b.set(shortBytes(1), 14); b.set(shortBytes(1), 16); }
      insertAt = 2 + 2 + I.u16be(b, 4);
    }
    var segments = [];
    var app1 = function (payload) {
      var len = 2 + payload.length;
      if (len > 0xffff) throw new Error('Thông tin quá dài để ghi vào JPEG.');
      segments.push(new Uint8Array([0xff, 0xe1, len >> 8, len & 0xff]), payload);
    };
    if (tiff) app1(I.concat([new Uint8Array([0x45, 0x78, 0x69, 0x66, 0, 0]), tiff]));
    if (xmp) app1(I.concat([encoder.encode(I.XMP_SIG), encoder.encode(xmp)]));
    if (!segments.length) return b;
    return I.concat([b.subarray(0, insertAt)].concat(segments, [b.subarray(insertAt)]));
  }

  function applyPng(base, tiff, xmp, dpi) {
    var parts = [base.subarray(0, 8)];
    var inserted = false;
    I.walkPng(base, function (type, start, end) {
      if (type === 'pHYs') return; // ghi lại theo form
      if (type === 'IDAT' && !inserted) {
        if (dpi) {
          var ppm = Math.round(dpi / 0.0254);
          parts.push(I.pngChunk('pHYs', I.concat([longBytes(ppm), longBytes(ppm), new Uint8Array([1])])));
        }
        if (tiff) parts.push(I.pngChunk('eXIf', tiff));
        // iTXt: keyword\0 flag(0) method(0) lang\0 translated\0 text
        if (xmp) parts.push(I.pngChunk('iTXt', I.concat([encoder.encode('XML:com.adobe.xmp'), new Uint8Array(5), encoder.encode(xmp)])));
        inserted = true;
      }
      parts.push(base.subarray(start, end));
    });
    return I.concat(parts);
  }

  function webpChunk(type, data) {
    var head = new Uint8Array(8);
    for (var i = 0; i < 4; i++) head[i] = type.charCodeAt(i);
    head.set([data.length & 0xff, (data.length >>> 8) & 0xff, (data.length >>> 16) & 0xff, (data.length >>> 24) & 0xff], 4);
    return I.concat([head, data, new Uint8Array(data.length & 1)]);
  }

  function applyWebp(base, tiff, xmp) {
    if (!tiff && !xmp) return base;
    var flags = (tiff ? 0x08 : 0) | (xmp ? 0x04 : 0);
    var chunks = [];
    var vp8x = null, dims = null, alpha = false;
    I.walkWebp(base, function (type, start, end, d) {
      var chunk = base.slice(start, end);
      if (type === 'VP8X') vp8x = chunk;
      var dd = details.webpDims(type, d);
      if (dd && !dims) dims = dd;
      if (dd && dd.alpha) alpha = true;
      if (type === 'ALPH') alpha = true;
      chunks.push(chunk);
    });
    if (vp8x) {
      vp8x[8] |= flags;
    } else {
      // WebP đơn giản (VP8/VP8L) không chứa được EXIF: tạo VP8X với kích thước khung lấy từ bitstream
      if (!dims) throw new Error('Không đọc được kích thước WebP để ghi EXIF.');
      var w = dims.w - 1, h = dims.h - 1;
      var data = new Uint8Array([flags | (alpha ? 0x10 : 0), 0, 0, 0,
        w & 0xff, (w >> 8) & 0xff, (w >> 16) & 0xff, h & 0xff, (h >> 8) & 0xff, (h >> 16) & 0xff]);
      chunks.unshift(webpChunk('VP8X', data));
    }
    if (tiff) chunks.push(webpChunk('EXIF', tiff));
    if (xmp) chunks.push(webpChunk('XMP ', encoder.encode(xmp)));
    var body = I.concat(chunks);
    var out = new Uint8Array(12 + body.length);
    out.set(base.subarray(0, 12));
    var size = 4 + body.length;
    out.set([size & 0xff, (size >>> 8) & 0xff, (size >>> 16) & 0xff, (size >>> 24) & 0xff], 4);
    out.set(body, 12);
    return out;
  }

  function describe(e) {
    var written = [];
    FIELDS.forEach(function (f) {
      var v = e[f.id];
      if (f.kind === 'gps' || f.kind === 'ai' || f.protected || v === '' || v === null || v === undefined || v === false) return;
      if (f.kind === 'orientation') { if (v !== 1) written.push({ key: f.label, value: v + ' — ' + core.ORIENTATION_LABELS[v] }); return; }
      written.push({ key: f.label, value: String(v) });
    });
    if (e.gps) written.push({ key: 'GPS', value: e.gps.lat.toFixed(6) + ', ' + e.gps.lon.toFixed(6) });
    return written;
  }

  /**
   * Chính sách bảo vệ của ảnh gốc: trường bản quyền nào đã có (bị khoá), ảnh có dấu hiệu AI không.
   * { values, protectedIds, ai: { detected, signals, sourceType, c2pa } }
   */
  function policy(bytes) {
    var detailed = readEditableDetailed(bytes);
    var values = detailed.values;
    var info = core.inspect(bytes);
    var text = (core.findXmp(bytes) || '') + ' ' + info.entries.map(function (e) { return e.value || ''; }).join(' ');
    return {
      values: values,
      sources: detailed.sources,
      protectedIds: FIELDS.filter(function (f) { return f.protected && values[f.id]; }).map(function (f) { return f.id; }),
      ai: {
        detected: info.aiSignals.length > 0,
        signals: info.aiSignals,
        sourceType: /compositeWithTrainedAlgorithmicMedia/.test(text) ? 'compositeWithTrainedAlgorithmicMedia' : 'trainedAlgorithmicMedia',
        c2pa: info.entries.some(function (e) { return e.group === 'C2PA'; })
      }
    };
  }

  function applyWithPolicy(bytes, values, p) {
    var format = core.detectFormat(bytes);
    var v = Object.assign({}, values);
    p.protectedIds.forEach(function (id) { v[id] = p.values[id]; }); // bản quyền gốc: không sửa, không xoá
    if (p.ai.detected) v.aiLabel = 'true'; // ảnh AI: luôn gắn nhãn
    var e = normalize(v);
    var stripped = core.strip(bytes, { keepOrientation: false, keepC2pa: true });
    var tiff = buildTiff(e);
    var xmp = buildXmp(e, p.ai.sourceType);
    var out = format === 'jpeg' ? applyJpeg(stripped.bytes, tiff, xmp, e.dpi)
      : format === 'png' ? applyPng(stripped.bytes, tiff, xmp, e.dpi)
        : applyWebp(stripped.bytes, tiff, xmp);

    var kept = [];
    FIELDS.forEach(function (f) {
      if (f.protected && e[f.id]) kept.push({ key: f.label, value: e[f.id], locked: p.protectedIds.indexOf(f.id) !== -1 });
    });
    if (e.aiLabel) kept.push({ key: 'Nhãn AI (IPTC DigitalSourceType)', value: AI_SOURCE_TYPES[p.ai.sourceType], locked: p.ai.detected });
    if (p.ai.c2pa) kept.push({ key: 'Content Credentials (C2PA)', value: 'Giữ nguyên khối gốc', locked: true });

    var written = describe(e);
    if (xmp) written.push({ key: 'XMP (Unicode)', value: 'Ghi bản quyền, nhãn AI và các trường chữ để hiện đúng tiếng Việt' });
    return { bytes: out, written: written, kept: kept, removed: stripped.removed, format: format, mime: core.MIME[format] };
  }

  /**
   * Xuất ảnh mới theo form (tab "Chỉnh sửa"). Trường bản quyền đã có và nhãn AI được áp chính sách
   * bất kể giá trị gửi lên. Trả về { bytes, written, kept, removed, format, mime }.
   * Ném Error (thông báo tiếng Việt) nếu giá trị không hợp lệ.
   */
  function apply(bytes, values) {
    if (!core.detectFormat(bytes)) throw new Error('Định dạng không hỗ trợ. Chỉ nhận JPEG, PNG, WebP.');
    return applyWithPolicy(bytes, values || {}, policy(bytes));
  }

  /**
   * Làm sạch (tab "Làm sạch"): bỏ thông tin riêng tư (GPS, thiết bị, prompt, lịch sử sửa…),
   * chỉ giữ bản quyền, nhãn AI, C2PA, hướng xoay (tuỳ chọn) và DPI.
   */
  function clean(bytes, opts) {
    if (!core.detectFormat(bytes)) throw new Error('Định dạng không hỗ trợ. Chỉ nhận JPEG, PNG, WebP.');
    opts = Object.assign({ keepOrientation: true }, opts || {});
    var p = policy(bytes);
    var values = {};
    FIELDS.forEach(function (f) { values[f.id] = ''; });
    values.orientation = opts.keepOrientation ? p.values.orientation : '1';
    values.dpi = p.values.dpi;
    return applyWithPolicy(bytes, values, p);
  }

  return {
    FIELDS: FIELDS,
    AI_SOURCE_TYPES: AI_SOURCE_TYPES,
    readEditable: readEditable,
    readEditableDetailed: readEditableDetailed,
    policy: policy,
    apply: apply,
    clean: clean,
    buildTiff: function (values) { return buildTiff(normalize(values)); }
  };
});
