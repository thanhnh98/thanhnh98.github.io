#!/usr/bin/env node

const { main: crawlMain } = require('./crawl-tet-articles.js');
const fs = require('fs');
const path = require('path');

/**
 * Script tự động cập nhật blog với dữ liệu mới từ VNExpress
 * Có thể chạy theo cron job hoặc manual
 */

const CONFIG = {
  logFile: path.join(__dirname, 'logs', 'blog-update.log'),
  maxLogSize: 1024 * 1024, // 1MB
  backupCount: 5
};

/**
 * Ghi log với timestamp
 */
function writeLog(message, level = 'INFO') {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level}] ${message}\n`;
  
  // Tạo thư mục logs nếu chưa có
  const logsDir = path.dirname(CONFIG.logFile);
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }
  
  // Ghi log
  fs.appendFileSync(CONFIG.logFile, logMessage);
  console.log(logMessage.trim());
}

/**
 * Rotate log files khi quá lớn
 */
function rotateLogIfNeeded() {
  try {
    if (fs.existsSync(CONFIG.logFile)) {
      const stats = fs.statSync(CONFIG.logFile);
      if (stats.size > CONFIG.maxLogSize) {
        // Backup log files
        for (let i = CONFIG.backupCount - 1; i > 0; i--) {
          const oldFile = `${CONFIG.logFile}.${i}`;
          const newFile = `${CONFIG.logFile}.${i + 1}`;
          if (fs.existsSync(oldFile)) {
            fs.renameSync(oldFile, newFile);
          }
        }
        
        // Move current log to .1
        fs.renameSync(CONFIG.logFile, `${CONFIG.logFile}.1`);
        writeLog('Log file rotated due to size limit');
      }
    }
  } catch (error) {
    console.error('Error rotating log file:', error.message);
  }
}

/**
 * Kiểm tra kết nối internet
 */
async function checkInternetConnection() {
  try {
    const { default: fetch } = await import('node-fetch');
    const response = await fetch('https://www.google.com', { 
      method: 'HEAD',
      timeout: 5000 
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}

/**
 * Backup blog.html trước khi cập nhật
 */
function backupBlogFile() {
  try {
    const blogFile = path.join(__dirname, 'blog.html');
    const backupFile = path.join(__dirname, 'backups', `blog-${Date.now()}.html`);
    
    // Tạo thư mục backup nếu chưa có
    const backupDir = path.dirname(backupFile);
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    if (fs.existsSync(blogFile)) {
      fs.copyFileSync(blogFile, backupFile);
      writeLog(`Blog file backed up to: ${backupFile}`);
      
      // Xóa backup cũ (giữ lại 10 file gần nhất)
      const backupFiles = fs.readdirSync(backupDir)
        .filter(file => file.startsWith('blog-') && file.endsWith('.html'))
        .map(file => ({
          name: file,
          path: path.join(backupDir, file),
          time: fs.statSync(path.join(backupDir, file)).mtime
        }))
        .sort((a, b) => b.time - a.time);
      
      if (backupFiles.length > 10) {
        backupFiles.slice(10).forEach(file => {
          fs.unlinkSync(file.path);
          writeLog(`Removed old backup: ${file.name}`);
        });
      }
    }
  } catch (error) {
    writeLog(`Error backing up blog file: ${error.message}`, 'ERROR');
  }
}

/**
 * Hàm chính để cập nhật blog
 */
async function updateBlog() {
  writeLog('=== Starting automatic blog update ===');
  
  try {
    // Rotate log nếu cần
    rotateLogIfNeeded();
    
    // Kiểm tra kết nối internet
    writeLog('Checking internet connection...');
    const hasInternet = await checkInternetConnection();
    if (!hasInternet) {
      writeLog('No internet connection available. Aborting update.', 'ERROR');
      return false;
    }
    writeLog('Internet connection OK');
    
    // Backup blog file
    writeLog('Creating backup of current blog file...');
    backupBlogFile();
    
    // Chạy crawling
    writeLog('Starting crawling process...');
    await crawlMain();
    
    writeLog('=== Blog update completed successfully ===');
    return true;
    
  } catch (error) {
    writeLog(`Error during blog update: ${error.message}`, 'ERROR');
    writeLog(`Stack trace: ${error.stack}`, 'ERROR');
    return false;
  }
}

/**
 * Tạo cron job script
 */
function generateCronScript() {
  const cronScript = `#!/bin/bash
# Cron job script để tự động cập nhật blog
# Chạy mỗi ngày lúc 6:00 AM
# Crontab entry: 0 6 * * * /path/to/this/script

cd "${__dirname}"
node auto-update-blog.js

# Log kết quả
echo "Blog update completed at $(date)" >> logs/cron.log
`;
  
  const cronScriptPath = path.join(__dirname, 'scripts', 'update-blog-cron.sh');
  
  // Tạo thư mục scripts nếu chưa có
  const scriptsDir = path.dirname(cronScriptPath);
  if (!fs.existsSync(scriptsDir)) {
    fs.mkdirSync(scriptsDir, { recursive: true });
  }
  
  fs.writeFileSync(cronScriptPath, cronScript);
  
  // Make executable
  try {
    fs.chmodSync(cronScriptPath, '755');
    writeLog(`Cron script created at: ${cronScriptPath}`);
    writeLog('To set up cron job, run: crontab -e');
    writeLog(`Then add: 0 6 * * * ${cronScriptPath}`);
  } catch (error) {
    writeLog(`Error setting permissions for cron script: ${error.message}`, 'ERROR');
  }
}

/**
 * Hiển thị help
 */
function showHelp() {
  console.log(`
🎋 Sắp Tết - Blog Auto Update Tool

Usage:
  node auto-update-blog.js [command]

Commands:
  update     - Chạy cập nhật blog ngay (default)
  cron       - Tạo script cron job
  logs       - Xem logs gần nhất
  backup     - Tạo backup blog.html
  help       - Hiển thị help này

Examples:
  node auto-update-blog.js
  node auto-update-blog.js update
  node auto-update-blog.js cron
  node auto-update-blog.js logs
`);
}

/**
 * Xem logs gần nhất
 */
function showRecentLogs() {
  try {
    if (fs.existsSync(CONFIG.logFile)) {
      const logs = fs.readFileSync(CONFIG.logFile, 'utf8');
      const lines = logs.split('\n').slice(-50); // 50 dòng cuối
      console.log('\n=== Recent Logs ===');
      console.log(lines.join('\n'));
    } else {
      console.log('No log file found.');
    }
  } catch (error) {
    console.error('Error reading log file:', error.message);
  }
}

/**
 * Main function
 */
async function main() {
  const command = process.argv[2] || 'update';
  
  switch (command) {
    case 'update':
      await updateBlog();
      break;
      
    case 'cron':
      generateCronScript();
      break;
      
    case 'logs':
      showRecentLogs();
      break;
      
    case 'backup':
      backupBlogFile();
      break;
      
    case 'help':
    case '--help':
    case '-h':
      showHelp();
      break;
      
    default:
      console.log(`Unknown command: ${command}`);
      showHelp();
      process.exit(1);
  }
}

// Chạy nếu được gọi trực tiếp
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error.message);
    process.exit(1);
  });
}

module.exports = {
  updateBlog,
  backupBlogFile,
  generateCronScript
};