const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');

const core = require('../js/image-metadata-core.js');
const details = require('../js/image-metadata-details.js');
const editor = require('../js/image-metadata-editor.js');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

// ---------- fixture builders ----------

const bytes = (...parts) => new Uint8Array(Buffer.concat(parts.map((p) => (typeof p === 'string' ? Buffer.from(p, 'latin1') : Buffer.from(p)))));

function jpegSegment(marker, payload) {
    const body = Buffer.isBuffer(payload) ? payload : Buffer.from(payload, 'latin1');
    const len = body.length + 2;
    return Buffer.concat([Buffer.from([0xff, marker, len >> 8, len & 0xff]), body]);
}

function tiffBigEndian(entries) {
    // entries: [{tag, type, count, value(Buffer, <=4 byte inline or out-of-line)}]
    const ifdSize = 2 + entries.length * 12 + 4;
    let dataOff = 8 + ifdSize;
    const ifd = Buffer.alloc(ifdSize);
    const extra = [];
    ifd.writeUInt16BE(entries.length, 0);
    entries.forEach((e, i) => {
        const o = 2 + i * 12;
        ifd.writeUInt16BE(e.tag, o);
        ifd.writeUInt16BE(e.type, o + 2);
        ifd.writeUInt32BE(e.count, o + 4);
        if (e.value.length <= 4) {
            e.value.copy(ifd, o + 8);
        } else {
            ifd.writeUInt32BE(dataOff, o + 8);
            extra.push(e.value);
            dataOff += e.value.length;
        }
    });
    return Buffer.concat([Buffer.from([0x4d, 0x4d, 0x00, 0x2a, 0, 0, 0, 8]), ifd, ...extra]);
}

const ascii = (s) => Buffer.from(s + '\0', 'latin1');
const short = (n) => Buffer.from([n >> 8, n & 0xff, 0, 0]);

const XMP_AI = '<x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF><rdf:Description xmp:CreatorTool="Midjourney"'
    + ' Iptc4xmpExt:DigitalSourceType="http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"/></rdf:RDF></x:xmpmeta>';

function c2paPayload() {
    // Mô phỏng JUMBF có label c2pa và claim_generator mã hoá CBOR (text header 0x60 + len)
    const gen = 'ChatGPT via OpenAI';
    return Buffer.concat([
        Buffer.from('JP\0\x01\0\0\0\x01jumbjumdc2pa\0', 'latin1'),
        Buffer.from('claim_generator', 'latin1'),
        Buffer.from([0x60 + gen.length]),
        Buffer.from(gen, 'latin1'),
        Buffer.from(' c2pa.actions digitalSourceType trainedAlgorithmicMedia', 'latin1'),
    ]);
}

const SCAN = Buffer.from([0x12, 0xff, 0x00, 0x34, 0xff, 0xd3, 0x56, 0x78]); // có byte stuffing + RST3

function buildJpeg() {
    const exif = tiffBigEndian([
        { tag: 0x0112, type: 3, count: 1, value: short(6) },
        { tag: 0x0131, type: 2, count: 11, value: ascii('Midjourney') },
    ]);
    return bytes(
        [0xff, 0xd8],
        jpegSegment(0xe0, 'JFIF\0\x01\x01\0\0\x01\0\x01\0\0'),
        jpegSegment(0xe1, Buffer.concat([Buffer.from('Exif\0\0', 'latin1'), exif])),
        jpegSegment(0xe1, 'http://ns.adobe.com/xap/1.0/\0' + XMP_AI),
        jpegSegment(0xe2, 'ICC_PROFILE\0\x01\x01fake-icc'),
        jpegSegment(0xeb, c2paPayload()),
        jpegSegment(0xfe, 'made with stable diffusion'),
        jpegSegment(0xdb, Buffer.concat([Buffer.from([0]), Buffer.alloc(64, 1)])),
        jpegSegment(0xc0, Buffer.from([8, 0, 1, 0, 1, 1, 1, 0x11, 0])),
        jpegSegment(0xda, Buffer.from([1, 1, 0, 0, 0x3f, 0])),
        SCAN,
        [0xff, 0xd9],
        'TRAILER-WITH-SECRET'
    );
}

function crc32(buf) {
    let c, crc = 0xffffffff;
    for (let n = 0; n < buf.length; n++) {
        c = (crc ^ buf[n]) & 0xff;
        for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
        crc = (crc >>> 8) ^ c;
    }
    return (crc ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
    const d = Buffer.isBuffer(data) ? data : Buffer.from(data, 'latin1');
    const len = Buffer.alloc(4); len.writeUInt32BE(d.length);
    const td = Buffer.concat([Buffer.from(type, 'latin1'), d]);
    const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td));
    return Buffer.concat([len, td, crc]);
}

const IDAT = zlib.deflateSync(Buffer.from([0, 255, 0, 0]));

function buildPng() {
    const ihdr = Buffer.from([0, 0, 0, 1, 0, 0, 0, 1, 8, 2, 0, 0, 0]);
    return bytes(
        [0x89], 'PNG\r\n\x1a\n',
        pngChunk('IHDR', ihdr),
        pngChunk('sRGB', Buffer.from([0])),
        pngChunk('tEXt', 'parameters\0a cat, masterpiece\nSteps: 20, Sampler: Euler'),
        pngChunk('zTXt', Buffer.concat([Buffer.from('workflow\0\0', 'latin1'), zlib.deflateSync(Buffer.from('{"nodes":[]}'))])),
        pngChunk('iTXt', 'XML:com.adobe.xmp\0\0\0\0\0' + XMP_AI),
        pngChunk('eXIf', tiffBigEndian([{ tag: 0x0131, type: 2, count: 8, value: ascii('ComfyUI') }])),
        pngChunk('caBX', c2paPayload()),
        pngChunk('IDAT', IDAT),
        pngChunk('IEND', Buffer.alloc(0))
    );
}

