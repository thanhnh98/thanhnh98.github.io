#!/bin/bash

# Sắp Tết 2026 - Local Development Server
# Script để khởi chạy local server cho website

echo "🎊 Đang khởi chạy Sắp Tết 2026 Local Server..."
echo "📅 Lịch nghỉ Tết 2026: 9 ngày từ 14/2 - 22/2/2026"
echo ""

# Kiểm tra xem port 8000 có đang được sử dụng không
if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 8000 đang được sử dụng. Đang dừng process cũ..."
    pkill -f "python3 -m http.server 8000"
    sleep 2
fi

# Khởi chạy server
echo "🚀 Khởi chạy server tại http://localhost:8000"
echo "📱 Các trang chính:"
echo "   • Trang chủ: http://localhost:8000/index.html"
echo "   • Blog: http://localhost:8000/blog.html"
echo "   • Lịch nghỉ Tết 2026: http://localhost:8000/lich-nghi-tet-2026.html"
echo "   • Lịch âm dương: http://localhost:8000/lich-am-duong.html"
echo "   • Máy tính lì xì: http://localhost:8000/may-tinh-li-xi.html"
echo ""
echo "🛑 Nhấn Ctrl+C để dừng server"
echo ""

# Chạy server
python3 -m http.server 8000
