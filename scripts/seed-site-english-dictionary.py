"""Build the optional English reading-mode dictionary from public Vietnamese pages.

Developer-only tool: install lxml, torch, sentencepiece and transformers<5, then
run this script. Translation uses VinAI's vi2en-v2 model locally; its weights
are not shipped with the site. Review high-traffic copy in data/site-vi-en.json.
The indexable Tet answer at /when-is-tet-in-vietnam/ is maintained by hand.
"""

import json
import re
import ast
from pathlib import Path

from lxml import html

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / 'data' / 'site-vi-en.json'
TEMP = ROOT / 'data' / 'site-vi-en.json.tmp'
NUMBER = re.compile(r'\d+(?:[./:-]\d+)*')
VIETNAMESE = re.compile(r'[À-ỹđĐ]')
TOKEN = re.compile(r'ZZNUM(\d+)ZZ')
MODEL = 'vinai/vinai-translate-vi2en-v2'

# These terms carry product or Vietnamese cultural meaning that generic MT loses.
TERMS = [
    ('Sắp Tết', '[BRAND]', 'Sắp Tết'),
    ('Tết Nguyên Đán', '[TET]', 'Tet'),
    ('Tết Nguyên đán', '[TET]', 'Tet'),
    ('Tết', '[TET]', 'Tet'),
    ('bánh chưng', '[BANHCHUNG]', 'bánh chưng'),
    ('Bánh chưng', '[BANHCHUNG]', 'Bánh chưng'),
    ('lì xì', '[LUCKYMONEY]', 'lucky money'),
]
OVERRIDES = {
    'Sắp Tết': 'Sắp Tết',
    'Sắp X': 'Sắp X',
    'Còn Bao Nhiêu Ngày Nữa Đến Tết ZZNUM0ZZ? | Sắp Tết': 'How Many Days Until Tet ZZNUM0ZZ? | Sắp Tết',
    'Còn bao nhiêu': 'How many',
    'ngày nữa đến': 'days until',
    'Hôm nay còn': 'There are',
    'ngày': 'days',
    'NGÀY': 'DAYS',
    'GIỜ': 'HOURS',
    'PHÚT': 'MINUTES',
    'GIÂY': 'SECONDS',
    'Hôm nay': 'Today',
    'Lịch Vạn Niên': 'Perpetual calendar',
    '← Lịch vạn niên': '← Perpetual calendar',
    'Lịch Âm Dương': 'Lunar and Gregorian calendar',
    'Lịch Âm Dương ZZNUM0ZZ': 'Lunar and Gregorian calendar ZZNUM0ZZ',
    'Trò Chơi Tết': 'Tet games',
    'Lời chúc Tết': 'Tet wishes',
    'Tiện ích Tết': 'Tet tools',
    'Ảnh lời chúc': 'Greeting card images',
    'Hôm nay còn ZZNUM0ZZ ngày nữa đến Tết Nguyên Đán ZZNUM1ZZ.': 'There are ZZNUM0ZZ calendar days until Tet ZZNUM1ZZ.',
    'Còn ZZNUM0ZZ ngày': 'ZZNUM0ZZ days left',
    'Còn lại': 'Remaining',
    'Gợi ý hôm nay': "Today's suggestion",
    'Đếm ngược Tết ZZNUM0ZZ': 'Tet ZZNUM0ZZ countdown',
    'Đếm ngược Tết Nguyên Đán Đinh Mùi': 'Countdown to Tet 2027',
    'Hôm nay còn ZZNUM0ZZ ngày nữa đến Tết Nguyên Đán ZZNUM1ZZ': 'There are ZZNUM0ZZ calendar days until Tet ZZNUM1ZZ',
    'nữa đến Tết Nguyên Đán ZZNUM0ZZ': 'until Tet ZZNUM0ZZ',
    '(Âm lịch: ZZNUM0ZZ)': '(Lunar date: ZZNUM0ZZ)',
    '(Âm lịch:': '(Lunar date:',
    'Chúc Mừng Năm Mới – Vạn Sự Như Ý!': 'Happy New Year! May everything go well!',
    'Lịch': 'Calendar',
    'vạn niên': 'Perpetual',
    'Hôm': 'Today',
    'nay': '',
    'Trò chơi': 'Games',
    'Máy tính': 'Calculator',
    'Ảnh': 'Greeting images',
    'lời chúc': 'and wishes',
    'Lời chúc': 'Wishes',
    'Xem hướng dẫn': 'View guide',
    'Chuẩn bị': 'Prepare',
    'Lên kế hoạch': 'Plan',
    'du lịch': 'a trip',
    'Học nấu': 'Learn to make',
    'Dọn dẹp': 'Clean',
    'nhà cửa': 'the house',
    'Mua sắm': 'Shop for',
    'VUI TẾT MỖI NGÀY': 'ENJOY TET EVERY DAY',
    'Xem tất cả': 'See all',
    'DÂN GIAN · ĐẤU TRÍ': 'TRADITIONAL · STRATEGY',
    'Dân gian · Đấu trí': 'Traditional · Strategy',
    'Ô Ăn Quan': 'Ô Ăn Quan',
    'Rải quân, chập và ăn Quan; đấu máy hoặc chơi cùng bạn.': 'Move and capture pieces in this traditional board game. Play against the computer or a friend.',
    'Chơi ngay': 'Play now',
    'Ngựa Phi Đón Tết': 'Tet Horse Run',
    'Nhảy, cúi né chướng ngại và mở khóa địa danh Việt Nam.': 'Jump or duck past obstacles and unlock places across Vietnam.',
    'ĐẤU TRÍ · TIẾNG VIỆT': 'WORD GAME · VIETNAMESE',
    'Đấu trí · Tiếng Việt': 'Word game · Vietnamese',
    'Nối Chữ': 'Vietnamese Word Chain',
    'Nối từ cuối thành từ đầu, đấu với máy trong ZZNUM0ZZ giây.': 'Use the last word to start the next phrase. Play against the computer for ZZNUM0ZZ seconds.',
    'MỖI NGÀY MỘT NIỀM VUI NHỎ': 'A LITTLE JOY EVERY DAY',
    'ngày liên tiếp': 'consecutive days',
    'viên mỗi lượt': 'shots per turn',
    'Xem lịch âm': 'View the lunar calendar',
    'ZZNUM0ZZ viên': 'ZZNUM0ZZ shots',
    'SỰ KIỆN GẦN NHẤT': 'NEXT EVENT',
    'Xem sự kiện': 'View event',
    'Xem sự kiện →': 'View event →',
    'GỢI Ý HÔM NAY': "TODAY'S SUGGESTION",
    'Xem sự kiện sắp tới': 'See upcoming events',
    'Đừng bỏ lỡ những ngày lễ và cột mốc đáng nhớ trong năm.': 'Explore the holidays and milestones coming up this year.',
    'SƯU TẦM MỖI NGÀY': 'COLLECT EVERY DAY',
    'THỬ THÁCH HÔM NAY': "TODAY'S CHALLENGE",
    'Tìm lời chúc trong pháo hoa': 'Find wishes in the fireworks',
    'viên': 'shots',
    'Mỗi ZZNUM0ZZ lần bấm sẽ hiện một lời chúc đã có; mỗi ngày còn có cơ hội tìm ZZNUM1ZZ thẻ mới.': 'Every ZZNUM0ZZ taps reveals a wish you already have; each day you can discover ZZNUM1ZZ new card.',
    'Bắn pháo · ZZNUM0ZZ/ZZNUM1ZZ': 'Launch fireworks · ZZNUM0ZZ/ZZNUM1ZZ',
    'Bắn pháo · ZZNUM0ZZ': 'Launch fireworks · ZZNUM0ZZ',
    'LỜI CHÚC ĐẦU TIÊN ĐANG CHỜ': 'YOUR FIRST WISH AWAITS',
    'Bắn pháo hoa để mở khóa': 'Launch fireworks to unlock it',
    'Lời chúc mới nhất sẽ xuất hiện tại đây': 'Your latest wish will appear here',
    'Bộ thẻ lời chúc': 'Wish card collection',
    'Chưa có lời chúc': 'No wishes yet',
    'THẺ ZZNUM0ZZ': 'CARD ZZNUM0ZZ',
    'Thẻ ZZNUM0ZZ': 'Card ZZNUM0ZZ',
    'Lời chúc số ZZNUM0ZZ chưa mở khóa': 'Wish card ZZNUM0ZZ is locked',
    'Chưa mở khóa': 'Locked',
    'Mỗi ngày mở ZZNUM0ZZ lời chúc mới. Lời chúc đã có xuất hiện sau mỗi ZZNUM1ZZ lần bấm.': 'Unlock one new wish each day. You can revisit earlier wishes after every ZZNUM1ZZ taps.',
    'Giữ nhịp háo hức đến Tết bằng lịch âm, tiện ích hằng ngày và ứng dụng Sắp Tết trên điện thoại.': 'Follow the countdown to Tet with a lunar calendar, daily activities, and the Sắp Tết mobile app.',
    'Theo dõi Sắp Tết để nhận nội dung và cập nhật mới.': 'Follow Sắp Tết for new content and updates.',
    'Thông số ảnh': 'Image metadata',
    'Sự kiện quan trọng': 'Important events',
    'Giới thiệu ứng dụng': 'About the app',
    'Blog Sắp Tết': 'Sắp Tết blog',
    'Cửa hàng Tết': 'Tet shop',
    'Việc nên làm trước Tết': 'Things to do before Tet',
    'Gợi ý sắm Tết': 'Tet shopping ideas',
    'Bộ sưu tập lời chúc pháo hoa': 'Firework wishes collection',
    'Ứng dụng': 'App',
    'theo giờ Việt Nam, đồng thời giúp bạn xem': 'in Vietnam time, and helps you check',
    'Trạng thái đếm ngược được tính theo ngày tại Việt Nam và tự cập nhật khi bạn mở trang.': 'The countdown uses the calendar date in Vietnam and updates when you open the page.',
    'Doanh nghiệp lựa chọn một trong ba phương án nghỉ ZZNUM0ZZ ngày theo thông báo của Bộ Nội vụ.': 'Businesses choose one of the three ZZNUM0ZZ-day holiday arrangements announced by the Ministry of Home Affairs.',
    'Giao thừa là thời khắc kết thúc ngày cuối cùng của năm âm lịch và chuyển sang ngày mùng ZZNUM0ZZ tháng Giêng. Năm ZZNUM1ZZ, thời khắc này bắt đầu lúc ZZNUM2ZZ ngày ZZNUM3ZZ.': 'Vietnamese New Year’s Eve ends on the final day of the lunar year. In ZZNUM1ZZ, the first day begins at ZZNUM2ZZ on ZZNUM3ZZ.',
    'Ngày đầu tiên của Tết cổ truyền Việt Nam, dịp gia đình sum họp, tưởng nhớ tổ tiên và đón năm mới âm lịch.': 'The first day of Vietnamese Tet brings families together to honor ancestors and welcome the lunar new year.',
    'Tết Nguyên Đán mở đầu năm âm lịch và là dịp đoàn viên lớn nhất của người Việt. Những ngày Tết kết nối việc thờ cúng tổ tiên, thăm hỏi họ hàng và gửi gắm mong ước bình an cho năm mới.': 'Tet begins the lunar year and is Vietnam’s most important family reunion. Families honor ancestors, visit relatives, and wish one another peace in the new year.',
    'Sắp Diwali': 'Diwali countdown',
    'Sắp Lễ Tạ ơn': 'Thanksgiving countdown',
    'Sắp Hanukkah': 'Hanukkah countdown',
    'Sắp Tết Trung Quốc': 'Chinese New Year countdown',
    'Sắp Ramadan': 'Ramadan countdown',
    'Sắp Valentine': "Valentine's Day countdown",
    'Sắp Eid al-Fitr': 'Eid al-Fitr countdown',
    'Sắp Lễ Phục sinh': 'Easter countdown',
    'Sắp Songkran': 'Songkran countdown',
    'Máy tính lì xì': 'Lucky money calculator',
    'Ngày Nhà giáo Việt Nam': "Vietnamese Teachers' Day",
    'Lịch âm': 'Lunar calendar',
    'Lịch âm hôm nay': "Today's lunar calendar",
    'Lịch vạn niên': 'Perpetual calendar',
    'Các trang Sắp X': 'Sắp X pages',
    'Tiếng Việt': 'Vietnamese',
    'Tiếng Anh': 'English',
    'Sắp Có Lương': 'Payday countdown',
    'Sắp Halloween': 'Halloween countdown',
    'Sắp Giáng sinh': 'Christmas countdown',
    'Sắp Năm mới': 'New Year countdown',
    'Sắp Diwali': 'Diwali countdown',
    'Sắp Lễ Tạ ơn': 'Thanksgiving countdown',
    'Sắp Hanukkah': 'Hanukkah countdown',
    'Sắp Ramadan': 'Ramadan countdown',
    'Sắp Valentine': "Valentine's Day countdown",
    'Sắp Eid al-Fitr': 'Eid al-Fitr countdown',
    'Sắp Lễ Phục sinh': 'Easter countdown',
    'Sắp Songkran': 'Songkran countdown',
    'Sắp Tết Trung Quốc': 'Chinese New Year countdown',
    'Khám phá': 'Explore',
    'Kết nối': 'Connect',
    'Tiện ích': 'Tools',
    'Còn lại': 'Remaining',
    'Kết thúc': 'End',
    'Trò Chơi': 'Games',
    'Trò chơi': 'Games',
    'Trò Chơi Tết': 'Tet games',
    'Trò chơi Tết': 'Tet games',
    'Tiện ích Tết': 'Tet tools',
    'Đếm ngược Tết Nguyên Đán': 'Tet countdown',
    'Đếm ngược Tết Trung Quốc': 'Chinese New Year countdown',
    'Ngày dương': 'Gregorian date',
    'Ngày âm lịch': 'Lunar date',
    'Lịch Âm Dương': 'Lunar and Gregorian calendar',
    'Lịch âm dương': 'Lunar and Gregorian calendar',
    'Tết Trung Quốc': 'Chinese New Year',
    'Tết Trung Thu': 'Mid-Autumn Festival',
    'Tết Hàn Thực': 'Cold Food Festival',
    'Tết Đoan Ngọ': 'Đoan Ngọ Festival',
    'Tết Trùng Cửu': 'Double Ninth Festival',
    'Tết Dương lịch': "New Year's Day",
    'Tết Hạ Nguyên': 'Hạ Nguyên Festival',
    'Chính sách bảo mật': 'Privacy Policy',
    'ZZNUM0ZZ trang đếm ngược': 'ZZNUM0ZZ countdown pages',
    'Lịch nghỉ Tết ZZNUM0ZZ': 'Tet ZZNUM0ZZ holiday schedule',
    'Lịch Nghỉ Tết ZZNUM0ZZ': 'Tet ZZNUM0ZZ holiday schedule',
    'Lịch Nghỉ Tết ZZNUM0ZZ: ZZNUM1ZZ Ngày Từ ZZNUM2ZZ–ZZNUM3ZZ | Sắp Tết': 'Tet ZZNUM0ZZ holiday schedule: ZZNUM1ZZ days, ZZNUM2ZZ–ZZNUM3ZZ | Sắp Tết',
    'Công chức, viên chức nghỉ ZZNUM0ZZ ngày liên tục, từ ZZNUM1ZZ đến ZZNUM2ZZ': 'Civil servants and public employees have ZZNUM0ZZ consecutive days off, from ZZNUM1ZZ through ZZNUM2ZZ',
    'Theo thông báo của Bộ Nội vụ đăng trên Báo Điện tử Chính phủ ngày ZZNUM0ZZ, cán bộ, công chức, viên chức nghỉ từ': 'According to the Ministry of Home Affairs announcement published by the Government News Portal on ZZNUM0ZZ, civil servants and public employees have leave from',
    '(ZZNUM0ZZ tháng Chạp năm Bính Ngọ) đến hết': '(the ZZNUM0ZZth day of the twelfth lunar month, Year of the Horse) through',
    '(mùng ZZNUM0ZZ tháng Giêng năm Đinh Mùi). Kỳ nghỉ gồm ZZNUM1ZZ ngày nghỉ Tết và ZZNUM2ZZ ngày nghỉ bù do trùng ngày nghỉ hằng tuần.': '(the ZZNUM0ZZth day of the first lunar month, Year of the Goat). The break includes ZZNUM1ZZ Tet holiday days and ZZNUM2ZZ compensatory days for weekends.',
    'ZZNUM0ZZ tháng Chạp, bắt đầu kỳ nghỉ của công chức, viên chức.': 'ZZNUM0ZZth day of the twelfth lunar month; the public-sector break begins.',
    'ZZNUM0ZZ tháng Chạp, đêm giao thừa; năm ZZNUM1ZZ không có ngày ZZNUM2ZZ tháng Chạp.': 'ZZNUM0ZZth day of the twelfth lunar month, New Year’s Eve; that lunar month has no ZZNUM2ZZth day in ZZNUM1ZZ.',
    'Mùng ZZNUM0ZZ Tết Đinh Mùi.': 'Tet Day ZZNUM0ZZ, Year of the Goat.',
    'Lịch áp dụng cho cán bộ, công chức, viên chức': 'Applies to civil servants and public employees',
    'Người lao động trong doanh nghiệp nghỉ thế nào?': 'How do private-sector employees take Tet leave?',
    'Người sử dụng lao động phải thông báo phương án nghỉ cho người lao động trước khi thực hiện ít nhất': 'Employers must notify employees of their Tet leave arrangements at least',
    '. Hãy đối chiếu lịch do nơi làm việc công bố để biết ngày bắt đầu và kết thúc kỳ nghỉ của mình.': ' before the break begins. Check your employer’s schedule for your exact days off.',
    'Nguồn:': 'Source:',
    'Báo Điện tử Chính phủ, thông báo lịch nghỉ Tết Âm lịch ZZNUM0ZZ ngày ZZNUM1ZZ': 'Government News Portal, Tet ZZNUM0ZZ holiday announcement published ZZNUM1ZZ',
    'Doanh nghiệp ngoài khu vực công lựa chọn': 'Employers outside the public sector choose',
    'một trong ba phương án nghỉ Tết ZZNUM0ZZ ngày': 'one of three ZZNUM0ZZ-day Tet holiday arrangements',
    'theo điều kiện thực tế: ZZNUM0ZZ ngày cuối năm Bính Ngọ và ZZNUM1ZZ ngày đầu năm Đinh Mùi; ZZNUM2ZZ ngày cuối năm và ZZNUM3ZZ ngày đầu năm; hoặc ZZNUM4ZZ ngày cuối năm và ZZNUM5ZZ ngày đầu năm. Việc nghỉ hằng tuần, nghỉ bù và thỏa thuận có lợi hơn có thể khiến lịch nghỉ thực tế khác nhau giữa các doanh nghiệp.': 'based on their circumstances: ZZNUM0ZZ final day of the Year of the Horse and ZZNUM1ZZ first days of the Year of the Goat; ZZNUM2ZZ final days and ZZNUM3ZZ first days; or ZZNUM4ZZ final days and ZZNUM5ZZ first days. Weekly leave, compensatory days, and more generous agreements can change the actual break.',
    'Lịch nghỉ Tết Nguyên đán ZZNUM0ZZ': 'Tet ZZNUM0ZZ holiday schedule',
    'Lịch nghỉ Tết Nguyên đán ZZNUM0ZZ của khu vực công': 'Tet ZZNUM0ZZ public-sector holiday schedule',
    'Lịch nghỉ Tết ZZNUM0ZZ chi tiết như thế nào?': 'What is the detailed Tet ZZNUM0ZZ holiday schedule?',
    'Giao thừa ZZNUM0ZZ diễn ra khi nào?': "When is Vietnamese New Year's Eve in ZZNUM0ZZ?",
    'Giao thừa ZZNUM0ZZ là ngày ZZNUM1ZZ hay ZZNUM2ZZ Tết?': 'Is Vietnamese New Year’s Eve in ZZNUM0ZZ on the ZZNUM1ZZth or ZZNUM2ZZth lunar day?',
    'Còn bao nhiêu ngày nữa đến ZZNUM0ZZ?': 'How many days until ZZNUM0ZZ?',
}