function webpChunk(type, data) {
    const d = Buffer.isBuffer(data) ? data : Buffer.from(data, 'latin1');
    const len = Buffer.alloc(4); len.writeUInt32LE(d.length);
    return Buffer.concat([Buffer.from(type, 'latin1'), len, d, d.length & 1 ? Buffer.from([0]) : Buffer.alloc(0)]);
}

const VP8 = Buffer.from('fake-vp8-bitstream', 'latin1'); // 18 byte

function buildWebp() {
    const vp8x = Buffer.from([0x0c | 0x20, 0, 0, 0, 0, 0, 0, 0, 0, 0]); // EXIF + XMP + ICC
    const body = Buffer.concat([
        Buffer.from('WEBP', 'latin1'),
        webpChunk('VP8X', vp8x),
        webpChunk('ICCP', 'icc'),
        webpChunk('VP8 ', VP8),
        webpChunk('EXIF', tiffBigEndian([{ tag: 0x0131, type: 2, count: 8, value: ascii('Gemini!') }])),
        webpChunk('XMP ', XMP_AI),
    ]);
    const size = Buffer.alloc(4); size.writeUInt32LE(body.length);
    return bytes('RIFF', size, body);
}

const has = (hay, needle) => Buffer.from(hay).includes(Buffer.from(needle, 'latin1'));

function pngChunkTypes(b) {
    const types = [];
    for (let p = 8; p < b.length;) {
        const len = Buffer.from(b).readUInt32BE(p);
        types.push(Buffer.from(b.subarray(p + 4, p + 8)).toString('latin1'));
        p += 12 + len;
    }
    return types;
}

// ---------- core ----------

test('detectFormat nhận JPEG, PNG, WebP theo magic bytes và từ chối định dạng khác', () => {
    assert.equal(core.detectFormat(buildJpeg()), 'jpeg');
    assert.equal(core.detectFormat(buildPng()), 'png');
    assert.equal(core.detectFormat(buildWebp()), 'webp');
    assert.equal(core.detectFormat(bytes('GIF89a-not-supported')), null);
    assert.throws(() => core.strip(bytes('GIF89a-not-supported')), /không hỗ trợ/);
});

test('JPEG: phát hiện dấu hiệu AI trong EXIF, XMP, C2PA và comment', () => {
    const info = core.inspect(buildJpeg());
    const keys = info.entries.map((e) => `${e.group}:${e.key}`);
    assert.ok(keys.includes('EXIF:Software'));
    assert.ok(keys.includes('XMP:Iptc4xmpExt:DigitalSourceType'));
    assert.ok(keys.includes('C2PA:claim_generator'));
    assert.equal(info.entries.find((e) => e.key === 'claim_generator').value, 'ChatGPT via OpenAI');
    assert.ok(info.aiSignals.length >= 4);
    assert.ok(info.entries.some((e) => e.group === 'Màu (giữ lại)'));
});

test('JPEG: xoá metadata, giữ ICC + dữ liệu scan nguyên byte + orientation', () => {
    const src = buildJpeg();
    const { bytes: out, removed } = core.strip(src);

    for (const secret of ['Midjourney', 'trainedAlgorithmicMedia', 'c2pa', 'stable diffusion', 'TRAILER']) {
        assert.equal(has(out, secret), false, `còn "${secret}"`);
    }
    assert.ok(has(out, 'ICC_PROFILE'));
    assert.ok(has(out, 'JFIF'));
    // Scan data + EOI ở cuối, y nguyên
    assert.deepEqual(Buffer.from(out.subarray(out.length - SCAN.length - 2)), Buffer.concat([SCAN, Buffer.from([0xff, 0xd9])]));
    assert.deepEqual(removed.map((r) => r.group).sort(), ['C2PA', 'Comment', 'EXIF', 'Khác', 'XMP']);

    const after = core.inspect(out);
    assert.deepEqual(after.aiSignals, []);
    assert.deepEqual(after.entries.filter((e) => e.group === 'EXIF').map((e) => [e.key, e.value]), [['Orientation', '6']]);

    const noOrientation = core.strip(src, { keepOrientation: false }).bytes;
    assert.equal(has(noOrientation, 'Exif'), false);
});

test('JPEG: file thiếu EOI không bị nhân đôi byte cuối', () => {
    const src = buildJpeg();
    const cut = src.subarray(0, src.length - 'TRAILER-WITH-SECRET'.length - 2);
    const out = core.strip(cut).bytes;
    assert.deepEqual(Buffer.from(out.subarray(out.length - SCAN.length)), SCAN);
});

test('PNG: phát hiện prompt SD/ComfyUI, XMP, EXIF, C2PA', () => {
    const info = core.inspect(buildPng());
    const parameters = info.entries.find((e) => e.key === 'parameters');
    assert.ok(parameters.isAi);
    assert.match(parameters.value, /masterpiece/);
    const workflow = info.entries.find((e) => e.key === 'workflow');
    assert.ok(workflow.isAi);
    assert.equal(workflow.value, null);
    assert.equal(zlib.inflateSync(Buffer.from(workflow.compressed)).toString(), '{"nodes":[]}');
    assert.ok(info.entries.some((e) => e.group === 'XMP' && e.isAi));
    assert.ok(info.entries.some((e) => e.group === 'EXIF' && e.value === 'ComfyUI' && e.isAi));
    assert.ok(info.entries.some((e) => e.group === 'C2PA'));
});

test('PNG: chỉ giữ chunk hiển thị, IDAT và CRC nguyên byte', () => {
    const src = buildPng();
    const { bytes: out, removed } = core.strip(src);
    assert.deepEqual(pngChunkTypes(out), ['IHDR', 'sRGB', 'IDAT', 'IEND']);
    assert.ok(has(out, pngChunk('IDAT', IDAT).toString('latin1')));
    assert.equal(removed.length, 5);
    assert.deepEqual(core.inspect(out).entries, []);
});

