#!/usr/bin/env bash

set -euo pipefail

PROJECT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
START_PORT="${PORT:-8000}"
PAGE="${1:-/ung-dung.html}"
PAGE="/${PAGE#/}"

is_port_in_use() {
    lsof -nP -iTCP:"$1" -sTCP:LISTEN -t >/dev/null 2>&1
}

PORT_NUMBER="$START_PORT"
while is_port_in_use "$PORT_NUMBER"; do
    PORT_NUMBER=$((PORT_NUMBER + 1))
    if (( PORT_NUMBER > START_PORT + 100 )); then
        echo "❌ Không tìm thấy cổng trống từ $START_PORT đến $((START_PORT + 100))."
        exit 1
    fi
done

cd "$PROJECT_DIR"

RUN_ID="$(date +%s)"
URL="http://127.0.0.1:${PORT_NUMBER}${PAGE}?dev=${RUN_ID}"

echo "🎊 Sắp Tết 2027 — local preview"
echo "🚀 Đang chạy source mới nhất tại: $URL"
echo "🛑 Nhấn Ctrl+C để dừng server"
echo ""

if command -v open >/dev/null 2>&1; then
    (
        sleep 0.5
        open "$URL"
    ) &
fi

# Disable browser caching so every reload reflects the newest local files.
exec python3 - "$PORT_NUMBER" <<'PY'
import http.server
import sys


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


port = int(sys.argv[1])
server = http.server.ThreadingHTTPServer(("127.0.0.1", port), NoCacheHandler)
try:
    server.serve_forever()
except KeyboardInterrupt:
    pass
finally:
    server.server_close()
PY
