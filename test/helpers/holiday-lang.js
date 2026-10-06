// Đọc bản ?lang=vi|ar nằm trong trang đếm ngược (<script id="hc-lang-data"> + <template id="hc-lang-*">)
// và dựng lại thành một chuỗi HTML "như trình duyệt thấy sau khi đổi ngôn ngữ" để test assert giống trang thường.
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '../..');

const escape = (value) => String(value)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

function langData(html) {
  const match = html.match(/<script id="hc-lang-data" type="application\/json">([\s\S]*?)<\/script>/);
  if (!match) throw new Error('missing #hc-lang-data');
  return JSON.parse(match[1]);
}

function langVariant(file, lang) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  const head = langData(html)[lang];
  if (!head) throw new Error(`${file}: no ${lang} variant`);
  const template = html.match(new RegExp(`<template id="hc-lang-${lang}" data-hc-lang="${lang}" data-body-class="([^"]+)">\\n([\\s\\S]*?)  </template>`));
  if (!template) throw new Error(`${file}: missing template for ${lang}`);
  const dir = head.dir ? ` dir="${head.dir}"` : '';
  const metas = head.metas.map(([attr, key, content]) => `  <meta ${attr}="${key}" content="${escape(content)}">`).join('\n');
  const rendered = `<html lang="${lang}"${dir}>
<head>
  <title>${escape(head.title)}</title>
  <link rel="canonical" href="${head.url}">
${metas}
${head.links.map((link) => `  ${link}`).join('\n')}
  <script type="application/ld+json">${JSON.stringify(head.schema)}</script>
</head>
<body class="${template[1]}">
${template[2]}</body>
</html>`;
  return { head, bodyClass: template[1], body: template[2], html: rendered, source: html };
}

module.exports = { langData, langVariant };
