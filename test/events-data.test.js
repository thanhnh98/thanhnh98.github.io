const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');

function loadEventsData() {
    const context = {};
    vm.runInNewContext(
        fs.readFileSync(path.join(root, 'data/events-data.js'), 'utf8'),
        context,
    );
    return context.EVENTS_DATA;
}

test('event catalog contains 37 unique, classified events', () => {
    const data = loadEventsData();
    const allEvents = [
        ...data.LUNAR_EVENTS,
        ...data.SOLAR_EVENTS_VIETNAM,
        ...data.SOLAR_EVENTS_INTERNATIONAL,
    ];

    assert.equal(data.LUNAR_EVENTS.length, 11);
    assert.equal(data.SOLAR_EVENTS_VIETNAM.length, 19);
    assert.equal(data.SOLAR_EVENTS_INTERNATIONAL.length, 7);
    assert.equal(allEvents.length, 37);
    assert.equal(new Set(allEvents.map((event) => event.id)).size, 37);

    const labourDayEvents = data.SOLAR_EVENTS_VIETNAM
        .concat(data.SOLAR_EVENTS_INTERNATIONAL)
        .filter((event) => event.month === 5 && event.day === 1);
    assert.equal(labourDayEvents.length, 1);

    for (const id of [
        'solar-gia-dinh-viet-nam',
        'solar-doanh-nhan-viet-nam',
        'solar-nha-giao-viet-nam',
    ]) {
        assert.ok(data.SOLAR_EVENTS_VIETNAM.some((event) => event.id === id));
        assert.ok(!data.SOLAR_EVENTS_INTERNATIONAL.some((event) => event.id === id));
    }
});

test('official holiday flags and descriptions are accurate', () => {
    const data = loadEventsData();
    const officialSolarIds = Array.from(data.SOLAR_EVENTS_VIETNAM)
        .filter((event) => event.isHoliday === true)
        .map((event) => event.id)
        .sort();

    assert.deepEqual(officialSolarIds, [
        'solar-giai-phong-mien-nam',
        'solar-quoc-khanh-viet-nam',
        'solar-quoc-te-lao-dong',
        'solar-tet-duong-lich',
    ]);
    const remembranceDay = data.SOLAR_EVENTS_VIETNAM.find(
        (event) => event.id === 'solar-thuong-binh-liet-si',
    );
    assert.ok(remembranceDay);
    assert.equal(remembranceDay.isHoliday, undefined);
    assert.ok(!remembranceDay.description.includes('Nghỉ lễ không?'));
});

test('perpetual calendar labels only official holidays as days off', () => {
    const html = fs.readFileSync(path.join(root, 'lich-van-nien.html'), 'utf8');

    assert.match(html, /isHoliday: ev\.isHoliday === true/);
    assert.match(
        html,
        /holidayInfo\.isHoliday \? 'Ngày nghỉ lễ' : 'Sự kiện dương lịch'/,
    );
    assert.match(
        html,
        /holidayInfo\.isHoliday \? '<p style="color: #64748B;/,
    );
});

test('important events page isolates its grid cards from the homepage carousel styles', () => {
    const html = fs.readFileSync(path.join(root, 'su-kien-quan-trong.html'), 'utf8');

    assert.match(html, /\.event-grid\s*>\s*\.event-card\s*\{/);
    assert.match(html, /min-width:\s*0;/);
    assert.match(html, /max-width:\s*none;/);
    assert.match(html, /width:\s*100%;/);
    assert.match(html, /grid-template-rows:\s*auto auto 1fr auto;/);
    assert.match(html, /\.event-grid\s*>\s*\.event-card::before\s*\{\s*content:\s*none;/);
});
