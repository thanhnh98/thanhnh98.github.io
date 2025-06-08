const axios = require('axios');
const cheerio = require('cheerio');

async function debugVNExpressStructure() {
  try {
    console.log('🔍 Đang kiểm tra cấu trúc HTML của VNExpress...');
    
    const response = await axios.get('https://vnexpress.net/tag/tet-co-truyen-99667', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    
    console.log('\n📋 Các selector có thể sử dụng:');
    
    // Kiểm tra các selector phổ biến
    const selectors = [
      '.article-item',
      '.item-news', 
      '.item-news-common',
      '.story',
      '.title-news',
      'article',
      '.news-item',
      '.item'
    ];
    
    selectors.forEach(selector => {
      const elements = $(selector);
      console.log(`${selector}: ${elements.length} elements`);
      
      if (elements.length > 0) {
        console.log(`  - Ví dụ HTML của element đầu tiên:`);
        console.log(`    ${elements.first().html()?.substring(0, 200)}...`);
        
        // Kiểm tra các sub-selector
        const titleLink = elements.first().find('.title-news a, h3 a, h2 a, .title a');
        const description = elements.first().find('.description, .lead, .sapo');
        const image = elements.first().find('img');
        
        console.log(`  - Title links: ${titleLink.length}`);
        console.log(`  - Descriptions: ${description.length}`);
        console.log(`  - Images: ${image.length}`);
        
        if (image.length > 0) {
          console.log(`  - Image data-src: ${image.first().attr('data-src')}`);
          console.log(`  - Image src: ${image.first().attr('src')}`);
        }
        
        console.log('');
      }
    });
    
    // Tìm tất cả các elements có chứa link bài viết
    console.log('\n🔗 Tìm kiếm các link bài viết:');
    const allLinks = $('a[href*="vnexpress.net"]');
    console.log(`Tổng số links VNExpress: ${allLinks.length}`);
    
    // Lấy 5 link đầu tiên để xem cấu trúc
    allLinks.slice(0, 5).each((index, element) => {
      const $el = $(element);
      const href = $el.attr('href');
      const text = $el.text().trim();
      const parent = $el.parent().attr('class');
      
      if (text && text.length > 10) {
        console.log(`${index + 1}. "${text.substring(0, 50)}..."`);
        console.log(`   Link: ${href}`);
        console.log(`   Parent class: ${parent}`);
        console.log('');
      }
    });
    
  } catch (error) {
    console.error('❌ Lỗi khi debug:', error.message);
  }
}

debugVNExpressStructure();