#!/bin/bash

# Sắp Tết 2026 - Deploy Script
# Script để deploy website lên GitHub Pages với tự động update version

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo ""
echo "🚀 Sắp Tết 2026 - Deploy Script"
echo "📦 Đang chuẩn bị deploy lên GitHub Pages..."
echo ""

# Hàm kiểm tra command có tồn tại không
check_command() {
    if ! command -v $1 &> /dev/null; then
        echo -e "${RED}❌ Lỗi: $1 không được tìm thấy. Vui lòng cài đặt $1 trước.${NC}"
        exit 1
    fi
}

# Kiểm tra các dependencies cần thiết
echo "🔍 Đang kiểm tra dependencies..."
check_command "node"
check_command "git"
check_command "npm"
echo -e "${GREEN}✅ Tất cả dependencies đã sẵn sàng${NC}"
echo ""

# Kiểm tra xem có thay đổi chưa commit không
if ! git diff-index --quiet HEAD --; then
    echo -e "${YELLOW}⚠️  Có các thay đổi chưa được commit.${NC}"
    echo "📋 Các file đã thay đổi:"
    git status --short
    echo ""
    read -p "Bạn có muốn commit các thay đổi này trước khi deploy? (y/n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "📝 Đang commit các thay đổi..."
        git add .
        read -p "Nhập commit message (hoặc Enter để dùng message mặc định): " commit_msg
        if [ -z "$commit_msg" ]; then
            commit_msg="chore: update before deployment"
        fi
        git commit -m "$commit_msg"
        echo -e "${GREEN}✅ Đã commit các thay đổi${NC}"
    else
        echo -e "${YELLOW}⚠️  Bỏ qua commit. Chỉ update version và push.${NC}"
    fi
    echo ""
fi

# Bước 1: Update version
echo "📦 Bước 1/3: Đang update version cho Service Worker..."
if [ ! -f "scripts/update-version.js" ]; then
    echo -e "${RED}❌ Lỗi: Không tìm thấy file scripts/update-version.js${NC}"
    exit 1
fi

node scripts/update-version.js
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Lỗi: Không thể update version${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Đã update version thành công${NC}"
echo ""

# Hiển thị version mới
if [ -f ".version" ]; then
    NEW_VERSION=$(cat .version)
    echo -e "${BLUE}📌 Version mới: ${NEW_VERSION}${NC}"
    echo ""
fi

# Bước 2: Git add version files
echo "📝 Bước 2/3: Đang thêm các file version vào git..."
git add sw.js .version .last_build_id 2>/dev/null || {
    echo -e "${YELLOW}⚠️  Một số file version không tồn tại, tiếp tục...${NC}"
}

# Kiểm tra xem có thay đổi nào không
if git diff --staged --quiet; then
    echo -e "${YELLOW}⚠️  Không có thay đổi nào để commit${NC}"
else
    echo -e "${GREEN}✅ Đã thêm các file version${NC}"
fi
echo ""

# Bước 3: Commit version changes
echo "💾 Bước 3/3: Đang commit version changes..."
if ! git diff --staged --quiet; then
    git commit -m "chore: auto-update version for deployment [skip ci]" || {
        echo -e "${YELLOW}⚠️  Không có thay đổi để commit hoặc đã được commit trước đó${NC}"
    }
    echo -e "${GREEN}✅ Đã commit version changes${NC}"
else
    echo -e "${YELLOW}⚠️  Không có thay đổi để commit${NC}"
fi
echo ""

# Kiểm tra branch hiện tại
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo -e "${BLUE}🌿 Branch hiện tại: ${CURRENT_BRANCH}${NC}"

if [ "$CURRENT_BRANCH" != "master" ] && [ "$CURRENT_BRANCH" != "main" ]; then
    echo -e "${YELLOW}⚠️  Bạn đang ở branch ${CURRENT_BRANCH}, không phải master/main${NC}"
    read -p "Bạn có muốn tiếp tục deploy? (y/n): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Đã hủy deploy"
        exit 0
    fi
fi
echo ""

# Kiểm tra xem có cần push không
LOCAL_COMMITS=$(git rev-list @{u}..HEAD 2>/dev/null | wc -l | tr -d ' ')
if [ "$LOCAL_COMMITS" -eq 0 ] && git diff --staged --quiet && git diff-index --quiet HEAD --; then
    echo -e "${YELLOW}⚠️  Không có thay đổi nào để push${NC}"
    echo "✅ Website đã được deploy với version hiện tại"
    exit 0
fi

# Push lên GitHub
echo "🚀 Đang push lên GitHub..."
read -p "Bạn có chắc chắn muốn push lên origin ${CURRENT_BRANCH}? (y/n): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Đã hủy push"
    exit 0
fi

git push origin ${CURRENT_BRANCH}
if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ Deploy thành công!${NC}"
    echo ""
    echo "📋 Thông tin deploy:"
    echo "   • Branch: ${CURRENT_BRANCH}"
    if [ -f ".version" ]; then
        echo "   • Version: $(cat .version)"
    fi
    echo "   • GitHub Pages sẽ tự động deploy trong vài phút"
    echo ""
    echo "🔍 Kiểm tra deploy tại:"
    echo "   • https://thanhnh98.github.io"
    echo "   • https://saptet.vn"
    echo ""
    echo "💡 Tip: Sử dụng DevTools (F12) → Application → Service Workers để kiểm tra version mới"
    echo ""
else
    echo ""
    echo -e "${RED}❌ Lỗi: Không thể push lên GitHub${NC}"
    echo "💡 Kiểm tra lại kết nối internet và quyền truy cập repository"
    exit 1
fi
