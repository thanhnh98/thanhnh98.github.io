/**
 * Đọc TOÀN BỘ metadata + thông số của ảnh (JPEG, PNG, WebP) cho tab "Tất cả metadata".
 * Kết quả là danh sách section { id, title, rows: [{ key, value }], raw?, compressed? } để trang render thẳng.
 * Phụ thuộc js/image-metadata-core.js.
 */
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory(require('./image-metadata-core.js'));
  } else {
    root.ImageMetadataDetails = factory(root.ImageMetadataCore);
  }
})(typeof window !== 'undefined' ? window : globalThis, function (core) {
  'use strict';

  var I = core.internal;

  // ---------- tên tag EXIF ----------

  var TIFF_TAG_NAMES = {
    0x00fe: 'NewSubfileType', 0x0100: 'ImageWidth', 0x0101: 'ImageHeight', 0x0102: 'BitsPerSample',
    0x0103: 'Compression', 0x0106: 'PhotometricInterpretation', 0x010e: 'ImageDescription', 0x010f: 'Make',
    0x0110: 'Model', 0x0111: 'StripOffsets', 0x0112: 'Orientation', 0x0115: 'SamplesPerPixel',
    0x0116: 'RowsPerStrip', 0x0117: 'StripByteCounts', 0x011a: 'XResolution', 0x011b: 'YResolution',
    0x011c: 'PlanarConfiguration', 0x0128: 'ResolutionUnit', 0x012d: 'TransferFunction', 0x0131: 'Software',
    0x0132: 'DateTime', 0x013b: 'Artist', 0x013e: 'WhitePoint', 0x013f: 'PrimaryChromaticities',
    0x0201: 'JPEGInterchangeFormat', 0x0202: 'JPEGInterchangeFormatLength', 0x0211: 'YCbCrCoefficients',
    0x0212: 'YCbCrSubSampling', 0x0213: 'YCbCrPositioning', 0x0214: 'ReferenceBlackWhite', 0x02bc: 'ApplicationNotes (XMP)',
    0x4746: 'Rating', 0x4749: 'RatingPercent', 0x8298: 'Copyright', 0x83bb: 'IPTC-NAA', 0x8649: 'PhotoshopSettings',
    0x8769: 'ExifIFDPointer', 0x8773: 'InterColorProfile', 0x8825: 'GPSInfoIFDPointer',
    0x9c9b: 'XPTitle', 0x9c9c: 'XPComment', 0x9c9d: 'XPAuthor', 0x9c9e: 'XPKeywords', 0x9c9f: 'XPSubject',
    0xa005: 'InteropIFDPointer', 0xc4a5: 'PrintIM',
    // Exif IFD
    0x829a: 'ExposureTime', 0x829d: 'FNumber', 0x8822: 'ExposureProgram', 0x8824: 'SpectralSensitivity',
    0x8827: 'ISOSpeedRatings', 0x8830: 'SensitivityType', 0x8832: 'RecommendedExposureIndex',
    0x9000: 'ExifVersion', 0x9003: 'DateTimeOriginal', 0x9004: 'DateTimeDigitized', 0x9010: 'OffsetTime',
    0x9011: 'OffsetTimeOriginal', 0x9012: 'OffsetTimeDigitized', 0x9101: 'ComponentsConfiguration',
    0x9102: 'CompressedBitsPerPixel', 0x9201: 'ShutterSpeedValue', 0x9202: 'ApertureValue',
    0x9203: 'BrightnessValue', 0x9204: 'ExposureBiasValue', 0x9205: 'MaxApertureValue',
    0x9206: 'SubjectDistance', 0x9207: 'MeteringMode', 0x9208: 'LightSource', 0x9209: 'Flash',
    0x920a: 'FocalLength', 0x9214: 'SubjectArea', 0x927c: 'MakerNote', 0x9286: 'UserComment',
    0x9290: 'SubSecTime', 0x9291: 'SubSecTimeOriginal', 0x9292: 'SubSecTimeDigitized',
    0xa000: 'FlashpixVersion', 0xa001: 'ColorSpace', 0xa002: 'PixelXDimension', 0xa003: 'PixelYDimension',
    0xa004: 'RelatedSoundFile', 0xa20e: 'FocalPlaneXResolution', 0xa20f: 'FocalPlaneYResolution',
    0xa210: 'FocalPlaneResolutionUnit', 0xa215: 'ExposureIndex', 0xa217: 'SensingMethod', 0xa300: 'FileSource',
    0xa301: 'SceneType', 0xa302: 'CFAPattern', 0xa401: 'CustomRendered', 0xa402: 'ExposureMode',
    0xa403: 'WhiteBalance', 0xa404: 'DigitalZoomRatio', 0xa405: 'FocalLengthIn35mmFilm',
    0xa406: 'SceneCaptureType', 0xa407: 'GainControl', 0xa408: 'Contrast', 0xa409: 'Saturation',
    0xa40a: 'Sharpness', 0xa40c: 'SubjectDistanceRange', 0xa420: 'ImageUniqueID', 0xa430: 'CameraOwnerName',
    0xa431: 'BodySerialNumber', 0xa432: 'LensSpecification', 0xa433: 'LensMake', 0xa434: 'LensModel',
    0xa435: 'LensSerialNumber', 0xa460: 'CompositeImage', 0xa500: 'Gamma'
  };
  var GPS_TAG_NAMES = {
    0: 'GPSVersionID', 1: 'GPSLatitudeRef', 2: 'GPSLatitude', 3: 'GPSLongitudeRef', 4: 'GPSLongitude',
    5: 'GPSAltitudeRef', 6: 'GPSAltitude', 7: 'GPSTimeStamp', 8: 'GPSSatellites', 9: 'GPSStatus',
    10: 'GPSMeasureMode', 11: 'GPSDOP', 12: 'GPSSpeedRef', 13: 'GPSSpeed', 14: 'GPSTrackRef', 15: 'GPSTrack',
    16: 'GPSImgDirectionRef', 17: 'GPSImgDirection', 18: 'GPSMapDatum', 19: 'GPSDestLatitudeRef',
    20: 'GPSDestLatitude', 21: 'GPSDestLongitudeRef', 22: 'GPSDestLongitude', 23: 'GPSDestBearingRef',
    24: 'GPSDestBearing', 25: 'GPSDestDistanceRef', 26: 'GPSDestDistance', 27: 'GPSProcessingMethod',
    28: 'GPSAreaInformation', 29: 'GPSDateStamp', 30: 'GPSDifferential', 31: 'GPSHPositioningError'
  };
  var INTEROP_TAG_NAMES = { 1: 'InteroperabilityIndex', 2: 'InteroperabilityVersion' };
  var IFD_TITLES = { IFD0: 'EXIF · Ảnh chính (IFD0)', Exif: 'EXIF · Thông số chụp', GPS: 'EXIF · GPS', Interop: 'EXIF · Interop', IFD1: 'EXIF · Thumbnail (IFD1)' };

  var ENUMS = {
    ResolutionUnit: { 1: 'Không', 2: 'inch', 3: 'cm' },
    ColorSpace: { 1: 'sRGB', 2: 'Adobe RGB', 65535: 'Uncalibrated' },
    ExposureProgram: { 0: 'Không rõ', 1: 'Thủ công', 2: 'Tự động', 3: 'Ưu tiên khẩu', 4: 'Ưu tiên tốc', 5: 'Sáng tạo', 6: 'Hành động', 7: 'Chân dung', 8: 'Phong cảnh' },
    MeteringMode: { 0: 'Không rõ', 1: 'Trung bình', 2: 'Trung bình ưu tiên trung tâm', 3: 'Điểm', 4: 'Đa điểm', 5: 'Ma trận', 6: 'Một phần' },
    WhiteBalance: { 0: 'Tự động', 1: 'Thủ công' },
    ExposureMode: { 0: 'Tự động', 1: 'Thủ công', 2: 'Bracket tự động' },
    SceneCaptureType: { 0: 'Chuẩn', 1: 'Phong cảnh', 2: 'Chân dung', 3: 'Cảnh đêm' },
    Compression: { 1: 'Không nén', 6: 'JPEG (cũ)', 7: 'JPEG' },
    YCbCrPositioning: { 1: 'Centered', 2: 'Co-sited' },
    GPSAltitudeRef: { 0: 'Trên mực nước biển', 1: 'Dưới mực nước biển' }
  };

  function tagName(ifd, tag) {
    var table = ifd === 'GPS' ? GPS_TAG_NAMES : ifd === 'Interop' ? INTEROP_TAG_NAMES : TIFF_TAG_NAMES;
    return table[tag] || 'Tag 0x' + ('000' + tag.toString(16)).slice(-4);
  }

  function hex(b, max) {
    var out = [];
    for (var i = 0; i < Math.min(b.length, max); i++) out.push(('0' + b[i].toString(16)).slice(-2));
    return out.join(' ') + (b.length > max ? ' …' : '');
  }

  function shortList(arr, map) {
    var items = arr.slice(0, 16).map(map || String);
    return items.join(', ') + (arr.length > 16 ? ', … (' + arr.length + ' giá trị)' : '');
  }

  function fmtRational(r) {
    if (!r[1]) return String(r[0]);
    if (r[1] === 1) return String(r[0]);
    var v = r[0] / r[1];
    if (r[0] === 1 || Math.abs(v) < 1) return r[0] + '/' + r[1] + ' (≈ ' + +v.toPrecision(4) + ')';
    return String(+v.toFixed(4));
  }

  function formatExifValue(ifd, entry, name, le) {
    var v = entry.value;
    if (name === 'Orientation' && typeof v === 'number') return v + ' — ' + (core.ORIENTATION_LABELS[v] || 'không hợp lệ');
    if (name.indexOf('XP') === 0 && v instanceof Uint8Array) {
      return I.cleanText(new TextDecoder('utf-16le').decode(v)).replace(/\0+$/, '');
    }
    if (name === 'UserComment' && v instanceof Uint8Array) return I.decodeUserComment(v, le);
    if (name === 'MakerNote' && v instanceof Uint8Array) return v.length + ' byte (dữ liệu riêng của hãng máy)';
    if ((name === 'ExifVersion' || name === 'FlashpixVersion' || name === 'InteroperabilityVersion') && v instanceof Uint8Array) return I.latin1(v);
    if (name === 'GPSVersionID' && v instanceof Uint8Array) return Array.from(v).join('.');
    if (ENUMS[name] && typeof v === 'number') return v + (ENUMS[name][v] ? ' — ' + ENUMS[name][v] : '');
    if (name === 'ExifIFDPointer' || name === 'GPSInfoIFDPointer' || name === 'InteropIFDPointer') return 'offset ' + v;
    if (typeof v === 'string') return v;
    if (v instanceof Uint8Array) {
      if (entry.type === 7 && /^[\x20-\x7e\s]+\0*$/.test(I.latin1(v)) && v.length > 1) return I.cleanText(I.latin1(v));
      return v.length <= 24 ? hex(v, 24) : v.length + ' byte · ' + hex(v, 16);
    }
    if (entry.raw) return shortList(entry.raw, fmtRational);
    if (Array.isArray(v)) return shortList(v);
    return String(v);
  }

  function exifSections(tiffBytes) {
    var tiff = core.readTiff(tiffBytes);
    if (!tiff) return [{ id: 'exif', title: 'EXIF', rows: [{ key: 'EXIF', value: 'Không đọc được (' + tiffBytes.length + ' byte)' }] }];
    var sections = tiff.order.map(function (ifd) {
      return {
        id: 'exif-' + ifd.toLowerCase(),
        title: IFD_TITLES[ifd] || 'EXIF · ' + ifd,
        rows: tiff.ifds[ifd].map(function (entry) {
          var name = tagName(ifd, entry.tag);
          return { key: name, value: formatExifValue(ifd, entry, name, tiff.le) };
        })
      };
    });
    var g = I.gpsDegrees(tiff);
    if (g && g.lat !== null && g.lon !== null) {
      var gps = sections.filter(function (s) { return s.id === 'exif-gps'; })[0];
      gps.rows.unshift({ key: 'Toạ độ (độ thập phân)', value: g.lat.toFixed(6) + ', ' + g.lon.toFixed(6) });
    }
    var ifd1 = I.tagMap(tiff, 'IFD1');
    if (ifd1[0x0202]) {
      var thumb = sections.filter(function (s) { return s.id === 'exif-ifd1'; })[0];
      thumb.rows.unshift({ key: 'Ảnh thumbnail nhúng', value: ifd1[0x0202] + ' byte (JPEG)' });
    }
    return sections;
  }

  // ---------- XMP ----------

  function decodeEntities(s) {
    return s.replace(/&(#x?[0-9a-f]+|amp|lt|gt|quot|apos);/gi, function (m, e) {
      var map = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" };
      if (map[e.toLowerCase()]) return map[e.toLowerCase()];
      var code = e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return isNaN(code) ? m : String.fromCodePoint(code);
    });
  }

  function xmpProps(xml) {
    var rows = [];
    var push = function (key, value) {
      value = decodeEntities(String(value)).replace(/\s+/g, ' ').trim();
      if (value) rows.push({ key: key, value: value });
    };
    var body = xml.replace(/<\?xpacket[^>]*\?>/g, '');
    var desc = /<rdf:Description\b([^>]*?)\/?>/g, m;
    while ((m = desc.exec(body))) {
      var attr = /([\w-]+:[\w-]+)\s*=\s*"([^"]*)"/g, a;
      while ((a = attr.exec(m[1]))) {
        if (/^(xmlns|rdf|xml):/.test(a[1])) continue;
        push(a[1], a[2]);
      }
    }
    var el = /<([\w-]+:[\w-]+)(\s[^>]*)?(?:\/>|>([\s\S]*?)<\/\1>)/g, e;
    while ((e = el.exec(body))) {
      var name = e[1];
      if (/^(rdf|x):/.test(name)) { el.lastIndex = e.index + name.length + 1; continue; }
      var content = e[3];
      if (content === undefined) {
        var res = (e[2] || '').match(/rdf:resource="([^"]*)"/);
        if (res) push(name, res[1]);
        continue;
      }
      var items = [];
      var li = /<rdf:li\b[^>]*>([\s\S]*?)<\/rdf:li>/g, l;
      while ((l = li.exec(content))) items.push(l[1].replace(/<[^>]+>/g, ' '));
      if (items.length) push(name, items.map(function (s) { return s.replace(/\s+/g, ' ').trim(); }).filter(Boolean).join('; '));
      else if (/<[\w-]+:[\w-]+/.test(content)) push(name, content.replace(/<[^>]+>/g, ' '));
      else push(name, content);
    }
    return rows;
  }

  // ---------- ICC ----------

  var ICC_CLASS = { scnr: 'Máy quét', mntr: 'Màn hình', prtr: 'Máy in', link: 'Device link', spac: 'Không gian màu', abst: 'Abstract', nmcl: 'Named color' };

  function parseIcc(b) {
    var rows = [{ key: 'Kích thước', value: b.length + ' byte' }];
    if (b.length < 132) return rows;
    var fourcc = function (p) { return I.cleanText(I.latin1(b.subarray(p, p + 4))); };
    rows.push({ key: 'Phiên bản', value: b[8] + '.' + (b[9] >> 4) });
    var cls = fourcc(12);
    rows.push({ key: 'Loại thiết bị', value: ICC_CLASS[cls] || cls });
    rows.push({ key: 'Không gian màu', value: fourcc(16) });
    rows.push({ key: 'PCS', value: fourcc(20) });
    var y = I.u16be(b, 24);
    if (y) rows.push({ key: 'Ngày tạo', value: y + '-' + I.u16be(b, 26) + '-' + I.u16be(b, 28) });
    if (fourcc(40)) rows.push({ key: 'Nền tảng', value: fourcc(40) });
    if (fourcc(4)) rows.push({ key: 'CMM', value: fourcc(4) });

    var textAt = function (off, size) {
      if (off + 12 > b.length) return null;
      var type = I.latin1(b.subarray(off, off + 4));
      if (type === 'desc') { var len = I.u32be(b, off + 8); return I.cleanText(I.latin1(b.subarray(off + 12, off + 12 + len))); }
      if (type === 'text') return I.cleanText(I.latin1(b.subarray(off + 8, off + size)));
      if (type === 'mluc' && off + 28 <= b.length) {
        var slen = I.u32be(b, off + 20), soff = I.u32be(b, off + 24);
        try { return I.cleanText(new TextDecoder('utf-16be').decode(b.subarray(off + soff, off + soff + slen))); } catch (err) { return null; }
      }
      return null;
    };
    var n = I.u32be(b, 128);
    for (var i = 0; i < n && 132 + i * 12 + 12 <= b.length; i++) {
      var p = 132 + i * 12;
      var sig = I.latin1(b.subarray(p, p + 4));
      var label = { desc: 'Mô tả', cprt: 'Bản quyền', dmnd: 'Hãng thiết bị', dmdd: 'Model thiết bị' }[sig];
      if (!label) continue;
      var txt = textAt(I.u32be(b, p + 4), I.u32be(b, p + 8));
      if (txt) rows.push({ key: label, value: txt });
    }
    return rows;
  }

  // ---------- IPTC (Photoshop APP13) ----------

  var IPTC_NAMES = {
    '1:90': 'CodedCharacterSet', '2:0': 'RecordVersion', '2:5': 'ObjectName', '2:15': 'Category', '2:20': 'SupplementalCategories',
    '2:25': 'Keywords', '2:40': 'SpecialInstructions', '2:55': 'DateCreated', '2:60': 'TimeCreated', '2:62': 'DigitalCreationDate',
    '2:65': 'OriginatingProgram', '2:70': 'ProgramVersion', '2:80': 'By-line', '2:85': 'By-lineTitle', '2:90': 'City',
    '2:92': 'Sub-location', '2:95': 'Province-State', '2:100': 'Country-Code', '2:101': 'Country', '2:103': 'OriginalTransmissionReference',
    '2:105': 'Headline', '2:110': 'Credit', '2:115': 'Source', '2:116': 'CopyrightNotice', '2:118': 'Contact',
    '2:120': 'Caption-Abstract', '2:122': 'Writer-Editor'
  };

  function parseIptc(b) {
    var rows = [];
    // Photoshop IRB: "Photoshop 3.0\0" rồi các block 8BIM
    var p = I.startsWith(b, 0, 'Photoshop 3.0\0') ? 14 : 0;
    while (p + 12 <= b.length && I.startsWith(b, p, '8BIM')) {
      var id = I.u16be(b, p + 4);
      var nameLen = b[p + 6];
      var q = p + 7 + nameLen;
      if ((nameLen + 1) % 2) q++;
      if (q + 4 > b.length) break;
      var size = I.u32be(b, q);
      var data = b.subarray(q + 4, Math.min(b.length, q + 4 + size));
      if (id === 0x0404) {
        for (var i = 0; i + 5 <= data.length && data[i] === 0x1c;) {
          var key = data[i + 1] + ':' + data[i + 2];
          var len = I.u16be(data, i + 3);
          var val = data.subarray(i + 5, i + 5 + len);
          if (key !== '1:90' && key !== '2:0') rows.push({ key: IPTC_NAMES[key] || 'IPTC ' + key, value: I.decodeText(val) });
          i += 5 + len;
        }
      } else {
        rows.push({ key: 'Photoshop resource 0x' + id.toString(16), value: data.length + ' byte' });
      }
      p = q + 4 + size + (size % 2);
    }
    return rows;
  }

  // ---------- thông số ảnh ----------

  function gcd(a, b) { return b ? gcd(b, a % b) : a; }

  function commonProps(rows, w, h) {
    if (!w || !h) return;
    rows.push({ key: 'Kích thước', value: w + ' × ' + h + ' px' });
    rows.push({ key: 'Megapixel', value: (w * h / 1e6).toFixed(2) + ' MP' });
    var g = gcd(w, h);
    rows.push({ key: 'Tỷ lệ khung', value: (w / g <= 50 ? w / g + ':' + h / g : (w / h).toFixed(3) + ':1') });
  }

  // Bảng lượng tử chuẩn IJG (độ sáng) để ước lượng "chất lượng" JPEG từ DQT
  var STD_LUMA = [16, 11, 10, 16, 24, 40, 51, 61, 12, 12, 14, 19, 26, 58, 60, 55, 14, 13, 16, 24, 40, 57, 69, 56,
    14, 17, 22, 29, 51, 87, 80, 62, 18, 22, 37, 56, 68, 109, 103, 77, 24, 35, 55, 64, 81, 104, 113, 92,
    49, 64, 78, 87, 103, 121, 120, 101, 72, 92, 95, 98, 112, 100, 103, 99];

  function jpegQuality(table) {
    var sum = 0, std = 0;
    for (var i = 0; i < 64; i++) { sum += table[i]; std += STD_LUMA[i]; }
    var scale = sum * 100 / std;
    var q = scale <= 100 ? (200 - scale) / 2 : 5000 / scale;
    return Math.max(1, Math.min(100, Math.round(q)));
  }

  var SOF_NAMES = { 0xc0: 'Baseline', 0xc1: 'Extended sequential', 0xc2: 'Progressive', 0xc3: 'Lossless',
    0xc5: 'Differential sequential', 0xc6: 'Differential progressive', 0xc7: 'Differential lossless',
    0xc9: 'Arithmetic sequential', 0xca: 'Arithmetic progressive', 0xcb: 'Arithmetic lossless' };

  function jpegProps(b) {
    var rows = [], w = 0, h = 0, extra = [];
    I.walkJpeg(b, function (m, start, end, payload) {
      if (SOF_NAMES[m] && !w) {
        h = I.u16be(b, payload + 1);
        w = I.u16be(b, payload + 3);
        var nc = b[payload + 5];
        extra.push({ key: 'Kiểu nén', value: SOF_NAMES[m] });
        extra.push({ key: 'Độ sâu màu', value: b[payload] + ' bit / kênh' });
        extra.push({ key: 'Số kênh màu', value: nc + (nc === 1 ? ' (xám)' : nc === 3 ? ' (YCbCr)' : nc === 4 ? ' (CMYK)' : '') });
        if (nc === 3) {
          var hv = b[payload + 7], H = hv >> 4, V = hv & 15;
          var sub = { '11': '4:4:4', '21': '4:2:2', '22': '4:2:0', '12': '4:4:0', '41': '4:1:1' }[H + '' + V];
          if (sub) extra.push({ key: 'Chroma subsampling', value: sub });
        }
      } else if (m === 0xdb) {
        for (var p = payload; p < end;) {
          var pq = b[p] >> 4, tq = b[p] & 15, table = [];
          for (var i = 0; i < 64; i++) table.push(pq ? I.u16be(b, p + 1 + i * 2) : b[p + 1 + i]);
          if (tq === 0) extra.push({ key: 'Chất lượng ước tính', value: '≈ ' + jpegQuality(table) + ' / 100 (theo bảng lượng tử)' });
          p += 1 + 64 * (pq ? 2 : 1);
        }
      } else if (m === 0xe0 && I.startsWith(b, payload, 'JFIF\0')) {
        var units = b[payload + 7], xd = I.u16be(b, payload + 8), yd = I.u16be(b, payload + 10);
        extra.push({ key: 'JFIF', value: 'phiên bản ' + b[payload + 5] + '.' + ('0' + b[payload + 6]).slice(-2) });
        if (units === 1) extra.push({ key: 'Độ phân giải (JFIF)', value: xd + ' × ' + yd + ' dpi' });
        else if (units === 2) extra.push({ key: 'Độ phân giải (JFIF)', value: Math.round(xd * 2.54) + ' × ' + Math.round(yd * 2.54) + ' dpi' });
        else extra.push({ key: 'Tỷ lệ điểm ảnh (JFIF)', value: xd + ':' + yd });
      } else if (m === 0xee && I.startsWith(b, payload, 'Adobe')) {
        extra.push({ key: 'Adobe transform', value: String(b[payload + 11]) });
      }
    });
    commonProps(rows, w, h);
    return rows.concat(extra);
  }

  var PNG_COLOR = { 0: 'Xám', 2: 'RGB', 3: 'Bảng màu (palette)', 4: 'Xám + alpha', 6: 'RGBA' };
  var SRGB_INTENT = { 0: 'Perceptual', 1: 'Relative colorimetric', 2: 'Saturation', 3: 'Absolute colorimetric' };

  function pngProps(b) {
    var rows = [], extra = [], w = 0, h = 0, idat = 0;
    I.walkPng(b, function (type, start, end, d) {
      if (type === 'IHDR') {
        w = I.u32be(d, 0); h = I.u32be(d, 4);
        extra.push({ key: 'Độ sâu màu', value: d[8] + ' bit / kênh' });
        extra.push({ key: 'Kiểu màu', value: PNG_COLOR[d[9]] || String(d[9]) });
        extra.push({ key: 'Interlace', value: d[12] ? 'Adam7' : 'Không' });
      } else if (type === 'PLTE') extra.push({ key: 'Số màu trong palette', value: String(d.length / 3) });
      else if (type === 'tRNS') extra.push({ key: 'Trong suốt', value: 'Có (tRNS)' });
      else if (type === 'acTL') extra.push({ key: 'Ảnh động (APNG)', value: I.u32be(d, 0) + ' khung, lặp ' + (I.u32be(d, 4) || '∞') });
      else if (type === 'pHYs') {
        var x = I.u32be(d, 0), y = I.u32be(d, 4);
        extra.push(d[8] === 1
          ? { key: 'Độ phân giải (pHYs)', value: Math.round(x * 0.0254) + ' × ' + Math.round(y * 0.0254) + ' dpi' }
          : { key: 'Tỷ lệ điểm ảnh (pHYs)', value: x + ':' + y });
      } else if (type === 'gAMA') extra.push({ key: 'Gamma', value: (I.u32be(d, 0) / 100000).toFixed(5) });
      else if (type === 'sRGB') extra.push({ key: 'sRGB', value: SRGB_INTENT[d[0]] || String(d[0]) });
      else if (type === 'cICP') extra.push({ key: 'cICP', value: Array.from(d).join(', ') });
      else if (type === 'IDAT') idat += d.length;
    });
    commonProps(rows, w, h);
    extra.push({ key: 'Dữ liệu ảnh nén (IDAT)', value: idat + ' byte' });
    return rows.concat(extra);
  }

  function webpDims(type, d) {
    if (type === 'VP8X') return { w: 1 + (d[4] | (d[5] << 8) | (d[6] << 16)), h: 1 + (d[7] | (d[8] << 8) | (d[9] << 16)) };
    if (type === 'VP8 ' && d[3] === 0x9d && d[4] === 0x01 && d[5] === 0x2a) return { w: (d[6] | (d[7] << 8)) & 0x3fff, h: (d[8] | (d[9] << 8)) & 0x3fff };
    if (type === 'VP8L' && d[0] === 0x2f) {
      var bits = I.u32le(d, 1);
      return { w: (bits & 0x3fff) + 1, h: ((bits >>> 14) & 0x3fff) + 1, alpha: !!((bits >>> 28) & 1) };
    }
    return null;
  }

  function webpProps(b) {
    var rows = [], extra = [], dims = null, frames = 0, kind = null, alpha = false;
    I.walkWebp(b, function (type, start, end, d) {
      var dd = webpDims(type, d);
      if (dd && (!dims || type === 'VP8X')) dims = dd;
      if (type === 'VP8X') { alpha = alpha || !!(d[0] & 0x10); if (d[0] & 0x02) extra.push({ key: 'Ảnh động', value: 'Có' }); }
      if (type === 'VP8 ' && !kind) kind = 'Lossy (VP8)';
      if (type === 'VP8L' && !kind) { kind = 'Lossless (VP8L)'; alpha = alpha || (dd && dd.alpha); }
      if (type === 'ALPH') alpha = true;
      if (type === 'ANIM') extra.push({ key: 'Số lần lặp', value: String((d[4] | (d[5] << 8)) || '∞') });
      if (type === 'ANMF') { frames++; if (!kind) kind = (I.latin1(d.subarray(16, 20)) === 'VP8L' ? 'Lossless' : 'Lossy') + ' (động)'; }
    });
    if (dims) commonProps(rows, dims.w, dims.h);
    if (kind) rows.push({ key: 'Kiểu nén', value: kind });
    rows.push({ key: 'Trong suốt (alpha)', value: alpha ? 'Có' : 'Không' });
    if (frames) rows.push({ key: 'Số khung hình', value: String(frames) });
    return rows.concat(extra);
  }

  // ---------- cấu trúc file ----------

  var JPEG_MARKERS = { 0xc4: 'DHT', 0xcc: 'DAC', 0xdb: 'DQT', 0xdd: 'DRI', 0xda: 'SOS + dữ liệu ảnh', 0xfe: 'COM' };

  function jpegMarkerName(b, m, payload) {
    if (JPEG_MARKERS[m]) return JPEG_MARKERS[m];
    if (SOF_NAMES[m]) return 'SOF' + (m - 0xc0) + ' (' + SOF_NAMES[m] + ')';
    if (m >= 0xd0 && m <= 0xd7) return 'RST' + (m - 0xd0);
    if (m >= 0xe0 && m <= 0xef) {
      var sig = I.latin1(b.subarray(payload, Math.min(payload + 32, b.length))).split('\0')[0].replace(/[^\x20-\x7e]/g, '');
      return 'APP' + (m - 0xe0) + (sig ? ' "' + sig.slice(0, 32) + '"' : '');
    }
    return 'Marker 0x' + m.toString(16).toUpperCase();
  }

  function structure(b, format) {
    var items = [];
    var push = function (name, offset, size, keep) {
      var last = items[items.length - 1];
      if (last && last.name === name && last.keep === keep) { last.size += size; last.count++; return; }
      items.push({ name: name, offset: offset, size: size, keep: keep, count: 1 });
    };
    if (format === 'jpeg') {
      push('SOI', 0, 2, true);
      var eoi = I.walkJpeg(b, function (m, start, end, payload) {
        push(jpegMarkerName(b, m, payload), start, end - start, I.classifyJpegSegment(b, m, payload).keep);
      });
      if (eoi !== -1) {
        push('EOI', eoi - 2, 2, true);
        if (eoi < b.length) push('Dữ liệu sau EOI', eoi, b.length - eoi, false);
      }
    } else if (format === 'png') {
      push('Chữ ký PNG', 0, 8, true);
      var iend = I.walkPng(b, function (type, start, end) { push(type, start, end - start, I.PNG_KEEP.indexOf(type) !== -1); });
      if (iend < b.length) push('Dữ liệu sau IEND', iend, b.length - iend, false);
    } else {
      push('RIFF / WEBP header', 0, 12, true);
      I.walkWebp(b, function (type, start, end) { push(type.trim(), start, end - start, I.WEBP_KEEP.indexOf(type) !== -1); });
    }
    return items.map(function (it) {
      return {
        key: it.name + (it.count > 1 ? ' × ' + it.count : ''),
        value: it.size + ' byte · offset ' + it.offset + ' · ' + (it.keep ? 'giữ khi xoá metadata' : 'bị xoá khi xoá metadata')
      };
    });
  }

  // ---------- tổng hợp ----------

  function inspectAll(b) {
    var format = core.detectFormat(b);
    if (!format) throw new Error('Định dạng không hỗ trợ. Chỉ nhận JPEG, PNG, WebP.');
    var props = format === 'jpeg' ? jpegProps(b) : format === 'png' ? pngProps(b) : webpProps(b);
    props.unshift({ key: 'Định dạng', value: format.toUpperCase() + ' (' + core.MIME[format] + ')' });
    props.push({ key: 'Dung lượng', value: b.length + ' byte' });

    var sections = [{ id: 'props', title: 'Thông số ảnh', rows: props }];
    var xmp = [], text = [], other = [], c2pa = [], icc = null, iccCompressed = null, iptc = [], exifDone = false;

    var addExif = function (tiff) {
      if (exifDone) return;
      exifDone = true;
      sections.push.apply(sections, exifSections(tiff));
    };

    if (format === 'jpeg') {
      var iccParts = [];
      I.walkJpeg(b, function (m, start, end, payload) {
        var c = I.classifyJpegSegment(b, m, payload);
        if (c.label === 'EXIF') addExif(b.subarray(payload + 6, end));
        else if (c.label === 'XMP') xmp.push(I.utf8(b.subarray(payload + I.XMP_SIG.length, end)));
        else if (c.label === 'Extended XMP') other.push({ key: 'Extended XMP', value: (end - start) + ' byte' });
        else if (c.label === 'ICC profile') iccParts.push({ seq: b[payload + 12], data: b.subarray(payload + 14, end) });
        else if (c.group === 'C2PA') c2pa.push(b.subarray(payload, end));
        else if (c.group === 'IPTC') iptc = iptc.concat(parseIptc(b.subarray(payload, end)));
        else if (c.group === 'Comment') other.push({ key: 'Comment (COM)', value: I.decodeText(b.subarray(payload, end)) });
        else if (!c.keep) other.push({ key: c.label, value: (end - start) + ' byte' });
      });
      if (iccParts.length) icc = I.concat(iccParts.sort(function (a, z) { return a.seq - z.seq; }).map(function (p) { return p.data; }));
    } else if (format === 'png') {
      I.walkPng(b, function (type, start, end, d) {
        if (type === 'eXIf') addExif(d);
        else if (type === 'iCCP') {
          var z = d.indexOf(0);
          iccCompressed = { name: I.latin1(d.subarray(0, z)), data: d.subarray(z + 2) };
        } else if (type === 'caBX') c2pa.push(d);
        else if (type === 'tEXt' || type === 'zTXt' || type === 'iTXt') {
          var t = I.parsePngText(type, d);
          if (!t) return;
          if (t.key === 'XML:com.adobe.xmp' && t.value !== undefined) xmp.push(t.value);
          else text.push(t.compressed ? { key: t.key + ' (' + type + ')', value: null, compressed: t.compressed } : { key: t.key + ' (' + type + ')', value: t.value });
        } else if (type === 'tIME' && d.length >= 7) {
          other.push({ key: 'Thời gian sửa (tIME)', value: I.u16be(d, 0) + '-' + d[2] + '-' + d[3] + ' ' + d[4] + ':' + d[5] + ':' + d[6] + ' UTC' });
        } else if (I.PNG_KEEP.indexOf(type) === -1) other.push({ key: 'Chunk ' + type, value: (end - start) + ' byte' });
      });
    } else {
      I.walkWebp(b, function (type, start, end, d) {
        if (type === 'EXIF') addExif(I.startsWith(d, 0, 'Exif\0\0') ? d.subarray(6) : d);
        else if (type === 'XMP ') xmp.push(I.utf8(d));
        else if (type === 'ICCP') icc = d;
        else if (type === 'C2PA') c2pa.push(d);
        else if (I.WEBP_KEEP.indexOf(type) === -1) other.push({ key: 'Chunk ' + type.trim(), value: (end - start) + ' byte' });
      });
    }

    xmp.forEach(function (raw, i) {
      sections.push({ id: 'xmp' + (i || ''), title: 'XMP', rows: xmpProps(raw), raw: raw });
    });
    if (iptc.length) sections.push({ id: 'iptc', title: 'IPTC / Photoshop', rows: iptc });
    if (text.length) sections.push({ id: 'text', title: 'PNG text', rows: text });
    if (icc) sections.push({ id: 'icc', title: 'ICC profile (màu)', rows: parseIcc(icc) });
    if (iccCompressed) {
      sections.push({ id: 'icc', title: 'ICC profile (màu)', rows: [{ key: 'Tên', value: iccCompressed.name }], compressedIcc: iccCompressed.data });
    }
    if (c2pa.length) {
      var all = I.concat(c2pa);
      var s = I.c2paSummary(all);
      var rows = [{ key: 'Kích thước', value: all.length + ' byte' }];
      if (s.generator) rows.push({ key: 'claim_generator', value: s.generator });
      if (s.tools.length) rows.push({ key: 'Nhắc tới', value: s.tools.join(', ') });
      if (s.aiSource) rows.push({ key: 'digitalSourceType', value: 'trainedAlgorithmicMedia (tạo bởi AI)' });
      var labels = {};
      (I.latin1(all).match(/c2pa\.[a-z0-9_.]+/g) || []).forEach(function (l) { labels[l.replace(/\.+$/, '')] = true; });
      if (Object.keys(labels).length) rows.push({ key: 'Assertion', value: Object.keys(labels).join(', ') });
      sections.push({ id: 'c2pa', title: 'C2PA / Content Credentials', rows: rows });
    }
    if (other.length) sections.push({ id: 'other', title: 'Khác', rows: other });
    sections.push({ id: 'structure', title: 'Cấu trúc file', rows: structure(b, format) });
    return { format: format, sections: sections };
  }

  return {
    inspectAll: inspectAll,
    parseIcc: parseIcc,
    parseIptc: parseIptc,
    xmpProps: xmpProps,
    webpDims: webpDims
  };
});