test('WebP: xoá EXIF/XMP, tắt cờ VP8X, sửa kích thước RIFF, giữ VP8 + ICC', () => {
    const src = buildWebp();
    const info = core.inspect(src);
    assert.ok(info.aiSignals.length >= 2);

    const { bytes: out } = core.strip(src);
    const buf = Buffer.from(out);
    assert.equal(buf.readUInt32LE(4), buf.length - 8);
    assert.equal(buf[20] & 0x0c, 0, 'cờ EXIF/XMP phải tắt');
    assert.equal(buf[20] & 0x20, 0x20, 'cờ ICC giữ nguyên');
    assert.ok(buf.includes(webpChunk('VP8 ', VP8)));
    assert.ok(buf.includes(webpChunk('ICCP', 'icc')));
    assert.equal(has(out, 'Gemini'), false);
    assert.equal(has(out, 'xmpmeta'), false);
    assert.deepEqual(core.inspect(out).aiSignals, []);
});

test('PNG + WebP: giữ Orientation bằng EXIF tối thiểu (trình duyệt xoay theo eXIf/EXIF)', () => {
    const exif = tiffBigEndian([
        { tag: 0x0112, type: 3, count: 1, value: short(6) },
        { tag: 0x0131, type: 2, count: 8, value: ascii('ComfyUI') },
    ]);

    const png = bytes(buildPng().subarray(0, 8 + 25), pngChunk('eXIf', exif), pngChunk('IDAT', IDAT), pngChunk('IEND', Buffer.alloc(0)));
    const pngOut = core.strip(png).bytes;
    assert.deepEqual(pngChunkTypes(pngOut), ['IHDR', 'eXIf', 'IDAT', 'IEND']);
    const pngAfter = core.inspect(pngOut);
    assert.deepEqual(pngAfter.entries.map((e) => [e.key, e.value]), [['Orientation', '6']]);
    assert.equal(has(pngOut, 'ComfyUI'), false);
    // CRC của eXIf mới phải đúng
    const p = 8 + 25;
    const len = Buffer.from(pngOut).readUInt32BE(p);
    assert.equal(Buffer.from(pngOut).readUInt32BE(p + 8 + len), crc32(Buffer.from(pngOut.subarray(p + 4, p + 8 + len))));
    assert.deepEqual(pngChunkTypes(core.strip(png, { keepOrientation: false }).bytes), ['IHDR', 'IDAT', 'IEND']);

    const body = Buffer.concat([
        Buffer.from('WEBP', 'latin1'),
        webpChunk('VP8X', Buffer.from([0x08, 0, 0, 0, 0, 0, 0, 0, 0, 0])),
        webpChunk('VP8 ', VP8),
        webpChunk('EXIF', exif),
    ]);
    const size = Buffer.alloc(4); size.writeUInt32LE(body.length);
    const webpOut = Buffer.from(core.strip(bytes('RIFF', size, body)).bytes);
    assert.equal(webpOut.readUInt32LE(4), webpOut.length - 8);
    assert.equal(webpOut[20] & 0x08, 0x08, 'cờ EXIF bật lại cho EXIF tối thiểu');
    assert.deepEqual(core.inspect(webpOut).entries.map((e) => [e.key, e.value]), [['Orientation', '6']]);
    assert.equal(webpOut.includes('ComfyUI'), false);
});

// ---------- details (tab "Tất cả metadata") ----------

const section = (info, id) => info.sections.find((s) => s.id === id);
const row = (sec, key) => sec && sec.rows.find((r) => r.key === key);

test('inspectAll: thông số JPEG, mọi tag EXIF (kể cả tag lạ), XMP, C2PA, cấu trúc', () => {
    const info = details.inspectAll(buildJpeg());
    const props = section(info, 'props');
    assert.equal(row(props, 'Kích thước').value, '1 × 1 px');
    assert.equal(row(props, 'Kiểu nén').value, 'Baseline');
    assert.match(row(props, 'Chất lượng ước tính').value, /≈ \d+ \/ 100/);

    const ifd0 = section(info, 'exif-ifd0');
    assert.match(row(ifd0, 'Orientation').value, /^6 — Xoay 90°/);
    assert.equal(row(ifd0, 'Software').value, 'Midjourney');

    const xmp = section(info, 'xmp');
    assert.equal(row(xmp, 'xmp:CreatorTool').value, 'Midjourney');
    assert.match(row(xmp, 'Iptc4xmpExt:DigitalSourceType').value, /trainedAlgorithmicMedia/);
    assert.match(xmp.raw, /x:xmpmeta/);

    assert.equal(row(section(info, 'c2pa'), 'claim_generator').value, 'ChatGPT via OpenAI');
    assert.equal(row(section(info, 'other'), 'Comment (COM)').value, 'made with stable diffusion');

    const structure = section(info, 'structure').rows.map((r) => r.key);
    assert.equal(structure[0], 'SOI');
    assert.ok(structure.includes('SOS + dữ liệu ảnh'));
    assert.ok(structure.includes('Dữ liệu sau EOI'));

    const withUnknownTag = bytes([0xff, 0xd8], jpegSegment(0xe1, Buffer.concat([Buffer.from('Exif\0\0', 'latin1'),
        tiffBigEndian([{ tag: 0xbeef, type: 3, count: 1, value: short(7) }])])), [0xff, 0xd9]);
    assert.equal(row(section(details.inspectAll(withUnknownTag), 'exif-ifd0'), 'Tag 0xbeef').value, '7');
});

test('inspectAll: thông số PNG + text chunk + WebP kích thước từ bitstream', () => {
    const png = details.inspectAll(buildPng());
    assert.equal(row(section(png, 'props'), 'Kiểu màu').value, 'RGB');
    assert.equal(row(section(png, 'props'), 'sRGB').value, 'Perceptual');
    const text = section(png, 'text');
    assert.match(row(text, 'parameters (tEXt)').value, /masterpiece/);
    assert.ok(row(text, 'workflow (zTXt)').compressed);

    const vp8 = Buffer.from([0x30, 0x01, 0x00, 0x9d, 0x01, 0x2a, 0x40, 0x01, 0xf0, 0x00]); // 320 × 240
    const body = Buffer.concat([Buffer.from('WEBP', 'latin1'), webpChunk('VP8 ', vp8)]);
    const size = Buffer.alloc(4); size.writeUInt32LE(body.length);
    const webp = details.inspectAll(bytes('RIFF', size, body));
    assert.equal(row(section(webp, 'props'), 'Kích thước').value, '320 × 240 px');
    assert.equal(row(section(webp, 'props'), 'Kiểu nén').value, 'Lossy (VP8)');
});

