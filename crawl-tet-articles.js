const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

// Cấu hình crawling
const CONFIG = {
  vnexpressUrls: [
    "https://vnexpress.net/tag/tet-co-truyen-99667",
    "https://vnexpress.net/tag/tet-co-truyen-99667-p2"
  ],
  maxArticlesPerPage: 8,
  blogFilePath: path.join(__dirname, "blog.html"),
  categories: {
    "bánh chưng": "Ẩm Thực",
    "mâm ngũ quả": "Phong Tục",
    "lời chúc": "Văn Hóa",
    "phong tục": "Truyền Thống",
    "lịch nghỉ": "Thông Tin",
    "món ăn": "Ẩm Thực",
    "truyền thống": "Truyền Thống",
    "tết cổ truyền": "Văn Hóa",
    "default": "Tin Tức"
  }
};

/**
 * Lấy danh sách bài viết từ VNExpress
 */
async function getArticlesFromVNExpress(url) {
  try {
    console.log(`🔍 Đang crawl dữ liệu từ: ${url}`);
    
    // Gửi yêu cầu với headers để tránh bị block
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'vi-VN,vi;q=0.9,en;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      },
      timeout: 10000
    });

    // Tải HTML vào cheerio
    const $ = cheerio.load(response.data);

    // Mảng chứa kết quả
    const articles = [];

    // Crawl bài viết từ VNExpress
    $(".item-news").each((index, element) => {
      if (index >= CONFIG.maxArticlesPerPage) return false;
      
      const titleElement = $(element).find(".title-news a");
      const summaryElement = $(element).find(".description a");
      const imageElement = $(element).find("img");

      const title = titleElement.text().trim();
      let link = titleElement.attr("href");
      const summary = summaryElement.text().trim();

      // Lấy đúng URL hình ảnh
      const image = 
        imageElement.attr("data-src") || // Dùng data-src nếu có
        imageElement.attr("src");       // Nếu không có data-src, dùng src

      // Xử lý link tương đối
      if (link && !link.startsWith('http')) {
        link = link.startsWith('/') ? `https://vnexpress.net${link}` : `https://vnexpress.net/${link}`;
      }

      if (title && link) {
        articles.push({
          title: title.substring(0, 150),         // Tiêu đề bài viết
          link,          // Link bài viết
          summary: summary.substring(0, 200) || generateSummary(title),       // Tóm tắt bài viết
          image,         // Link ảnh đại diện
          category: detectCategory(title),
          date: formatDate(new Date())
        });
      }
    });

    console.log(`✅ Đã tìm thấy ${articles.length} bài viết`);
    return articles;
    
  } catch (error) {
    console.error("❌ Lỗi khi crawl dữ liệu:", error.message);
    return [];
  }
}

/**
 * Phát hiện category dựa trên title
 */
function detectCategory(title) {
  const titleLower = title.toLowerCase();
  
  for (const [keyword, category] of Object.entries(CONFIG.categories)) {
    if (keyword !== 'default' && titleLower.includes(keyword)) {
      return category;
    }
  }
  
  return CONFIG.categories.default;
}

/**
 * Tạo summary từ title nếu không có
 */
function generateSummary(title) {
  return `Khám phá thông tin chi tiết về ${title.toLowerCase()} trong dịp Tết Nguyên Đán. Cập nhật những kiến thức bổ ích và truyền thống văn hóa Việt Nam.`;
}

/**
 * Format ngày tháng
 */
function formatDate(date) {
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit', 
    year: 'numeric'
  });
}

/**
 * Tạo HTML cho một bài viết
 */
function generateArticleHTML(article, isFeatured = false) {
  // Sử dụng image URL thực tế từ VNExpress, fallback về local image nếu không có
  const imageUrl = article.image || `assets/images/foods/${article.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg`;
  
  if (isFeatured) {
    return `
                    <!-- Featured Article -->
                    <article class="blog-post featured">
                        <div class="post-image">
                            <img src="${imageUrl}" alt="${article.title}" onerror="this.src='assets/images/ic_app.webp'">
                        </div>
                        <div class="post-content">
                            <div class="post-meta">
                                <span class="post-category">${article.category}</span>
                                <span class="post-date">${article.date}</span>
                            </div>
                            <h2><a href="${article.link}" target="_blank" rel="noopener">${article.title}</a></h2>
                            <p>${article.summary}</p>
                            <a href="${article.link}" target="_blank" rel="noopener" class="read-more">Đọc tiếp →</a>
                        </div>
                    </article>`;
  } else {
    return `
                    <article class="blog-post">
                        <div class="post-image">
                            <img src="${imageUrl}" alt="${article.title}" onerror="this.src='assets/images/ic_app.webp'">
                        </div>
                        <div class="post-content">
                            <div class="post-meta">
                                <span class="post-category">${article.category}</span>
                                <span class="post-date">${article.date}</span>
                            </div>
                            <h3><a href="${article.link}" target="_blank" rel="noopener">${article.title}</a></h3>
                            <p>${article.summary}</p>
                            <a href="${article.link}" target="_blank" rel="noopener" class="read-more">Đọc tiếp →</a>
                        </div>
                    </article>`;
  }
}