def phrases_from_html():
    phrases = set()
    for file in ROOT.rglob('*.html'):
        if {'node_modules', '.git'} & set(file.parts):
            continue
        source = file.read_text(encoding='utf-8', errors='ignore')
        if '<html lang="vi"' not in source and file not in {
            ROOT / 'footer.html', ROOT / 'components' / 'header.html'
        }:
            continue
        try:
            page = html.fromstring(source)
        except ValueError:
            continue
        for node in page.xpath('//text()[normalize-space(.)]'):
            if node.getparent().tag in {'script', 'style', 'noscript', 'svg'}:
                continue
            phrases.add(' '.join(str(node).split()))
        for node in page.iter():
            for name in ('alt', 'title', 'placeholder', 'aria-label'):
                value = node.attrib.get(name)
                if value:
                    phrases.add(' '.join(value.split()))
    for file in [*(ROOT / 'data' / 'foods').glob('*.json'), ROOT / 'news.json']:
        try:
            data = json.loads(file.read_text(encoding='utf-8'))
        except ValueError:
            continue
        def visit(value):
            if isinstance(value, str):
                phrases.add(' '.join(value.split()))
            elif isinstance(value, list):
                for item in value:
                    visit(item)
            elif isinstance(value, dict):
                for item in value.values():
                    visit(item)
        visit(data)
    # UI messages created after page load need the same lookup table. Only
    # collect ordinary quoted literals; template expressions are not exact DOM
    # strings and are handled by the visible page snapshots above.
    for directory in (ROOT / 'js', ROOT / 'data'):
        for file in directory.rglob('*.js'):
            if 'vendor' in file.parts or file.name.endswith(('.min.js', '.bundle.js')):
                continue
            source = file.read_text(encoding='utf-8', errors='ignore')
            for match in re.finditer(r'''(['"])((?:\\.|(?!\1)[^\\\n])*)\1''', source):
                try:
                    value = ast.literal_eval(match.group())
                except (SyntaxError, ValueError):
                    continue
                if isinstance(value, str) and '${' not in value:
                    phrases.add(' '.join(value.split()))
    return sorted(p for p in phrases if len(p) > 1 and VIETNAMESE.search(p))