// ---------- editor (tab "Chỉnh sửa") ----------

const EDIT = {
    title: 'Hoa đào ngày Tết', description: 'Chợ hoa Hàng Lược', keywords: 'tết; hoa đào',
    artist: 'Nguyễn Văn A', copyright: '© 2026 Sắp Tết', make: 'Canon', model: 'EOS R6', software: '',
    dateTimeOriginal: '2026-01-28T08:30:00', dateTime: '2026-01-29T10:00', comment: 'Ảnh chụp buổi sáng ☀️',
    orientation: '6', latitude: '21.034567', longitude: '105.850123', dpi: '300',
};

test('readEditable đọc giá trị hiện tại để điền sẵn form', () => {
    const v = editor.readEditable(buildJpeg());
    assert.equal(v.software, 'Midjourney');
    assert.equal(v.aiLabel, 'true');
    assert.equal(v.orientation, '6');
    assert.equal(v.title, '');
    assert.equal(v.dpi, '');
    assert.deepEqual(Object.keys(v).sort(), editor.FIELDS.map((f) => f.id).sort());
});

test('apply JPEG: ghi EXIF mới (tiếng Việt, GPS, DPI JFIF), xoá mọi metadata khác, giữ scan', () => {
    const { bytes: out, written } = editor.apply(buildJpeg(), EDIT);
    const round = editor.readEditable(out);
    for (const key of ['title', 'description', 'keywords', 'artist', 'copyright', 'make', 'model', 'comment', 'orientation', 'dpi']) {
        assert.equal(round[key], String(EDIT[key]), key);
    }
    assert.equal(round.dateTimeOriginal, '2026-01-28T08:30:00');
    assert.equal(round.dateTime, '2026-01-29T10:00:00');
    assert.equal(round.software, '');
    assert.ok(Math.abs(Number(round.latitude) - 21.034567) < 1e-6);
    assert.ok(Math.abs(Number(round.longitude) - 105.850123) < 1e-6);
    assert.equal(Buffer.from(out).readUInt16BE(14), 300, 'JFIF X density = 300 dpi');
    for (const secret of ['Midjourney', 'stable diffusion', 'TRAILER']) {
        assert.equal(has(out, secret), false, secret);
    }
    assert.ok(has(out, 'ICC_PROFILE'));
    assert.deepEqual(Buffer.from(out.subarray(out.length - SCAN.length - 2)), Buffer.concat([SCAN, Buffer.from([0xff, 0xd9])]));
    // Ảnh AI: nhãn AI + C2PA gốc luôn còn
    assert.ok(has(out, jpegSegment(0xeb, c2paPayload()).toString('latin1')), 'giữ nguyên khối C2PA');
    assert.match(core.findXmp(out), /<Iptc4xmpExt:DigitalSourceType>http:\/\/cv\.iptc\.org\/newscodes\/digitalsourcetype\/trainedAlgorithmicMedia</);
    assert.ok(core.inspect(out).aiSignals.length > 0);
    assert.ok(written.some((w) => w.key === 'GPS'));

    const xmp = core.findXmp(out);
    assert.match(xmp, /<dc:title><rdf:Alt><rdf:li xml:lang="x-default">Hoa đào ngày Tết<\/rdf:li>/);
    assert.match(xmp, /<dc:subject><rdf:Bag><rdf:li>tết<\/rdf:li><rdf:li>hoa đào<\/rdf:li><\/rdf:Bag>/);
    assert.match(xmp, /<dc:rights>.*© 2026 Sắp Tết/);
});

test('readEditable lấy chữ từ XMP khi EXIF không có (ảnh từ Lightroom…)', () => {
    const xmp = '<x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF><rdf:Description rdf:about="">'
        + '<dc:title><rdf:Alt><rdf:li xml:lang="x-default">Pháo hoa &amp; giao thừa</rdf:li></rdf:Alt></dc:title>'
        + '<dc:creator><rdf:Seq><rdf:li>Trần Thị B</rdf:li></rdf:Seq></dc:creator></rdf:Description></rdf:RDF></x:xmpmeta>';
    const payload = Buffer.concat([Buffer.from('http://ns.adobe.com/xap/1.0/\0', 'latin1'), Buffer.from(xmp, 'utf8')]);
    const jpg = bytes([0xff, 0xd8], jpegSegment(0xe1, payload), [0xff, 0xd9]);
    const v = editor.readEditable(jpg);
    assert.equal(v.title, 'Pháo hoa & giao thừa');
    assert.equal(v.artist, 'Trần Thị B');
});

test('apply với form trống: không còn EXIF, JFIF về 1:1; ảnh AI vẫn còn nhãn AI', () => {
    const empty = Object.fromEntries(editor.FIELDS.map((f) => [f.id, '']));
    const out = editor.apply(buildJpeg(), empty).bytes;
    assert.equal(has(out, 'Exif'), false);
    assert.equal(out[13], 0);
    const xmp = core.findXmp(out);
    assert.match(xmp, /trainedAlgorithmicMedia/);
    assert.doesNotMatch(xmp, /<dc:/);

    const plain = bytes([0xff, 0xd8], jpegSegment(0xe0, 'JFIF\0\x01\x01\0\0\x01\0\x01\0\0'), jpegSegment(0xda, Buffer.from([1, 1, 0, 0, 0x3f, 0])), SCAN, [0xff, 0xd9]);
    const plainOut = editor.apply(plain, empty).bytes;
    assert.equal(core.findXmp(plainOut), null);
    assert.equal(has(plainOut, 'Exif'), false);
});

