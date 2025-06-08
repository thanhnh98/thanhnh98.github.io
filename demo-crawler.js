#!/usr/bin/env node

const { getArticlesFromVNExpress } = require('./crawl-tet-articles.js');
const fs = require('fs');
const path = require('path');

/**
 * Demo script để test và hiển thị kết quả crawling
 */

const DEMO_CONFIG = {
  vnexpressUrl: "https://vnexpress.net/tag/tet-co-truyen-99667",
  outputFile: path.join(__dirname, 'demo-results.json'),
  htmlPreview: path.join(__dirname, 'demo-preview.html')
};

/**
 * Tạo HTML preview cho demo
 */
function generateDemoHTML(articles) {
  const html = `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demo Crawler Results - Sắp Tết Blog</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
            color: white;
            padding: 2rem;
            text-align: center;
        }
        
        .header h1 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
        }
        
        .header p {
            font-size: 1.1rem;
            opacity: 0.9;
        }
        
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            padding: 2rem;
            background: #f8f9fa;
        }
        
        .stat-card {
            background: white;
            padding: 1.5rem;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .stat-number {
            font-size: 2rem;
            font-weight: bold;
            color: #ee5a24;
            margin-bottom: 0.5rem;
        }
        
        .stat-label {
            color: #666;
            font-size: 0.9rem;
        }
        
        .articles {
            padding: 2rem;
        }
        
        .article-item {
            border: 1px solid #eee;
            border-radius: 10px;
            margin-bottom: 1.5rem;
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .article-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        
        .article-header {
            background: #f8f9fa;
            padding: 1rem 1.5rem;
            border-bottom: 1px solid #eee;
        }
        
        .article-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.5rem;
        }
        
        .category {
            background: #ee5a24;
            color: white;
            padding: 0.3rem 0.8rem;
            border-radius: 15px;
            font-size: 0.8rem;
            font-weight: 600;
        }
        
        .date {
            color: #666;
            font-size: 0.9rem;
        }
        
        .article-title {
            font-size: 1.3rem;
            font-weight: 600;
            color: #333;
            margin: 0;
        }
        
        .article-content {
            padding: 1.5rem;
        }
        
        .article-summary {
            color: #666;
            line-height: 1.6;
            margin-bottom: 1rem;
        }
        
        .article-link {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            color: #ee5a24;
            text-decoration: none;
            font-weight: 600;
            transition: color 0.3s ease;
        }
        
        .article-link:hover {
            color: #c44569;
        }
        
        .footer {
            background: #2c3e50;
            color: white;
            text-align: center;
            padding: 2rem;
        }
        
        .timestamp {
            background: #34495e;
            color: white;
            padding: 1rem;
            text-align: center;
            font-family: monospace;
        }
        
        @media (max-width: 768px) {
            .header h1 {
                font-size: 2rem;
            }
            
            .stats {
                grid-template-columns: 1fr;
            }
            
            .article-meta {
                flex-direction: column;
                align-items: flex-start;
                gap: 0.5rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎋 Demo Crawler Results</h1>
            <p>Kết quả crawl dữ liệu từ VNExpress về Tết cổ truyền</p>
        </div>
        
        <div class="timestamp">
            Generated at: ${new Date().toLocaleString('vi-VN')}
        </div>
        
        <div class="stats">
            <div class="stat-card">
                <div class="stat-number">${articles.length}</div>
                <div class="stat-label">Tổng bài viết</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${new Set(articles.map(a => a.category)).size}</div>
                <div class="stat-label">Categories</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${articles.filter(a => a.summary.length > 100).length}</div>
                <div class="stat-label">Có mô tả đầy đủ</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${articles.filter(a => a.link.includes('vnexpress.net')).length}</div>
                <div class="stat-label">Links hợp lệ</div>
            </div>
        </div>
        
        <div class="articles">
            <h2 style="margin-bottom: 1.5rem; color: #2c3e50;">📰 Danh sách bài viết</h2>
            ${articles.map((article, index) => `
            <div class="article-item">
                <div class="article-header">
                    <div class="article-meta">
                        <span class="category">${article.category}</span>
                        <span class="date">${article.date}</span>
                    </div>
                    <h3 class="article-title">${article.title}</h3>
                </div>
                <div class="article-content">
                    <p class="article-summary">${article.summary}</p>
                    <a href="${article.link}" target="_blank" rel="noopener" class="article-link">
                        Đọc bài viết gốc →
                    </a>
                </div>
            </div>
            `).join('')}
        </div>
        
        <div class="footer">
            <p>🎋 <strong>Sắp Tết Blog Crawler</strong> - Tự động cập nhật nội dung từ VNExpress</p>
            <p style="margin-top: 0.5rem; opacity: 0.8;">Made with ❤️ by Sắp Tết Team</p>
        </div>
    </div>
</body>
</html>`;
  
  return html;
}

