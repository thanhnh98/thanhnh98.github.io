/**
 * Trang /images-metadata ("Chỉnh sửa thông số ảnh"): 3 tab
 *  - Làm sạch: ImageMetadataEditor.clean (cắt byte, không vẽ lại ảnh)
 *  - Tất cả metadata: ImageMetadataDetails.inspectAll cho ảnh gốc / sau làm sạch / sau chỉnh
 *  - Chỉnh sửa: form dựng từ ImageMetadataEditor.FIELDS, xuất bằng ImageMetadataEditor.apply
 * Chính sách bản quyền + nhãn AI nằm trong ImageMetadataEditor; trang chỉ khoá ô để người dùng thấy rõ.
 * Mọi giá trị metadata render bằng textContent vì nội dung do file người dùng quyết định.
 */
(function () {
    'use strict';

    var core = window.ImageMetadataCore;
    var Details = window.ImageMetadataDetails;
    var Editor = window.ImageMetadataEditor;
    var PREVIEW_CHARS = 400;
    var FORMAT_LABEL = { jpeg: 'JPEG', png: 'PNG', webp: 'WebP' };
    var TEXT_KINDS = ['ascii', 'xp', 'comment', 'date', 'gps'];
    var SECTIONS = {
        rights: { title: 'Bản quyền', note: 'Thông tin đã có trong ảnh gốc được giữ nguyên, không sửa được. Ô trống có thể điền thêm.' },
        ai: { title: 'Nhãn AI' },
        describe: { title: 'Mô tả ảnh' },
        device: { title: 'Thiết bị' },
        time: { title: 'Thời gian' },
        location: { title: 'Vị trí' },
        display: { title: 'Hiển thị & in' }
    };
    var AI_HINT_LOCKED = 'Ảnh có dấu hiệu AI — nhãn bắt buộc theo quy định, không thể bỏ.';
    var AI_HINT_OPEN = 'Chọn nếu ảnh do AI tạo. Đã gắn thì không gỡ được.';
    var LOCK_ICON = 'M7 11V8a5 5 0 0 1 10 0v3M6 11h12v9H6z';

    var $ = function (id) { return document.getElementById(id); };
    var els = {
        drop: $('rm-drop'), file: $('rm-file'), error: $('rm-error'), work: $('rm-work'),
        preview: $('rm-preview'), name: $('rm-name'), format: $('rm-format'),
        dimensions: $('rm-dimensions'), size: $('rm-size'), reset: $('rm-reset'),
        signalBefore: $('rm-signal-before'), metaBefore: $('rm-meta-before'),
        strip: $('rm-strip'), download: $('rm-download'), keepOrientation: $('rm-keep-orientation'),
        after: $('rm-after'), signalAfter: $('rm-signal-after'), sizeDiff: $('rm-size-diff'),
        removed: $('rm-removed'), kept: $('rm-kept'), metaAfter: $('rm-meta-after'),
        all: $('rm-all'), allFilter: $('rm-all-filter'),
        form: $('rm-edit-form'), editError: $('rm-edit-error'), editDownload: $('rm-edit-download'),
        editClear: $('rm-edit-clear'), editRestore: $('rm-edit-restore'), editResult: $('rm-edit-result'),
        editSignal: $('rm-edit-signal'), editSize: $('rm-edit-size'), editWritten: $('rm-edit-written'),
        editKept: $('rm-edit-kept')
    };
    var tabs = Array.prototype.slice.call(document.querySelectorAll('.rm-tab'));
    var sourceRadios = Array.prototype.slice.call(document.querySelectorAll('input[name="rm-source"]'));

    var state = emptyState();

    function emptyState() {
        return { name: '', bytes: null, format: null, previewUrl: null, stripped: null, edited: null, original: null, policy: null };
    }

    function track(name) {
        if (typeof window.clarity === 'function') window.clarity('event', name);
    }

    function formatBytes(n) {
        if (n < 1024) return n + ' B';
        if (n < 1024 * 1024) return (n / 1024).toFixed(1) + ' KB';
        return (n / 1024 / 1024).toFixed(2) + ' MB';
    }

    function el(tag, className, text) {
        var node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined) node.textContent = text;
        return node;
    }

    function showError(node, message) {
        node.textContent = message || '';
        node.hidden = !message;
    }

    // ---------- giải nén zTXt / iTXt / iCCP (zlib = 'deflate') ----------

    function inflateBytes(data) {
        if (typeof DecompressionStream === 'undefined') return Promise.resolve(null);
        var stream = new Blob([data]).stream().pipeThrough(new DecompressionStream('deflate'));
        return new Response(stream).arrayBuffer()
            .then(function (buf) { return new Uint8Array(buf); })
            .catch(function () { return null; });
    }

    function inflateText(data) {
        return inflateBytes(data).then(function (b) { return b ? new TextDecoder('utf-8').decode(b) : null; });
    }

    function resolveCompressed(info) {
        var jobs = info.entries.filter(function (e) { return e.compressed; }).map(function (e) {
            return inflateText(e.compressed).then(function (text) {
                if (text === null) { e.value = '(nén, không giải được)'; return; }
                e.value = text;
                e.isAi = e.isAi || core.AI_TOOL_RE.test(text) || core.AI_SOURCE_RE.test(text);
            });
        });
        return Promise.all(jobs).then(function () {
            info.aiSignals = core.aiSignals(info.entries);
            return info;
        });
    }

    function resolveSections(sections) {
        var jobs = [];
        sections.forEach(function (s) {
            s.rows.forEach(function (r) {
                if (!r.compressed) return;
                jobs.push(inflateText(r.compressed).then(function (text) { r.value = text === null ? '(nén, không giải được)' : text; }));
            });
            if (s.compressedIcc) {
                jobs.push(inflateBytes(s.compressedIcc).then(function (icc) {
                    if (icc) s.rows = s.rows.concat(Details.parseIcc(icc));
                }));
            }
        });
        return Promise.all(jobs).then(function () { return sections; });
    }

    // ---------- render bảng ----------

    function renderValue(value) {
        var text = value === null || value === undefined ? '' : String(value);
        var cell = el('td', 'rm-value');
        if (text.length <= PREVIEW_CHARS) {
            cell.textContent = text;
            return cell;
        }
        var more = 'Xem hết (' + text.length.toLocaleString('vi-VN') + ' ký tự)';
        var span = el('span', '', text.slice(0, PREVIEW_CHARS) + '…');
        var toggle = el('button', 'rm-more', more);
        toggle.type = 'button';
        toggle.setAttribute('aria-expanded', 'false');
        toggle.addEventListener('click', function () {
            var expanded = toggle.getAttribute('aria-expanded') === 'true';
            span.textContent = expanded ? text.slice(0, PREVIEW_CHARS) + '…' : text;
            toggle.textContent = expanded ? more : 'Thu gọn';
            toggle.setAttribute('aria-expanded', String(!expanded));
        });
        cell.appendChild(span);
        cell.appendChild(toggle);
        return cell;
    }

    // groups: [{ title, rows: [{ key, value, isAi }], raw? }]
    function renderGroups(container, groups, emptyText) {
        container.replaceChildren();
        groups = groups.filter(function (g) { return g.rows.length || g.raw; });
        if (!groups.length) {
            container.appendChild(el('p', 'rm-empty', emptyText || 'Không có metadata nào.'));
            return;
        }
        groups.forEach(function (g) {
            var block = el('div', 'rm-group');
            block.appendChild(el('h3', 'rm-group-title', g.title + (g.rows.length > 1 ? ' (' + g.rows.length + ')' : '')));
            var table = el('table', 'rm-table');
            var tbody = el('tbody');
            g.rows.forEach(function (r) {
                var tr = el('tr', r.isAi ? 'is-ai' : '');
                tr.dataset.search = (r.key + ' ' + (r.value === null || r.value === undefined ? '' : r.value)).toLowerCase();
                var key = el('th', 'rm-key', r.key);
                key.scope = 'row';
                if (r.isAi) key.appendChild(el('span', 'rm-ai-tag', 'AI'));
                tr.appendChild(key);
                tr.appendChild(renderValue(r.value));
                tbody.appendChild(tr);
            });
            table.appendChild(tbody);
            block.appendChild(table);
            if (g.raw) {
                var details = el('details', 'rm-raw');
                details.appendChild(el('summary', '', 'XML gốc (' + g.raw.length.toLocaleString('vi-VN') + ' ký tự)'));
                details.appendChild(el('pre', '', g.raw));
                block.appendChild(details);
            }
            container.appendChild(block);
        });
    }

    function renderEntries(container, entries) {
        var groups = [];
        var byGroup = {};
        entries.forEach(function (e) {
            if (!byGroup[e.group]) { byGroup[e.group] = { title: e.group, rows: [] }; groups.push(byGroup[e.group]); }
            byGroup[e.group].rows.push(e);
        });
        renderGroups(container, groups);
    }

    // mode 'source': ảnh gốc có dấu hiệu AI không · 'result': ảnh xuất ra có mang nhãn AI không
    function renderSignal(container, info, mode) {
        container.replaceChildren();
        var found = info.aiSignals.length > 0;
        var title, note, cls;
        if (mode === 'result') {
            cls = found ? 'is-ok' : 'is-neutral';
            title = found ? 'Ảnh mang nhãn AI' : 'Ảnh không mang nhãn AI';
        } else {
            cls = found ? 'is-ai' : 'is-neutral';
            title = found ? 'Ảnh có ' + info.aiSignals.length + ' dấu hiệu tạo bởi AI' : 'Không thấy dấu hiệu AI trong metadata';
            if (found) note = 'Nhãn AI sẽ luôn được giữ khi làm sạch hoặc chỉnh sửa, theo quy định.';
        }
        container.className = 'rm-signal ' + cls;
        container.appendChild(el('strong', '', title));
        if (found) {
            var list = el('ul');
            info.aiSignals.forEach(function (s) { list.appendChild(el('li', '', s)); });
            container.appendChild(list);
        }
        if (note) container.appendChild(el('p', 'rm-signal-note', note));
    }

    function renderKept(container, kept) {
        container.replaceChildren();
        if (!kept.length) {
            container.appendChild(el('li', 'rm-empty', 'Ảnh không có bản quyền hay nhãn AI cần giữ.'));
            return;
        }
        kept.forEach(function (k) {
            var li = el('li', k.locked ? 'is-locked' : '');
            li.appendChild(el('strong', '', k.key));
            li.appendChild(el('span', '', k.value));
            if (k.locked) li.appendChild(el('span', 'rm-lock', 'Được bảo vệ'));
            container.appendChild(li);
        });
    }

    // ---------- tab ----------

    function selectTab(tab, focus) {
        tabs.forEach(function (t) {
            var active = t === tab;
            t.setAttribute('aria-selected', String(active));
            t.tabIndex = active ? 0 : -1;
            $(t.getAttribute('aria-controls')).hidden = !active;
        });
        if (focus) tab.focus();
    }

    tabs.forEach(function (tab, i) {
        tab.addEventListener('click', function () { selectTab(tab); });
        tab.addEventListener('keydown', function (e) {
            var next = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : null;
            if (next === null) return;
            e.preventDefault();
            selectTab(tabs[(next + tabs.length) % tabs.length], true);
        });
    });

    // ---------- tab "Tất cả metadata" ----------

    function sourceBytes(value) {
        return value === 'strip' ? state.stripped : value === 'edit' ? state.edited : state.bytes;
    }

    function setSourceAvailable(value, available) {
        sourceRadios.forEach(function (r) {
            if (r.value !== value) return;
            r.disabled = !available;
            if (!available && r.checked) {
                sourceRadios[0].checked = true;
                renderAll();
            }
        });
    }

    function renderAll() {
        var checked = sourceRadios.filter(function (r) { return r.checked; })[0];
        var bytes = sourceBytes(checked ? checked.value : 'original');
        if (!bytes) { els.all.replaceChildren(); return; }
        var sections;
        try {
            sections = Details.inspectAll(bytes).sections;
        } catch (err) {
            els.all.replaceChildren(el('p', 'rm-empty', err.message || 'Không đọc được metadata.'));
            return;
        }
        resolveSections(sections).then(function () {
            renderGroups(els.all, sections);
            applyFilter();
        });
    }

    function applyFilter() {
        var q = els.allFilter.value.trim().toLowerCase();
        Array.prototype.forEach.call(els.all.querySelectorAll('.rm-group'), function (group) {
            var visible = 0;
            Array.prototype.forEach.call(group.querySelectorAll('tr'), function (tr) {
                var show = !q || tr.dataset.search.indexOf(q) !== -1;
                tr.hidden = !show;
                if (show) visible++;
            });
            group.hidden = visible === 0 && !!q;
        });
    }

    sourceRadios.forEach(function (r) { r.addEventListener('change', renderAll); });
    els.allFilter.addEventListener('input', applyFilter);

    // ---------- tab "Chỉnh sửa" ----------

    function lockIcon() {
        var ns = 'http://www.w3.org/2000/svg';
        var svg = document.createElementNS(ns, 'svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('width', '13');
        svg.setAttribute('height', '13');
        svg.setAttribute('aria-hidden', 'true');
        var path = document.createElementNS(ns, 'path');
        path.setAttribute('d', LOCK_ICON);
        svg.appendChild(path);
        return svg;
    }

    function makeControl(f) {
        var control;
        if (f.input === 'textarea') {
            control = el('textarea');
            control.rows = 2;
        } else if (f.input === 'select') {
            control = el('select');
            Object.keys(core.ORIENTATION_LABELS).forEach(function (k) {
                var opt = el('option', '', k + ' — ' + core.ORIENTATION_LABELS[k]);
                opt.value = k;
                control.appendChild(opt);
            });
        } else {
            control = el('input');
            control.type = f.input;
            if (f.input === 'datetime-local') control.step = '1';
            if (f.kind === 'gps') { control.step = 'any'; control.inputMode = 'decimal'; control.setAttribute('aria-label', f.label); }
            if (f.kind === 'dpi') { control.step = '1'; control.min = '1'; control.max = '65535'; control.inputMode = 'numeric'; }
        }
        control.id = 'rm-f-' + f.id;
        control.name = f.id;
        if (f.placeholder) control.placeholder = f.placeholder;
        if (f.input === 'text' || f.input === 'textarea' || f.input === 'url') control.maxLength = 2000;
        control.addEventListener(f.input === 'checkbox' ? 'change' : 'input', invalidateEdit);
        return control;
    }

    // Mỗi dòng: [tên ô + trường metadata sẽ ghi] | [ô nhập]. Vĩ độ + kinh độ gộp một dòng.
    function buildForm() {
        var sections = {};
        var gpsInputs = null;
        Editor.FIELDS.forEach(function (f) {
            if (!sections[f.section]) {
                var sec = el('section', 'rm-form-section');
                sec.appendChild(el('h3', 'rm-form-title', SECTIONS[f.section].title));
                if (SECTIONS[f.section].note) sec.appendChild(el('p', 'rm-form-note', SECTIONS[f.section].note));
                sections[f.section] = sec;
                els.form.appendChild(sec);
            }
            var control = makeControl(f);
            if (f.kind === 'gps' && gpsInputs) {
                gpsInputs.appendChild(control);
                gpsInputs.parentNode.parentNode.querySelector('.rm-writes').textContent = 'EXIF GPSLatitude · GPSLongitude';
                return;
            }
            var row = el('div', 'rm-row' + (f.input === 'checkbox' ? ' rm-row-check' : ''));
            var labelBox = el('div', 'rm-row-label');
            var label = el('label', '', f.kind === 'gps' ? 'Toạ độ GPS' : f.label);
            label.htmlFor = control.id;
            var inputBox = el('div', 'rm-row-input');
            if (f.input === 'checkbox') {
                var check = el('div', 'rm-check');
                check.appendChild(control);
                check.appendChild(label);
                labelBox.appendChild(check);
            } else {
                labelBox.appendChild(label);
            }
            labelBox.appendChild(el('code', 'rm-writes', f.writes.join(' · ')));
            if (f.kind === 'gps') {
                gpsInputs = el('div', 'rm-pair');
                gpsInputs.appendChild(control);
                inputBox.appendChild(gpsInputs);
            } else if (f.input === 'checkbox') {
                inputBox.appendChild(el('small', 'rm-hint rm-ai-hint', AI_HINT_OPEN));
            } else {
                inputBox.appendChild(control);
            }
            // Giá trị có sẵn nằm ở chỗ khác chuẩn (IPTC, PNG text, XMP thay thế…) → ghi chú nguồn
            if (f.input !== 'checkbox') {
                var from = el('small', 'rm-from');
                from.hidden = true;
                inputBox.appendChild(from);
            }
            if (f.protected) {
                var lock = el('small', 'rm-lock');
                lock.appendChild(lockIcon());
                lock.appendChild(document.createTextNode('Có sẵn trong ảnh gốc — không sửa được'));
                lock.hidden = true;
                inputBox.appendChild(lock);
            }
            row.appendChild(labelBox);
            row.appendChild(inputBox);
            sections[f.section].appendChild(row);
        });
    }

    function fillForm(values, policy) {
        var locked = (policy && policy.protectedIds) || [];
        var aiForced = !!(policy && policy.ai.detected);
        var sources = (policy && policy.sources) || {};
        Array.prototype.forEach.call(els.form.querySelectorAll('.rm-from'), function (from) { from.hidden = true; });
        Editor.FIELDS.forEach(function (f) {
            var control = els.form.elements[f.id];
            var row = control.closest('.rm-row');
            if (f.input === 'checkbox') {
                control.checked = aiForced || values[f.id] === 'true';
                control.disabled = aiForced;
                row.querySelector('.rm-ai-hint').textContent = aiForced ? AI_HINT_LOCKED : AI_HINT_OPEN;
                row.classList.toggle('is-locked', aiForced);
                return;
            }
            control.value = values[f.id] === undefined ? '' : values[f.id];
            var src = sources[f.id];
            var isLocked = f.protected && locked.indexOf(f.id) !== -1;
            var offStandard = src && src !== 'EXIF GPS' && f.writes.indexOf(src) === -1 && values[f.id];
            if (offStandard && !isLocked) {
                var from = row.querySelector('.rm-from');
                from.textContent = 'Lấy từ ' + src + ' — khi lưu sẽ ghi vào trường chuẩn';
                from.hidden = false;
            }
            if (f.protected) {
                // Ô khoá: gộp nguồn vào chung một dòng
                row.querySelector('.rm-lock').lastChild.textContent = 'Có sẵn trong ảnh gốc' + (offStandard ? ' (' + src + ')' : '') + ' — không sửa được';
                control.readOnly = isLocked;
                control.setAttribute('aria-readonly', String(isLocked));
                row.classList.toggle('is-locked', isLocked);
                row.querySelector('.rm-lock').hidden = !isLocked;
            }
        });
        invalidateEdit();
    }

    function readForm() {
        var values = {};
        Editor.FIELDS.forEach(function (f) {
            var control = els.form.elements[f.id];
            values[f.id] = f.input === 'checkbox' ? (control.checked ? 'true' : '') : control.value;
        });
        return values;
    }

    function invalidateEdit() {
        state.edited = null;
        els.editDownload.disabled = true;
        els.editResult.hidden = true;
        showError(els.editError, '');
        setSourceAvailable('edit', false);
    }

    function applyEdit(e) {
        e.preventDefault();
        if (!state.bytes) return;
        try {
            var result = ImageMetadataEditor.apply(state.bytes, readForm());
            state.edited = result.bytes;
            // Hiện đúng giá trị thực sự được ghi cho các ô bị khoá (chính sách đã bỏ qua mọi thay đổi)
            ((state.policy && state.policy.protectedIds) || []).forEach(function (id) {
                els.form.elements[id].value = state.original[id];
            });
            renderSignal(els.editSignal, core.inspect(result.bytes), 'result');
            els.editSize.textContent = formatBytes(state.bytes.length) + ' → ' + formatBytes(result.bytes.length);
            renderKept(els.editKept, result.kept);
            renderGroups(els.editWritten, [{ title: 'Thông tin mới', rows: result.written }], 'Không ghi thêm thông tin nào.');
            els.editResult.hidden = false;
            els.editDownload.disabled = false;
            showError(els.editError, '');
            setSourceAvailable('edit', true);
            track('images_metadata_edit_' + state.format);
        } catch (err) {
            showError(els.editError, err.message || 'Không ghi được thông tin vào ảnh này.');
        }
    }

    els.form.addEventListener('submit', applyEdit);
    els.editDownload.addEventListener('click', function () {
        downloadBytes(state.edited, 'edited');
        track('images_metadata_edit_download_' + state.format);
    });
    els.editClear.addEventListener('click', function () {
        Editor.FIELDS.forEach(function (f) {
            if (f.group !== 'info' || TEXT_KINDS.indexOf(f.kind) === -1) return;
            els.form.elements[f.id].value = '';
        });
        invalidateEdit();
    });
    els.editRestore.addEventListener('click', function () { if (state.original) fillForm(state.original, state.policy); });

    // ---------- tab "Xoá metadata" ----------

    function resetStrip() {
        state.stripped = null;
        els.after.hidden = true;
        els.download.disabled = true;
        els.strip.disabled = false;
        setSourceAvailable('strip', false);
    }

    function stripCurrent() {
        if (!state.bytes) return;
        try {
            var result = ImageMetadataEditor.clean(state.bytes, { keepOrientation: els.keepOrientation.checked });
            state.stripped = result.bytes;
            var info = core.inspect(result.bytes);
            resolveCompressed(info).then(function () {
                renderSignal(els.signalAfter, info, 'result');
                renderEntries(els.metaAfter, info.entries);
            });
            renderKept(els.kept, result.kept);
            els.removed.replaceChildren();
            if (!result.removed.length) els.removed.appendChild(el('li', '', 'Không có gì để xoá.'));
            result.removed.forEach(function (r) {
                els.removed.appendChild(el('li', '', r.group + ' · ' + r.label + ' (' + formatBytes(r.size) + ')'));
            });
            var saved = state.bytes.length - result.bytes.length;
            els.sizeDiff.textContent = formatBytes(state.bytes.length) + ' → ' + formatBytes(result.bytes.length)
                + (saved > 0 ? ' (bớt ' + formatBytes(saved) + ')' : '');
            els.after.hidden = false;
            els.download.disabled = false;
            els.strip.disabled = true;
            setSourceAvailable('strip', true);
            track('images_metadata_strip_' + state.format);
        } catch (err) {
            showError(els.error, err.message || 'Không làm sạch được metadata của ảnh này.');
        }
    }

    els.strip.addEventListener('click', stripCurrent);
    els.download.addEventListener('click', function () {
        downloadBytes(state.stripped, 'clean');
        track('images_metadata_download_' + state.format);
    });
    els.keepOrientation.addEventListener('change', function () { if (state.stripped) resetStrip(); });

    // ---------- tải về ----------

    function downloadBytes(bytes, suffix) {
        if (!bytes) return;
        var base = state.name.replace(/\.[^.]+$/, '') || 'anh';
        var url = URL.createObjectURL(new Blob([bytes], { type: core.MIME[state.format] }));
        var a = document.createElement('a');
        a.href = url;
        a.download = base + '-' + suffix + '.' + core.EXT[state.format];
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    }

    // ---------- nạp ảnh ----------

    function loadFile(file) {
        showError(els.error, '');
        if (!file) return;
        file.arrayBuffer().then(function (buf) {
            var bytes = new Uint8Array(buf);
            var format = core.detectFormat(bytes);
            if (!format) throw new Error('Định dạng không hỗ trợ. Chỉ nhận JPEG, PNG, WebP (HEIC, GIF, AVIF… chưa hỗ trợ).');
            var info = core.inspect(bytes);
            state.name = file.name || ('anh-dan.' + core.EXT[format]);
            state.bytes = bytes;
            state.format = format;
            try {
                state.policy = Editor.policy(bytes);
                state.original = state.policy.values;
            } catch (err) {
                state.policy = null;
                state.original = {};
            }
            return resolveCompressed(info);
        }).then(function (info) {
            if (state.previewUrl) URL.revokeObjectURL(state.previewUrl);
            state.previewUrl = URL.createObjectURL(new Blob([state.bytes], { type: core.MIME[state.format] }));
            els.preview.src = state.previewUrl;
            els.preview.onload = function () {
                els.dimensions.textContent = els.preview.naturalWidth + ' × ' + els.preview.naturalHeight + ' px';
            };
            els.name.textContent = state.name;
            els.format.textContent = FORMAT_LABEL[state.format];
            els.dimensions.textContent = '…';
            els.size.textContent = formatBytes(state.bytes.length);
            renderSignal(els.signalBefore, info, 'source');
            renderEntries(els.metaBefore, info.entries);
            resetStrip();
            fillForm(state.original, state.policy);
            sourceRadios[0].checked = true;
            els.allFilter.value = '';
            renderAll();
            els.work.hidden = false;
            els.drop.classList.add('is-compact');
            track('images_metadata_upload_' + state.format);
        }).catch(function (err) {
            showError(els.error, err.message || 'Không đọc được ảnh.');
        });
    }

    function reset() {
        if (state.previewUrl) URL.revokeObjectURL(state.previewUrl);
        state = emptyState();
        els.file.value = '';
        els.work.hidden = true;
        els.drop.classList.remove('is-compact');
        showError(els.error, '');
        resetStrip();
        invalidateEdit();
        els.all.replaceChildren();
    }

    els.file.addEventListener('change', function () { loadFile(els.file.files[0]); });

    ['dragenter', 'dragover'].forEach(function (type) {
        els.drop.addEventListener(type, function (e) { e.preventDefault(); els.drop.classList.add('is-over'); });
    });
    ['dragleave', 'drop'].forEach(function (type) {
        els.drop.addEventListener(type, function (e) { e.preventDefault(); els.drop.classList.remove('is-over'); });
    });
    els.drop.addEventListener('drop', function (e) {
        loadFile(e.dataTransfer && e.dataTransfer.files[0]);
    });

    document.addEventListener('paste', function (e) {
        var target = e.target;
        if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return; // đang dán chữ vào form
        var items = (e.clipboardData && e.clipboardData.files) || [];
        if (items.length) { e.preventDefault(); loadFile(items[0]); }
    });

    els.reset.addEventListener('click', reset);
    buildForm();
})();