test('apply PNG: pHYs + eXIf trước IDAT với CRC đúng, bỏ text chunk', () => {
    const out = editor.apply(buildPng(), { ...EDIT, latitude: '', longitude: '' }).bytes;
    assert.deepEqual(pngChunkTypes(out), ['IHDR', 'sRGB', 'caBX', 'pHYs', 'eXIf', 'iTXt', 'IDAT', 'IEND']);
    assert.match(core.findXmp(out), /trainedAlgorithmicMedia/);
    assert.match(core.findXmp(out), /Hoa đào ngày Tết/);
    const buf = Buffer.from(out);
    for (let p = 8; p < buf.length;) {
        const len = buf.readUInt32BE(p);
        assert.equal(buf.readUInt32BE(p + 8 + len), crc32(buf.subarray(p + 4, p + 8 + len)));
        p += 12 + len;
    }
    const round = editor.readEditable(out);
    assert.equal(round.dpi, '300');
    assert.equal(round.title, EDIT.title);
    assert.equal(round.latitude, '');
    assert.equal(has(out, 'masterpiece'), false);
});

test('apply WebP đơn giản (không VP8X): tạo VP8X đúng kích thước khung + EXIF', () => {
    const vp8 = Buffer.from([0x30, 0x01, 0x00, 0x9d, 0x01, 0x2a, 0x40, 0x01, 0xf0, 0x00]);
    const body = Buffer.concat([Buffer.from('WEBP', 'latin1'), webpChunk('VP8 ', vp8)]);
    const size = Buffer.alloc(4); size.writeUInt32LE(body.length);
    const out = Buffer.from(editor.apply(bytes('RIFF', size, body), { artist: 'Tết', orientation: '1' }).bytes);
    assert.equal(out.readUInt32LE(4), out.length - 8);
    assert.equal(out.toString('latin1', 12, 16), 'VP8X');
    assert.equal(out[20] & 0x08, 0x08);
    assert.equal(out.readUIntLE(24, 3) + 1, 320);
    assert.equal(out.readUIntLE(27, 3) + 1, 240);
    assert.ok(out.includes(webpChunk('VP8 ', vp8)));
    assert.equal(editor.readEditable(out).artist, 'Tết');

    assert.equal(out[20] & 0x04, 0x04, 'tác giả có dấu → thêm XMP');

    assert.equal(core.findXmp(out).includes('DigitalSourceType'), false, 'ảnh không có dấu hiệu AI thì không tự gắn nhãn');

    // WebP AI đã có VP8X: EXIF + XMP (nhãn AI) và cờ tương ứng
    const out2 = Buffer.from(editor.apply(buildWebp(), { orientation: '3' }).bytes);
    assert.equal(out2[20] & 0x0c, 0x0c);
    assert.equal(editor.readEditable(out2).orientation, '3');
    assert.match(core.findXmp(out2), /trainedAlgorithmicMedia/);
    const out3 = Buffer.from(editor.apply(buildWebp(), { copyright: 'x' }).bytes);
    assert.equal(out3[20] & 0x0c, 0x0c);
    assert.equal(out3.readUInt32LE(4), out3.length - 8);
    assert.equal(has(out3, 'Gemini'), false);
    assert.equal(editor.readEditable(out3).copyright, 'x');
});

test('apply báo lỗi rõ ràng khi giá trị không hợp lệ', () => {
    assert.throws(() => editor.apply(buildJpeg(), { latitude: '21' }), /cả vĩ độ và kinh độ/);
    assert.throws(() => editor.apply(buildJpeg(), { latitude: '91', longitude: '0' }), /Vĩ độ/);
    assert.throws(() => editor.apply(buildJpeg(), { dpi: '72.5' }), /DPI/);
    assert.throws(() => editor.apply(buildJpeg(), { dateTime: 'hôm qua' }), /ngày giờ/);
    assert.throws(() => editor.apply(buildJpeg(), { description: 'x'.repeat(2001) }), /quá dài/);
});

test('mỗi trường trong form ghi đúng các trường metadata mà nhãn "writes" hiển thị', () => {
    const plainJpeg = bytes([0xff, 0xd8], jpegSegment(0xe0, 'JFIF\0\x01\x01\0\0\x01\0\x01\0\0'),
        jpegSegment(0xc0, Buffer.from([8, 0, 1, 0, 1, 1, 1, 0x11, 0])), jpegSegment(0xda, Buffer.from([1, 1, 0, 0, 0x3f, 0])), SCAN, [0xff, 0xd9]);
    const plainPng = bytes([0x89], 'PNG\r\n\x1a\n', pngChunk('IHDR', Buffer.from([0, 0, 0, 1, 0, 0, 0, 1, 8, 2, 0, 0, 0])), pngChunk('IDAT', IDAT), pngChunk('IEND', Buffer.alloc(0)));
    const sample = {
        copyright: '© x', artist: 'a', credit: 'c', rightsUrl: 'https://x.vn', usageTerms: 'u', aiLabel: 'true',
        title: 't', description: 'd', keywords: 'k1; k2', comment: 'c', make: 'm', model: 'm', software: 's',
        dateTimeOriginal: '2026-01-01T08:00:00', dateTime: '2026-01-02T08:00:00', orientation: '6', dpi: '300',
    };
    const keysOf = (src) => {
        const info = details.inspectAll(src);
        const keys = new Set();
        for (const sec of info.sections) {
            for (const r of sec.rows) {
                if (sec.id.startsWith('exif')) keys.add('EXIF ' + r.key);
                else if (sec.id.startsWith('xmp')) keys.add('XMP ' + r.key);
                else if (r.key === 'Độ phân giải (JFIF)') keys.add('JFIF (JPEG)');
                else if (r.key === 'Độ phân giải (pHYs)') keys.add('pHYs (PNG)');
            }
        }
        return keys;
    };
    for (const f of editor.FIELDS) {
        assert.ok(Array.isArray(f.writes) && f.writes.length, `${f.id} thiếu writes`);
        const values = f.kind === 'gps' ? { latitude: '21.5', longitude: '105.5' } : { [f.id]: sample[f.id] };
        const jpegKeys = keysOf(editor.apply(plainJpeg, values).bytes);
        const pngKeys = keysOf(editor.apply(plainPng, values).bytes);
        for (const w of f.writes) {
            const found = w === 'pHYs (PNG)' ? pngKeys.has(w) : jpegKeys.has(w);
            assert.ok(found, `${f.id}: không thấy ${w} trong file xuất ra`);
        }
    }
});

