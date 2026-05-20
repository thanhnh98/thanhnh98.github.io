/**
 * Pre-render Tết SEO snippets into static HTML (Asia/Ho_Chi_Minh).
 * Usage: node scripts/inject-tet-seo-snippets.js
 */

const fs = require('fs');
const path = require('path');
const { buildTetSeoPayload } = require('./lib/tet-seo-dates');

const ROOT = path.join(__dirname, '..');

const INTENT_LANDING = path.join(ROOT, 'con-bao-nhieu-ngay-nua-den-tet', 'index.html');

const TARGETS = [
  path.join(ROOT, 'index.html'),
  INTENT_LANDING,
  path.join(ROOT, 'con-bao-nhieu-ngay-nua-den-giao-thua', 'index.html'),
];

const INTENT_PAGE_URL = 'https://saptet.vn/con-bao-nhieu-ngay-nua-den-tet';

function buildWebPageSchema(payload) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${INTENT_PAGE_URL}#webpage`,
    url: INTENT_PAGE_URL,
    name: payload.titleLanding,
    description: payload.metaDescriptionLanding,
    inLanguage: 'vi-VN',
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://saptet.vn/#website',
      name: 'Sắp Tết',
      url: 'https://saptet.vn/',
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: 'https://saptet.vn/assets/images/img_sharing.png',
    },
  };
}

function buildFaqSchema(payload) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Còn bao nhiêu ngày nữa đến Tết 2027?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: payload.faq.daysUntilTetAnswer,
        },
      },
      {
        '@type': 'Question',
        name: 'Tết Nguyên Đán 2027 là ngày nào?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: payload.faq.tetDateAnswer,
        },
      },
      {
        '@type': 'Question',
        name: 'Còn bao nhiêu ngày nữa đến giao thừa 2027?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: payload.faq.giaoThuaAnswer,
        },
      },
      {
        '@type': 'Question',
        name: 'Tết 2027 là năm con gì?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: payload.faq.zodiacAnswer,
        },
      },
      {
        '@type': 'Question',
        name: 'Vì sao số ngày còn lại thay đổi mỗi ngày?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: payload.faq.whyChangesAnswer,
        },
      },
    ],
  };
}

function injectFile(filePath, payload) {
  if (!fs.existsSync(filePath)) {
    console.warn(`inject-tet-seo: skip missing ${filePath}`);
    return false;
  }

  let html = fs.readFileSync(filePath, 'utf8');
  const isIntentLanding = filePath === INTENT_LANDING;

  const replacements = [
    ['{{SEO_DAYS_UNTIL_TET}}', String(payload.daysUntilTet)],
    ['{{SEO_DAYS_UNTIL_GIAO_THUA}}', String(payload.daysUntilGiaoThua)],
    ['{{SEO_TODAY_WEEKDAY}}', payload.todayWeekday],
    ['{{SEO_TODAY_DATE}}', payload.todayDate],
    ['{{SEO_TET_WEEKDAY}}', payload.tetWeekday],
    ['{{SEO_SNIPPET_PARAGRAPH}}', payload.snippetParagraph],
    ['{{SEO_LANDING_DETAIL}}', payload.landingDetailLine],
    ['{{SEO_ANSWER_LEAD}}', payload.answerLead],
    ['{{SEO_TITLE}}', isIntentLanding ? payload.titleLanding : payload.titleHome],
    [
      '{{SEO_META_DESCRIPTION}}',
      isIntentLanding ? payload.metaDescriptionLanding : payload.metaDescriptionHome,
    ],
    ['{{SEO_FAQ_DAYS}}', payload.faq.daysUntilTetAnswer],
    ['{{SEO_FAQ_TET_DATE}}', payload.faq.tetDateAnswer],
    ['{{SEO_FAQ_GIAO_THUA}}', payload.faq.giaoThuaAnswer],
    ['{{SEO_FAQ_ZODIAC}}', payload.faq.zodiacAnswer],
    ['{{SEO_FAQ_WHY_CHANGE}}', payload.faq.whyChangesAnswer],
  ];

  for (const [token, value] of replacements) {
    html = html.split(token).join(value);
  }

  if (isIntentLanding) {
    html = html
      .split('{{SEO_WEBPAGE_SCHEMA_JSON}}')
      .join(JSON.stringify(buildWebPageSchema(payload), null, 2));
    html = html
      .split('{{SEO_FAQ_SCHEMA_JSON}}')
      .join(JSON.stringify(buildFaqSchema(payload), null, 2));
  }

  fs.writeFileSync(filePath, html, 'utf8');
  return true;
}

function main() {
  const payload = buildTetSeoPayload();
  let count = 0;
  for (const file of TARGETS) {
    if (injectFile(file, payload)) count += 1;
  }
  console.log(
    `inject-tet-seo: updated ${count} file(s); daysUntilTet=${payload.daysUntilTet} (VN ${payload.todayDate})`
  );
}

main();
