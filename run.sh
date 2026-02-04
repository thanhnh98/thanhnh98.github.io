#!/bin/bash

# Sắp Tết 2026 - Local Development Server
# Script để khởi chạy local server cho website

echo "🎊 Đang khởi chạy Sắp Tết 2026 Local Server..."
echo "📅 Lịch nghỉ Tết 2026: 9 ngày từ 14/2 - 22/2/2026"
echo ""

# Hàm kiểm tra port có đang được sử dụng không
is_port_in_use() {
    lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1
}

# Hàm tìm port trống
find_available_port() {
    local start_port=$1
    local port=$start_port
    while is_port_in_use $port; do
        port=$((port + 1))
        if [ $port -gt 8100 ]; then
            echo "❌ Không tìm thấy port trống trong khoảng $start_port-8100"
            exit 1
        fi
    done
    echo $port
}

# Hàm dừng process trên port
stop_port_process() {
    local port=$1
    local pid=$(lsof -ti :$port)
    if [ ! -z "$pid" ]; then
        echo "⚠️  Đang dừng process (PID: $pid) trên port $port..."
        kill -9 $pid 2>/dev/null
        sleep 1
        # Kiểm tra lại
        if is_port_in_use $port; then
            echo "⚠️  Không thể dừng process trên port $port. Tìm port khác..."
            return 1
        else
            echo "✅ Đã dừng process trên port $port"
            return 0
        fi
    fi
    return 0
}

# Port mặc định
DEFAULT_PORT=8000
PORT=$DEFAULT_PORT

# Kiểm tra và xử lý port 8000
if is_port_in_use $DEFAULT_PORT; then
    echo "⚠️  Port $DEFAULT_PORT đang được sử dụng."
    echo "🔄 Đang thử dừng process cũ..."
    
    # Thử dừng process Python HTTP server
    pkill -f "python3 -m http.server $DEFAULT_PORT" 2>/dev/null
    sleep 2
    
    # Nếu vẫn còn process, thử kill trực tiếp
    if is_port_in_use $DEFAULT_PORT; then
        stop_port_process $DEFAULT_PORT
    fi
    
    # Nếu vẫn không được, tìm port khác
    if is_port_in_use $DEFAULT_PORT; then
        echo "⚠️  Không thể giải phóng port $DEFAULT_PORT."
        echo "🔍 Đang tìm port trống..."
        PORT=$(find_available_port $((DEFAULT_PORT + 1)))
        echo "✅ Tìm thấy port trống: $PORT"
    else
        echo "✅ Port $DEFAULT_PORT đã được giải phóng"
    fi
fi

# Khởi chạy server
echo ""
echo "🚀 Khởi chạy server tại http://localhost:$PORT"
echo "📱 Các trang chính:"
echo "   • Trang chủ: http://localhost:$PORT/index.html"
echo "   • Blog: http://localhost:$PORT/blog.html"
echo "   • Lịch nghỉ Tết 2026: http://localhost:$PORT/lich-nghi-tet-2026.html"
echo "   • Lịch Tết 2026: http://localhost:$PORT/lich-tet-2026.html"
echo "   • Lịch âm dương / Lịch vạn niên: http://localhost:$PORT/lich-van-nien.html"
echo "   • Máy tính lì xì: http://localhost:$PORT/may-tinh-li-xi.html"
echo ""
echo "🛑 Nhấn Ctrl+C để dừng server"
echo ""

# Chạy server
python3 -m http.server $PORT