// ---------- giá trị mặc định của tab "Chỉnh sửa" lấy từ mọi nguồn có sẵn ----------

const xmpJpeg = (inner) => bytes([0xff, 0xd8], jpegSegment(0xe1, Buffer.concat([Buffer.from('http://ns.adobe.com/xap/1.0/\0', 'latin1'),
    Buffer.from('<x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF><rdf:Description rdf:about="" ' + inner + '</rdf:RDF></x:xmpmeta>', 'utf8')])), [0xff, 0xd9]);

test('mặc định lấy từ XMP khi EXIF không có (máy, phần mềm, ngày, hướng, GPS, DPI, headline)', () => {
    const src = xmpJpeg('tiff:Make="Nikon" tiff:Model="Z6" xmp:CreatorTool="Lightroom Classic" '
        + 'xmp:CreateDate="2026-01-28T08:30:15+07:00" xmp:ModifyDate="2026-02-01T09:00" tiff:Orientation="8" '
        + 'exif:GPSLatitude="21,1.71N" exif:GPSLongitude="105,51.3E" tiff:XResolution="240/1" photoshop:Headline="Chợ hoa"/>');
    const { values: v, sources } = editor.readEditableDetailed(src);
    assert.equal(v.make, 'Nikon');
    assert.equal(v.model, 'Z6');
    assert.equal(v.software, 'Lightroom Classic');
    assert.equal(sources.software, 'XMP xmp:CreatorTool');
    assert.equal(v.dateTimeOriginal, '2026-01-28T08:30:15');
    assert.equal(v.dateTime, '2026-02-01T09:00:00');
    assert.equal(v.orientation, '8');
    assert.equal(v.latitude, '21.0285');
    assert.equal(v.longitude, '105.855');
    assert.equal(v.dpi, '240');
    assert.equal(v.title, 'Chợ hoa');
    assert.equal(sources.title, 'XMP photoshop:Headline');
});

test('mặc định lấy từ IPTC (tiêu đề, mô tả, nhiều từ khoá, ngày tạo)', () => {
    const src = photoJpeg(iptcApp13([[5, 'Giao thừa'], [120, 'Pháo hoa Hồ Gươm'], [25, 'tết'], [25, 'pháo hoa'], [55, '20260216'], [60, '235959+0700']]));
    const { values: v, sources } = editor.readEditableDetailed(src);
    assert.equal(v.title, 'Giao thừa');
    assert.equal(v.description, 'Pháo hoa Hồ Gươm');
    assert.equal(v.keywords, 'tết; pháo hoa');
    assert.equal(v.dateTimeOriginal, '2026-02-16T23:59:59');
    assert.equal(sources.keywords, 'IPTC Keywords');

    // Lưu lại: giá trị chuyển sang trường chuẩn và vẫn đọc ra như cũ
    const out = editor.apply(src, v).bytes;
    const again = editor.readEditableDetailed(out);
    assert.equal(again.values.keywords, 'tết; pháo hoa');
    assert.equal(again.sources.title, 'EXIF XPTitle');
});

test('mặc định lấy từ PNG text + tIME; Copyright/Author trong PNG cũng được bảo vệ', () => {
    const png = bytes([0x89], 'PNG\r\n\x1a\n', pngChunk('IHDR', Buffer.from([0, 0, 0, 1, 0, 0, 0, 1, 8, 2, 0, 0, 0])),
        pngChunk('tEXt', 'Title\0Mai vàng'),
        pngChunk('iTXt', Buffer.concat([Buffer.from('Author\0\0\0\0\0', 'latin1'), Buffer.from('Nguyễn Văn A', 'utf8')])),
        pngChunk('tEXt', 'Description\0Hoa mai'),
        pngChunk('tEXt', 'Copyright\0(c) 2026 A'),
        pngChunk('tEXt', 'Software\0GIMP 2.10'),
        pngChunk('tEXt', 'Comment\0Chup bang dien thoai'),
        pngChunk('tEXt', 'Creation Time\0Tue, 17 Feb 2026 06:05:00 +0700'),
        pngChunk('tEXt', 'Source\0Pixel 9'),
        pngChunk('tIME', Buffer.from([0x07, 0xea, 2, 18, 10, 20, 30])),
        pngChunk('IDAT', IDAT), pngChunk('IEND', Buffer.alloc(0)));
    const { values: v, sources } = editor.readEditableDetailed(png);
    assert.deepEqual(
        [v.title, v.artist, v.description, v.copyright, v.software, v.comment, v.dateTimeOriginal, v.model, v.dateTime],
        ['Mai vàng', 'Nguyễn Văn A', 'Hoa mai', '(c) 2026 A', 'GIMP 2.10', 'Chup bang dien thoai', '2026-02-17T06:05:00', 'Pixel 9', '2026-02-18T10:20:30']);
    assert.equal(sources.copyright, 'PNG Copyright');
    assert.deepEqual(editor.policy(png).protectedIds.sort(), ['artist', 'copyright']);
    assert.equal(editor.readEditable(editor.clean(png).bytes).copyright, '(c) 2026 A');
});