/**
 * Phân tích và hiển thị thống kê
 */
function analyzeArticles(articles) {
  console.log('\n📊 === THỐNG KÊ CRAWLING ===');
  console.log(`📰 Tổng số bài viết: ${articles.length}`);
  
  // Thống kê theo category
  const categoryStats = {};
  articles.forEach(article => {
    categoryStats[article.category] = (categoryStats[article.category] || 0) + 1;
  });
  
  console.log('\n📂 Phân bố theo category:');
  Object.entries(categoryStats)
    .sort(([,a], [,b]) => b - a)
    .forEach(([category, count]) => {
      console.log(`   ${category}: ${count} bài`);
    });
  
  // Thống kê độ dài summary
  const summaryLengths = articles.map(a => a.summary.length);
  const avgSummaryLength = summaryLengths.reduce((a, b) => a + b, 0) / summaryLengths.length;
  
  console.log('\n📝 Thống kê nội dung:');
  console.log(`   Độ dài summary trung bình: ${Math.round(avgSummaryLength)} ký tự`);
  console.log(`   Summary ngắn nhất: ${Math.min(...summaryLengths)} ký tự`);
  console.log(`   Summary dài nhất: ${Math.max(...summaryLengths)} ký tự`);
  
  // Kiểm tra chất lượng links
  const validLinks = articles.filter(a => a.link.startsWith('https://vnexpress.net')).length;
  console.log(`\n🔗 Chất lượng links: ${validLinks}/${articles.length} hợp lệ (${Math.round(validLinks/articles.length*100)}%)`);
  
  return {
    total: articles.length,
    categories: Object.keys(categoryStats).length,
    categoryStats,
    avgSummaryLength: Math.round(avgSummaryLength),
    validLinksPercent: Math.round(validLinks/articles.length*100)
  };
}

/**
 * Hàm chính demo
 */
async function runDemo() {
  console.log('🎋 === SẮP TẾT BLOG CRAWLER DEMO ===\n');
  
  try {
    console.log('🔍 Bắt đầu crawl dữ liệu từ VNExpress...');
    const startTime = Date.now();
    
    // Crawl dữ liệu
    const articles = await getArticlesFromVNExpress(DEMO_CONFIG.vnexpressUrl);
    
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    
    console.log(`⏱️  Thời gian crawl: ${duration}s`);
    
    if (articles.length === 0) {
      console.log('❌ Không tìm thấy bài viết nào!');
      return;
    }
    
    // Phân tích dữ liệu
    const stats = analyzeArticles(articles);
    
    // Lưu kết quả JSON
    const results = {
      timestamp: new Date().toISOString(),
      duration: duration,
      source: DEMO_CONFIG.vnexpressUrl,
      stats: stats,
      articles: articles
    };
    
    fs.writeFileSync(DEMO_CONFIG.outputFile, JSON.stringify(results, null, 2), 'utf8');
    console.log(`\n💾 Đã lưu kết quả JSON: ${DEMO_CONFIG.outputFile}`);
    
    // Tạo HTML preview
    const htmlContent = generateDemoHTML(articles);
    fs.writeFileSync(DEMO_CONFIG.htmlPreview, htmlContent, 'utf8');
    console.log(`🌐 Đã tạo HTML preview: ${DEMO_CONFIG.htmlPreview}`);
    
    // Hiển thị sample articles
    console.log('\n📋 === SAMPLE ARTICLES ===');
    articles.slice(0, 3).forEach((article, index) => {
      console.log(`\n${index + 1}. [${article.category}] ${article.title}`);
      console.log(`   📅 ${article.date}`);
      console.log(`   🔗 ${article.link}`);
      console.log(`   📝 ${article.summary.substring(0, 100)}...`);
    });
    
    console.log('\n🎉 Demo hoàn thành! Mở file HTML để xem kết quả chi tiết.');
    console.log(`   File: ${DEMO_CONFIG.htmlPreview}`);
    
  } catch (error) {
    console.error('❌ Lỗi trong demo:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

// Chạy demo nếu được gọi trực tiếp
if (require.main === module) {
  runDemo();
}

module.exports = {
  runDemo,
  analyzeArticles,
  generateDemoHTML
};