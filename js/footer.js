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
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
                                <div>
                                    <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: #FFD700;">🎊 Sắp Tết 2026</h3>
                                    <p style="margin-bottom: 1rem; opacity: 0.9;">Ứng dụng đếm ngược Tết và lịch âm dương được yêu thích</p>
                                    <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 1rem;">
                                        <a href="https://www.facebook.com/saptet2026/" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; gap: 0.5rem; color: rgba(255, 255, 255, 0.8); text-decoration: none; padding: 0.5rem; border-radius: 8px; background: rgba(255, 255, 255, 0.1); transition: all 0.3s ease;">
                                            <span style="font-size: 1.2rem;">📘</span>
                                            <span style="font-size: 0.9rem; font-weight: 500;">Facebook</span>
                                        </a>
                                        <a href="https://tiktok.com/@saptet" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; gap: 0.5rem; color: rgba(255, 255, 255, 0.8); text-decoration: none; padding: 0.5rem; border-radius: 8px; background: rgba(255, 255, 255, 0.1); transition: all 0.3s ease;">
                                            <span style="font-size: 1.2rem;">🎵</span>
                                            <span style="font-size: 0.9rem; font-weight: 500;">TikTok</span>
                                        </a>
                                        <a href="https://saptet.vn" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; gap: 0.5rem; color: rgba(255, 255, 255, 0.8); text-decoration: none; padding: 0.5rem; border-radius: 8px; background: rgba(255, 255, 255, 0.1); transition: all 0.3s ease;">
                                            <span style="font-size: 1.2rem;">🌐</span>
                                            <span style="font-size: 0.9rem; font-weight: 500;">Website</span>
                                        </a>
                                    </div>
                                </div>
                                <div style="text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                                    <h4 style="font-size: 1.2rem; margin-bottom: 1rem; color: #FFD700; text-align: center;">📱 Tải Ứng Dụng Sắp Tết</h4>
                                    <p style="margin-bottom: 1.5rem; opacity: 0.9; font-size: 0.95rem; text-align: center;">Trải nghiệm đầy đủ các tính năng Tết trên điện thoại của bạn!</p>
                                    <div style="display: flex; gap: 1rem; justify-content: center; align-items: center; flex-wrap: wrap; margin-bottom: 1.5rem;">
                                        <a href="https://play.google.com/store/apps/details?id=com.thanh_nguyen.tet_count_down" 
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           style="display: inline-block; transition: all 0.3s ease; border-radius: 8px; text-align: center;">
                                            <img src="assets/images/google_play.png" 
                                                 alt="Tải Sắp Tết trên Google Play Store" 
                                                 style="width: 120px; height: 40px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); display: block; margin: 0 auto;">
                                        </a>
                                        <a href="https://apps.apple.com/gb/app/s%E1%BA%AFp-t%E1%BA%BFt-%C4%91%E1%BA%BFm-ng%C6%B0%E1%BB%A3c-t%E1%BA%BFt-2026/id6743064990?platform=iphone" 
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           style="display: inline-block; transition: all 0.3s ease; border-radius: 8px; text-align: center;">
                                            <img src="assets/images/apple_store.png" 
                                                 alt="Tải Sắp Tết trên App Store" 
                                                 style="width: 120px; height: 40px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); display: block; margin: 0 auto;">
                                        </a>
                                    </div>
                                    <p style="text-align: center; margin: 0; opacity: 0.8; font-size: 0.85rem; font-style: italic;">✨ Đếm ngược Tết • Lịch âm dương • Quay số may mắn</p>
                                </div>
                            </div>
                            <div style="text-align: center; padding-top: 1.5rem; border-top: 1px solid rgba(255, 255, 255, 0.2); opacity: 0.7;">
                                <p style="margin: 0;">Phát triển bởi <a href="https://play.google.com/store/apps/dev?id=5540559479839330036" target="_blank" rel="noopener noreferrer" style="color: #FFD700; text-decoration: none; font-weight: 600; padding: 0.2rem 0.5rem; border-radius: 4px; background: rgba(255, 215, 0, 0.1);">TLife</a> | 70K+ Lượt tải</p>
                                <p style="margin: 0.5rem 0 0 0;">Ứng dụng Sắp Tết - Đếm ngược Tết 2026</p>
                            </div>
                        </div>
                    </footer>
                `;
            });
    }
}); 