test('mặc định lấy từ thẻ EXIF thay thế (XPAuthor, XPComment, DateTimeDigitized); EXIF chuẩn được ưu tiên hơn XMP', () => {
    const xp = (s) => Buffer.concat([Buffer.from(s, 'utf16le'), Buffer.alloc(2)]);
    const exif = tiffBigEndian([
        { tag: 0x010f, type: 2, count: 6, value: ascii('Canon') },
        { tag: 0x9c9c, type: 1, count: xp('Ghi chú XP').length, value: xp('Ghi chú XP') },
        { tag: 0x9c9d, type: 1, count: xp('Tác giả XP').length, value: xp('Tác giả XP') },
    ]);
    const xmp = '<x:xmpmeta><rdf:RDF><rdf:Description tiff:Make="Nikon"/></rdf:RDF></x:xmpmeta>';
    const src = photoJpeg(jpegSegment(0xe1, Buffer.concat([Buffer.from('Exif\0\0', 'latin1'), exif])),
        jpegSegment(0xe1, 'http://ns.adobe.com/xap/1.0/\0' + xmp));
    const { values: v, sources } = editor.readEditableDetailed(src);
    assert.equal(v.make, 'Canon');
    assert.equal(sources.make, 'EXIF Make');
    assert.equal(v.artist, 'Tác giả XP');
    assert.equal(sources.artist, 'EXIF XPAuthor');
    assert.equal(v.comment, 'Ghi chú XP');
});

// ---------- chính sách: bản quyền được bảo vệ, nhãn AI theo quy định ----------

function iptcApp13(records) {
    const iim = Buffer.concat(records.map(([ds, text]) => {
        const v = Buffer.from(text, 'utf8');
        return Buffer.concat([Buffer.from([0x1c, 2, ds, v.length >> 8, v.length & 0xff]), v]);
    }));
    const size = Buffer.alloc(4); size.writeUInt32BE(iim.length);
    return jpegSegment(0xed, Buffer.concat([Buffer.from('Photoshop 3.0\0', 'latin1'), Buffer.from('8BIM', 'latin1'),
        Buffer.from([0x04, 0x04, 0, 0]), size, iim, Buffer.alloc(iim.length % 2)]));
}

function photoJpeg(...segments) {
    return bytes([0xff, 0xd8], jpegSegment(0xe0, 'JFIF\0\x01\x01\0\0\x01\0\x01\0\0'), ...segments,
        jpegSegment(0xda, Buffer.from([1, 1, 0, 0, 0x3f, 0])), SCAN, [0xff, 0xd9]);
}

test('bản quyền đã có trong ảnh (EXIF) không sửa, không xoá được', () => {
    const exif = tiffBigEndian([
        { tag: 0x013b, type: 2, count: 8, value: ascii('Ethan N') },
        { tag: 0x8298, type: 2, count: 12, value: ascii('(c) SapTet.') },
    ]);
    const src = photoJpeg(jpegSegment(0xe1, Buffer.concat([Buffer.from('Exif\0\0', 'latin1'), exif])));
    const p = editor.policy(src);
    assert.deepEqual(p.protectedIds.sort(), ['artist', 'copyright']);
    assert.equal(p.ai.detected, false);

    const res = editor.apply(src, { copyright: 'Của tôi', artist: '', credit: 'Nguồn mới' });
    const v = editor.readEditable(res.bytes);
    assert.equal(v.copyright, '(c) SapTet.');
    assert.equal(v.artist, 'Ethan N');
    assert.equal(v.credit, 'Nguồn mới', 'trường bản quyền còn trống thì được thêm');
    assert.ok(res.kept.some((k) => k.key === 'Bản quyền' && k.locked));
    assert.ok(res.kept.some((k) => k.key === 'Nguồn / credit' && !k.locked));

    const cleaned = editor.readEditable(editor.clean(src).bytes);
    assert.equal(cleaned.copyright, '(c) SapTet.');
    assert.equal(cleaned.artist, 'Ethan N');
});

test('bản quyền trong IPTC / XMP cũng được bảo vệ', () => {
    const src = photoJpeg(iptcApp13([[116, '© Báo Tết 2026'], [80, 'Phóng viên A'], [110, 'TTXVN']]));
    const v = editor.readEditable(editor.clean(src).bytes);
    assert.equal(v.copyright, '© Báo Tết 2026');
    assert.equal(v.artist, 'Phóng viên A');
    assert.equal(v.credit, 'TTXVN');

    const xmp = '<x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF><rdf:Description rdf:about="">'
        + '<xmpRights:WebStatement>https://saptet.vn/ban-quyen</xmpRights:WebStatement>'
        + '<xmpRights:UsageTerms><rdf:Alt><rdf:li xml:lang="x-default">Không dùng thương mại</rdf:li></rdf:Alt></xmpRights:UsageTerms>'
        + '</rdf:Description></rdf:RDF></x:xmpmeta>';
    const src2 = photoJpeg(jpegSegment(0xe1, Buffer.concat([Buffer.from('http://ns.adobe.com/xap/1.0/\0', 'latin1'), Buffer.from(xmp, 'utf8')])));
    const v2 = editor.readEditable(editor.apply(src2, { rightsUrl: 'https://khac.vn', usageTerms: '' }).bytes);
    assert.equal(v2.rightsUrl, 'https://saptet.vn/ban-quyen');
    assert.equal(v2.usageTerms, 'Không dùng thương mại');
});

test('ảnh AI luôn có nhãn AI dù người dùng bỏ chọn; ảnh thường gắn nhãn khi người dùng chọn', () => {
    const forced = editor.apply(buildPng(), { aiLabel: '' });
    assert.match(core.findXmp(forced.bytes), /trainedAlgorithmicMedia/);
    assert.ok(forced.kept.some((k) => k.key.startsWith('Nhãn AI') && k.locked));
    assert.ok(forced.kept.some((k) => k.key.startsWith('Content Credentials')));

    const plain = photoJpeg();
    assert.equal(core.findXmp(editor.apply(plain, { aiLabel: '' }).bytes), null);
    const labelled = editor.apply(plain, { aiLabel: 'true' });
    assert.match(core.findXmp(labelled.bytes), /trainedAlgorithmicMedia/);
    assert.equal(editor.policy(labelled.bytes).ai.detected, true, 'sau khi gắn, nhãn trở thành bắt buộc');

    const compositeXmp = '<x:xmpmeta><rdf:RDF><rdf:Description Iptc4xmpExt:DigitalSourceType="'
        + 'http://cv.iptc.org/newscodes/digitalsourcetype/compositeWithTrainedAlgorithmicMedia"/></rdf:RDF></x:xmpmeta>';
    const composite = photoJpeg(jpegSegment(0xe1, 'http://ns.adobe.com/xap/1.0/\0' + compositeXmp));
    assert.match(core.findXmp(editor.clean(composite).bytes), /digitalsourcetype\/compositeWithTrainedAlgorithmicMedia</);
});

