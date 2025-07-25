// Footer loader
document.addEventListener('DOMContentLoaded', function() {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        fetch('footer.html')
            .then(response => response.text())
            .then(data => {
                footerContainer.innerHTML = data;
            })
            .catch(error => {
                console.log('Footer loaded from static content');
                footerContainer.innerHTML = `
                    <footer style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 2rem 0; margin-top: 3rem;">
                        <div class="container">
                            <div style="text-align: center;">
                                <p style="margin: 0; font-size: 1.1rem;">🎊 Sắp Tết 2026 - Đếm Ngược Tết Nguyên Đán</p>
                                <p style="margin: 0.5rem 0 0 0; opacity: 0.8;">Website được phát triển với ❤️ để mang đến không khí Tết đến mọi nhà</p>
                                <div style="margin-top: 1rem;">
                                    <a href="index.html" style="color: white; text-decoration: none; margin: 0 1rem;">🏠 Trang chủ</a>
                                    <a href="may-tinh-li-xi.html" style="color: white; text-decoration: none; margin: 0 1rem;">🧮 Máy tính lì xì</a>
                                    <a href="tro-choi-tet.html" style="color: white; text-decoration: none; margin: 0 1rem;">🎮 Trò chơi</a>
                                </div>
                            </div>
                        </div>
                    </footer>
                `;
            });
    }
}); 