// FAQ Modal JavaScript

// FAQ Data với nội dung chi tiết
const faqData = {
    faq1: {
        title: "🗓️ Tết 2026 là ngày nào?",
        content: `
            <p><span class="highlight">Tết Nguyên Đán 2026</span> rơi vào <strong>Thứ Hai, ngày 17 tháng 2 năm 2026</strong> (âm lịch mùng 1 tháng Giêng năm Bính Ngọ).</p>
            
            <h4>📅 Thông tin chi tiết:</h4>
            <ul>
                <li><strong>Ngày:</strong> Thứ Hai, 17/02/2026</li>
                <li><strong>Âm lịch:</strong> Mùng 1 tháng Giêng năm Bính Ngọ</li>
                <li><strong>Năm con giáp:</strong> Năm con Ngựa</li>
                <li><strong>Can Chi:</strong> Bính Ngọ</li>
            </ul>
            
            <p>Đây là ngày quan trọng nhất trong năm của người Việt Nam, đánh dấu sự khởi đầu của năm mới theo lịch âm.</p>
        `
    },
    faq2: {
        title: "🐎 Năm 2026 là năm con gì?",
        content: `
            <p>Năm 2026 là <span class="highlight">năm Bính Ngọ</span> - năm con <strong>Ngựa</strong> theo lịch âm Việt Nam.</p>
            
            <h4>🐎 Đặc điểm của tuổi Ngựa:</h4>
            <ul>
                <li><strong>Tính cách:</strong> Năng động, tự do, nhiệt huyết</li>
                <li><strong>Ưu điểm:</strong> Thông minh, nhanh nhẹn, có khả năng lãnh đạo</li>
                <li><strong>Màu may mắn:</strong> Đỏ, vàng, tím</li>
                <li><strong>Hướng tốt:</strong> Nam, Tây Nam</li>
                <li><strong>Số may mắn:</strong> 2, 3, 7</li>
            </ul>
            
            <p>Người tuổi Ngựa thường có tính cách <span class="highlight">tự do, độc lập</span> và rất yêu thích khám phá những điều mới mẻ.</p>
        `
    },
    faq3: {
        title: "🏮 Phong tục chuẩn bị Tết",
        content: `
            <p>Chuẩn bị Tết là một quá trình quan trọng để đón năm mới một cách trọn vẹn nhất.</p>
            
            <h4>🧹 Những việc cần làm trước Tết:</h4>
            <ul>
                <li><strong>Dọn dẹp nhà cửa:</strong> Quét sạch bụi bặm, lau chùi đồ đạc</li>
                <li><strong>Mua sắm đồ Tết:</strong> Thực phẩm, quần áo mới, đồ trang trí</li>
                <li><strong>Chuẩn bị món ăn:</strong> Bánh chưng, thịt đông, mứt Tết</li>
                <li><strong>Trang trí nhà:</strong> Hoa đào, mai, câu đối, lì xì</li>
                <li><strong>Cúng ông bà:</strong> Tảo mộ, cúng tổ tiên</li>
            </ul>
            
            <h4>🎊 Ý nghĩa:</h4>
            <p>Việc chuẩn bị kỹ lưỡng giúp <span class="highlight">xua đuổi vận xui</span> và đón nhận <span class="highlight">may mắn, tài lộc</span> trong năm mới.</p>
        `
    },
    faq4: {
        title: "🧹 Tại sao phải dọn nhà?",
        content: `
            <p>Dọn dẹp nhà cửa trước Tết là một <span class="highlight">phong tục truyền thống</span> quan trọng của người Việt.</p>
            
            <h4>🏠 Ý nghĩa tâm linh:</h4>
            <ul>
                <li><strong>Xua đuổi vận xui:</strong> Quét sạch những điều không may trong năm cũ</li>
                <li><strong>Đón tài lộc:</strong> Tạo không gian sạch sẽ để đón thần tài</li>
                <li><strong>Làm mới tinh thần:</strong> Chuẩn bị tâm lý tích cực cho năm mới</li>
                <li><strong>Thể hiện lòng thành:</strong> Tôn trọng tổ tiên và thần linh</li>
            </ul>
            
            <h4>✨ Cách thực hiện:</h4>
            <p>Nên dọn dẹp từ <span class="highlight">23 tháng Chạp</span> (ông Táo chầu trời) đến <span class="highlight">29 Tết</span>, tránh dọn dẹp trong 3 ngày Tết.</p>
        `
    },
    faq5: {
        title: "🍽️ Món ăn truyền thống Tết",
        content: `
            <p>Mâm cơm Tết Việt Nam có những món ăn <span class="highlight">không thể thiếu</span> với ý nghĩa tâm linh sâu sắc.</p>
            
            <h4>🥟 Món ăn chính:</h4>
            <ul>
                <li><strong>Bánh chưng/Bánh tét:</strong> Biểu tượng của đất trời, tình thân</li>
                <li><strong>Thịt đông:</strong> Món ăn thanh đạm, mát lành</li>
                <li><strong>Chả lụa:</strong> Thể hiện sự khéo léo, tài năng</li>
                <li><strong>Dưa hành:</strong> Màu trắng tinh khiết, xua đuổi tà ma</li>
                <li><strong>Củ kiệu:</strong> Màu vàng tượng trưng cho vàng bạc</li>
            </ul>
            
            <h4>🍯 Mứt Tết:</h4>
            <ul>
                <li><strong>Mứt dừa:</strong> Ngọt ngào, hạnh phúc</li>
                <li><strong>Mứt gừng:</strong> Ấm áp, sức khỏe</li>
                <li><strong>Mứt sen:</strong> Thanh cao, trong sạch</li>
            </ul>
        `
    },
    faq6: {
        title: "🎁 Lì xì và quà Tết",
        content: `
            <p>Tặng lì xì và quà Tết là <span class="highlight">truyền thống đẹp</span> thể hiện tình cảm và lời chúc tốt đẹp.</p>
            
            <h4>💰 Lì xì:</h4>
            <ul>
                <li><strong>Ý nghĩa:</strong> Chúc may mắn, tài lộc, sức khỏe</li>
                <li><strong>Đối tượng:</strong> Trẻ em, người lớn tuổi, nhân viên</li>
                <li><strong>Số tiền:</strong> Số chẵn, tránh số 4</li>
                <li><strong>Bao lì xì:</strong> Màu đỏ, vàng mang ý nghĩa may mắn</li>
            </ul>
            
            <h4>🎁 Quà Tết phổ biến:</h4>
            <ul>
                <li><strong>Bánh kẹo:</strong> Ngọt ngào, hạnh phúc</li>
                <li><strong>Trái cây:</strong> Tươi mới, thịnh vượng</li>
                <li><strong>Rượu, bia:</strong> Cho người lớn</li>
                <li><strong>Hoa tươi:</strong> Đẹp đẽ, may mắn</li>
            </ul>
        `
    },
    faq7: {
        title: "🌸 Hoa trang trí Tết",
        content: `
            <p>Hoa là <span class="highlight">linh hồn của Tết</span>, mang đến không khí xuân về và những điều may mắn.</p>
            
            <h4>🌸 Các loại hoa chính:</h4>
            <ul>
                <li><strong>Hoa đào (Miền Bắc):</strong> Màu hồng tượng trưng cho may mắn, thịnh vượng</li>
                <li><strong>Hoa mai (Miền Nam):</strong> Màu vàng biểu tượng của giàu sang, phú quý</li>
                <li><strong>Hoa quất:</strong> Quả vàng tròn như vàng, mang lại tài lộc</li>
                <li><strong>Hoa cúc:</strong> Trường thọ, sức khỏe</li>
                <li><strong>Hoa lan:</strong> Thanh cao, quý phái</li>
            </ul>
            
            <h4>🏡 Cách bày trí:</h4>
            <p>Đặt hoa ở <span class="highlight">vị trí trung tâm</span> của nhà, hướng cửa chính để đón khí tốt vào nhà.</p>
        `
    },
    faq8: {
        title: "🎊 Hoạt động vui chơi Tết",
        content: `
            <p>Tết là dịp để <span class="highlight">sum họp gia đình</span> và tham gia các hoạt động vui chơi truyền thống.</p>
            
            <h4>🎮 Trò chơi truyền thống:</h4>
            <ul>
                <li><strong>Bài tứ sắc:</strong> Trò chơi dân gian phổ biến</li>
                <li><strong>Cờ tướng:</strong> Rèn luyện trí tuệ</li>
                <li><strong>Ném còn:</strong> Hoạt động của các cặp đôi</li>
                <li><strong>Đánh đu:</strong> Vui chơi trong ngày Tết</li>
                <li><strong>Múa lân:</strong> Xem biểu diễn mang lại may mắn</li>
            </ul>
            
            <h4>🏮 Hoạt động hiện đại:</h4>
            <ul>
                <li><strong>Chụp ảnh gia đình:</strong> Lưu giữ kỷ niệm</li>
                <li><strong>Xem pháo hoa:</strong> Đón chào năm mới</li>
                <li><strong>Du xuân:</strong> Thăm quan, du lịch</li>
                <li><strong>Chơi game online:</strong> Kết nối với bạn bè</li>
            </ul>
        `
    }
};

// Hàm mở modal FAQ
function openFaqModal(faqId) {
    const modal = document.getElementById('faqModal');
    const title = document.getElementById('faqModalTitle');
    const content = document.getElementById('faqModalContent');
    
    if (faqData[faqId]) {
        title.innerHTML = faqData[faqId].title;
        content.innerHTML = faqData[faqId].content;
        modal.style.display = 'block';
        
        // Thêm animation cho modal
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
        
        // Ngăn scroll của body
        document.body.style.overflow = 'hidden';
    }
}

// Hàm đóng modal FAQ
function closeFaqModal() {
    const modal = document.getElementById('faqModal');
    
    // Animation đóng modal
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Đóng modal khi click bên ngoài
window.onclick = function(event) {
    const modal = document.getElementById('faqModal');
    if (event.target === modal) {
        closeFaqModal();
    }
}

// Đóng modal khi nhấn ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('faqModal');
        if (modal.style.display === 'block') {
            closeFaqModal();
        }
    }
});

// Thêm hiệu ứng hover cho FAQ cards
document.addEventListener('DOMContentLoaded', function() {
    const faqCards = document.querySelectorAll('.faq-card');
    
    faqCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});