def mask_numbers(value):
    count = 0
    def replace(_):
        nonlocal count
        token = f'ZZNUM{count}ZZ'
        count += 1
        return token
    return NUMBER.sub(replace, value), count


def prepare(value):
    value = TOKEN.sub(lambda match: f'[N{match.group(1)}]', value)
    for source, marker, _ in TERMS:
        value = value.replace(source, marker)
    return value


def restore(original, translated):
    required = set(re.findall(r'\[[A-Z]+\d*\]', prepare(original)))
    if not required.issubset(set(re.findall(r'\[[A-Z]+\d*\]', translated))):
        return None
    for _, marker, english in TERMS:
        translated = translated.replace(marker, english)
    translated = re.sub(r'\[N(\d+)\]', lambda match: f'ZZNUM{match.group(1)}ZZ', translated)
    return translated.strip() if translated.strip() else None


def main():
    baseline = TEMP if TEMP.exists() else OUTPUT
    entries = json.loads(baseline.read_text(encoding='utf-8')) if baseline.exists() else {}
    phrases = list(dict.fromkeys(mask_numbers(p)[0] for p in phrases_from_html()))
    phrases = sorted(phrases, key=lambda value: (len(value), value))
    for key, value in OVERRIDES.items():
        entries[key] = value
    pending = [key for key in phrases if key not in entries]
    if not pending:
        OUTPUT.write_text(json.dumps(dict(sorted(entries.items())), ensure_ascii=False, separators=(',', ':')) + '\n', encoding='utf-8')
        TEMP.unlink(missing_ok=True)
        print(f'Wrote {len(entries)} reviewed/translated phrases to {OUTPUT}')
        return

    import torch
    from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
    tokenizer = AutoTokenizer.from_pretrained(MODEL, src_lang='vi_VN')
    model = AutoModelForSeq2SeqLM.from_pretrained(MODEL)
    device = 'mps' if torch.backends.mps.is_available() else 'cpu'
    model.to(device).eval()
    print(f'Translating {len(pending)} phrases on {device}', flush=True)
    for index in range(0, len(pending), 8):
        batch = pending[index:index + 8]
        inputs = tokenizer([prepare(value) for value in batch], padding=True,
                           truncation=True, max_length=384, return_tensors='pt').to(device)
        with torch.inference_mode():
            output = model.generate(**inputs,
                decoder_start_token_id=tokenizer.lang_code_to_id['en_XX'],
                num_beams=3, max_new_tokens=256)
        for key, translated in zip(batch, tokenizer.batch_decode(output, skip_special_tokens=True)):
            result = restore(key, translated)
            if result:
                entries[key] = result
        if index % 80 == 0:
            TEMP.write_text(json.dumps(entries, ensure_ascii=False), encoding='utf-8')
            print(f'{index + len(batch)}/{len(pending)} checked, {len(entries)} ready', flush=True)
    TEMP.write_text(json.dumps(entries, ensure_ascii=False), encoding='utf-8')
    OUTPUT.write_text(json.dumps(dict(sorted(entries.items())), ensure_ascii=False, separators=(',', ':')) + '\n', encoding='utf-8')
    TEMP.unlink()
    print(f'Wrote {len(entries)} reviewed/translated phrases to {OUTPUT}')


if __name__ == '__main__':
    main()