/**
 * Cập nhật blog.html với dữ liệu mới
 */
function updateBlogHTML(articles) {
  try {
    console.log('📝 Đang cập nhật blog.html...');
    
    // Đọc file blog.html hiện tại
    let blogContent = fs.readFileSync(CONFIG.blogFilePath, 'utf8');
    
    // Tạo HTML cho các bài viết
    let articlesHTML = '';
    
    articles.forEach((article, index) => {
      articlesHTML += generateArticleHTML(article, index === 0);
    });
    
    // Tìm và thay thế phần blog-grid
    const blogGridStart = blogContent.indexOf('<div class="blog-grid">');
    const blogGridEnd = blogContent.indexOf('</div>', blogContent.indexOf('<!-- Pagination -->')) + 6;
    
    if (blogGridStart !== -1 && blogGridEnd !== -1) {
      const beforeGrid = blogContent.substring(0, blogGridStart);
      const afterGrid = blogContent.substring(blogGridEnd);
      
      const newBlogGrid = `<div class="blog-grid">${articlesHTML}
                </div>

                <!-- Pagination -->
                <div class="pagination">
                    <a href="https://vnexpress.net/tag/tet-co-truyen-99667" class="page-btn" target="_blank" rel="noopener noreferrer">Xem thêm bài viết về Tết ›</a>
                </div>`;
      
      blogContent = beforeGrid + newBlogGrid + afterGrid;
      
      // Ghi lại file
      fs.writeFileSync(CONFIG.blogFilePath, blogContent, 'utf8');
      console.log('✅ Đã cập nhật blog.html thành công!');
      
    } else {
      console.error('❌ Không tìm thấy phần blog-grid để cập nhật');
    }
    
  } catch (error) {
    console.error('❌ Lỗi khi cập nhật blog.html:', error.message);
  }
}

/**
 * Crawl từ nhiều trang VNExpress
 */
async function crawlMultiplePages() {
  const allArticles = [];
  
  for (let i = 0; i < CONFIG.vnexpressUrls.length; i++) {
    const url = CONFIG.vnexpressUrls[i];
    console.log(`📄 Đang crawl trang ${i + 1}/${CONFIG.vnexpressUrls.length}`);
    
    try {
      const articles = await getArticlesFromVNExpress(url);
      allArticles.push(...articles);
      
      // Delay giữa các request để tránh bị block
      if (i < CONFIG.vnexpressUrls.length - 1) {
        console.log("⏳ Chờ 2 giây trước khi crawl trang tiếp theo...");
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } catch (error) {
      console.error(`❌ Lỗi khi crawl trang ${i + 1}:`, error.message);
    }
  }
  
  // Loại bỏ duplicate và giới hạn số lượng
  const uniqueArticles = allArticles.filter((article, index, self) => 
    index === self.findIndex(a => a.link === article.link)
  ).slice(0, 15); // Giới hạn tối đa 15 bài
  
  return uniqueArticles;
}

/**
 * Hàm chính
 */
async function main() {
  console.log('🚀 Bắt đầu crawl dữ liệu blog Tết...');
  
  try {
    // Crawl dữ liệu từ nhiều trang VNExpress
    const articles = await crawlMultiplePages();
    
    if (articles.length === 0) {
      console.log("⚠️ Không tìm thấy bài viết nào!");
      return;
    }
    
    console.log(`📊 Tổng cộng crawl được ${articles.length} bài viết từ ${CONFIG.vnexpressUrls.length} trang`);
    
    if (articles.length > 0) {
      console.log('📊 Danh sách bài viết đã crawl:');
      articles.forEach((article, index) => {
        console.log(`${index + 1}. [${article.category}] ${article.title}`);
        console.log(`   📅 ${article.date} | 🔗 ${article.link}`);
        console.log(`   📝 ${article.summary.substring(0, 100)}...\n`);
      });
      
      // Cập nhật blog.html
      updateBlogHTML(articles);
      
      console.log('🎉 Hoàn thành! Blog đã được cập nhật với dữ liệu mới.');
    } else {
      console.log('⚠️  Không tìm thấy bài viết nào để cập nhật.');
    }
    
  } catch (error) {
    console.error('❌ Lỗi trong quá trình thực thi:', error.message);
  }
}

// Chạy script nếu được gọi trực tiếp
if (require.main === module) {
  main();
}

// Export để có thể sử dụng như module
module.exports = {
  getArticlesFromVNExpress,
  updateBlogHTML,
  main
};