test('clean: bỏ thông tin riêng tư, giữ bản quyền + nhãn AI + C2PA + orientation', () => {
    const res = editor.clean(buildJpeg());
    const out = res.bytes;
    for (const secret of ['Midjourney', 'stable diffusion', 'TRAILER', 'CreatorTool']) {
        assert.equal(has(out, secret), false, secret);
    }
    assert.ok(has(out, jpegSegment(0xeb, c2paPayload()).toString('latin1')));
    assert.match(core.findXmp(out), /trainedAlgorithmicMedia/);
    assert.equal(editor.readEditable(out).orientation, '6');
    assert.equal(editor.readEditable(editor.clean(buildJpeg(), { keepOrientation: false }).bytes).orientation, '1');
    assert.ok(res.removed.some((r) => r.group === 'EXIF'));
    assert.deepEqual(res.kept.map((k) => k.key), ['Nhãn AI (IPTC DigitalSourceType)', 'Content Credentials (C2PA)']);
    assert.deepEqual(core.inspect(Buffer.from(out)).aiSignals.length > 0, true);
});

// ---------- page ----------

test('trang /images-metadata được index: robots, canonical, sitemap, OG, JSON-LD', () => {
    const html = read('images-metadata/index.html');
    assert.match(html, /<title>[^<]*metadata ảnh[^<]*<\/title>/);
    assert.match(html, /<h1>Chỉnh sửa thông số ảnh<\/h1>/);
    assert.match(html, /<meta name="robots" content="index, follow">/);
    assert.doesNotMatch(html, /noindex/);
    assert.match(html, /<link rel="canonical" href="https:\/\/saptet\.vn\/images-metadata">/);
    assert.match(html, /<meta property="og:url" content="https:\/\/saptet\.vn\/images-metadata">/);
    assert.match(html, /<meta name="description" content="[^"]{80,170}">/);

    const ld = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    const types = ld['@graph'].map((n) => n['@type']);
    assert.deepEqual(types, ['WebPage', 'WebApplication']);
    assert.ok(ld['@graph'].every((n) => n.url === 'https://saptet.vn/images-metadata'));

    const sitemap = read('sitemap.xml');
    assert.match(sitemap, /<loc>https:\/\/saptet\.vn\/images-metadata<\/loc>/);
    assert.doesNotMatch(sitemap, /remove-metadata/);
    assert.match(read('robots.txt'), /Allow: \/images-metadata/);

    const order = ['image-metadata-core', 'image-metadata-details', 'image-metadata-editor', 'images-metadata-page']
        .map((name) => html.indexOf(`js/${name}.js`));
    assert.ok(order.every((i, k) => i > 0 && (k === 0 || i > order[k - 1])), 'script phải load đúng thứ tự phụ thuộc');
    assert.match(html, /js\/footer\.js/);
    assert.match(html, /watermark ẩn/i);
    assert.match(html, /được bảo vệ/);
    assert.match(html, /nhãn AI/);
    assert.match(html, /Luật Công nghiệp công nghệ số/);
});

test('có lối vào công cụ: footer Tiện ích (cả 3 bản) và trang Tạo mã QR', () => {
    for (const file of ['footer.html', 'js/footer.js', 'index.html']) {
        const html = read(file);
        const utilities = html.match(/aria-label="Tiện ích Sắp Tết">([\s\S]*?)<\/nav>/)[1];
        assert.match(utilities, /<a href="\/images-metadata">Thông số ảnh<\/a>/, file);
    }
    assert.match(read('qr-code/index.html'), /class="qrcode-more-tools"[\s\S]*?href="\/images-metadata"/);
});

test('trang có 3 tab: xoá metadata, tất cả metadata, chỉnh sửa', () => {
    const html = read('images-metadata/index.html');
    assert.match(html, /role="tablist"/);
    for (const id of ['strip', 'all', 'edit']) {
        assert.match(html, new RegExp(`id="rm-tab-${id}"[^>]*role="tab"|role="tab"[^>]*id="rm-tab-${id}"`));
        assert.match(html, new RegExp(`id="rm-panel-${id}"[^>]*role="tabpanel"|role="tabpanel"[^>]*id="rm-panel-${id}"`));
    }
    assert.match(html, /id="rm-edit-form"/);
    assert.match(html, /id="rm-edit-download"[^>]*disabled/);
});

test('nút tải về bị khoá tới khi xử lý xong và không vẽ lại qua canvas', () => {
    const html = read('images-metadata/index.html');
    const script = read('js/images-metadata-page.js');
    assert.match(html, /id="rm-download"[^>]*disabled/);
    assert.match(script, /ImageMetadataEditor\.clean/);
    assert.doesNotMatch(script, /ImageMetadataCore\.strip/, 'trang phải đi qua chính sách bảo vệ, không strip trực tiếp');
    assert.match(script, /ImageMetadataEditor\.apply/);
    for (const file of ['js/images-metadata-page.js', 'js/image-metadata-editor.js', 'js/image-metadata-details.js']) {
        assert.doesNotMatch(read(file), /canvas|toBlob|toDataURL/, file);
    }
    assert.doesNotMatch(script, /innerHTML\s*=\s*[^'"`]/, 'giá trị metadata phải render bằng textContent');
});
