// PWA Install functionality for Sắp Tết
class PWAInstaller {
    constructor() {
        this.deferredPrompt = null;
        this.isInstalled = false;
        this.installButton = null;
        this.init();
    }

    init() {
        // Check if app is already installed
        this.checkInstallStatus();
        
        // Listen for beforeinstallprompt event
        window.addEventListener('beforeinstallprompt', (e) => {
            console.log('PWA: beforeinstallprompt event fired');
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            // Stash the event so it can be triggered later
            this.deferredPrompt = e;
            // Show install button
            this.showInstallButton();
        });

        // Listen for app installed event
        window.addEventListener('appinstalled', (e) => {
            console.log('PWA: App was installed');
            this.isInstalled = true;
            this.hideInstallButton();
            this.showInstalledMessage();
        });

        // Register service worker
        this.registerServiceWorker();
    }

    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                // Luôn check version mới từ server khi register
                const registration = await navigator.serviceWorker.register('/sw.js', {
                    updateViaCache: 'none' // Quan trọng: Luôn check version mới từ server, không dùng cache
                });
                console.log('PWA: Service Worker registered successfully:', registration);
                
                // Periodically check for updates (mỗi 1 giờ)
                setInterval(() => {
                    registration.update();
                }, 3600000); // 1 hour
                
                // Check for updates
                registration.addEventListener('updatefound', () => {
                    console.log('PWA: New service worker found');
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            this.showUpdateAvailable();
                        }
                    });
                });
            } catch (error) {
                console.log('PWA: Service Worker registration failed:', error);
            }
        }
    }

    checkInstallStatus() {
        // Check if running in standalone mode (installed)
        if (window.matchMedia('(display-mode: standalone)').matches || 
            window.navigator.standalone === true) {
            this.isInstalled = true;
            console.log('PWA: App is running in installed mode');
        }
    }

    createInstallButton() {
        // Create install button if it doesn't exist
        if (!this.installButton) {
            this.installButton = document.createElement('button');
            this.installButton.id = 'pwa-install-btn';
            this.installButton.innerHTML = `
                <span class="install-icon">📱</span>
                <span class="install-text">Cài đặt ứng dụng</span>
            `;
            this.installButton.className = 'pwa-install-button';
            this.installButton.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
                color: white;
                border: none;
                padding: 12px 20px;
                border-radius: 50px;
                cursor: pointer;
                font-weight: 600;
                font-size: 14px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                z-index: 1000;
                display: none;
                align-items: center;
                gap: 8px;
                transition: all 0.3s ease;
                backdrop-filter: blur(10px);
                animation: slideInUp 0.5s ease;
            `;
            
            // Add hover effects
            this.installButton.addEventListener('mouseenter', () => {
                this.installButton.style.transform = 'translateY(-2px)';
                this.installButton.style.boxShadow = '0 6px 25px rgba(0,0,0,0.4)';
            });
            
            this.installButton.addEventListener('mouseleave', () => {
                this.installButton.style.transform = 'translateY(0)';
                this.installButton.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
            });
            
            this.installButton.addEventListener('click', () => {
                this.promptInstall();
            });
            
            document.body.appendChild(this.installButton);
        }
    }

    showInstallButton() {
        // Temporarily disabled - don't show install button
        return;
        
        if (!this.isInstalled && this.deferredPrompt) {
            this.createInstallButton();
            this.installButton.style.display = 'flex';
            
            // Also show in support section if exists
            this.addInstallToSupportSection();
        }
    }

    hideInstallButton() {
        if (this.installButton) {
            this.installButton.style.display = 'none';
        }
    }

    addInstallToSupportSection() {
        // Temporarily disabled - don't add install button to support section
        return;
        
        const supportSection = document.querySelector('.support-section');
        if (supportSection && !document.getElementById('support-install-btn')) {
            const buttonContainer = supportSection.querySelector('div[style*="display: flex"]');
            if (buttonContainer) {
                const installBtn = document.createElement('button');
                installBtn.id = 'support-install-btn';
                installBtn.innerHTML = '📱 Cài đặt ứng dụng';
                installBtn.style.cssText = `
                    background: rgba(255,255,255,0.2);
                    color: white;
                    border: 2px solid white;
                    padding: 1rem 2rem;
                    border-radius: 50px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(10px);
                `;
                
                installBtn.addEventListener('mouseenter', () => {
                    installBtn.style.background = 'white';
                    installBtn.style.color = 'var(--color-primary)';
                });
                
                installBtn.addEventListener('mouseleave', () => {
                    installBtn.style.background = 'rgba(255,255,255,0.2)';
                    installBtn.style.color = 'white';
                });
                
                installBtn.addEventListener('click', () => {
                    this.promptInstall();
                });
                
                buttonContainer.insertBefore(installBtn, buttonContainer.firstChild);
            }
        }
    }

    async promptInstall() {
        if (!this.deferredPrompt) {
            this.showManualInstallInstructions();
            return;
        }

        // Show the install prompt
        this.deferredPrompt.prompt();
        
        // Wait for the user to respond to the prompt
        const { outcome } = await this.deferredPrompt.userChoice;
        console.log(`PWA: User response to install prompt: ${outcome}`);
        
        if (outcome === 'accepted') {
            console.log('PWA: User accepted the install prompt');
        } else {
            console.log('PWA: User dismissed the install prompt');
        }
        
        // Clear the deferredPrompt
        this.deferredPrompt = null;
        this.hideInstallButton();
    }

    showManualInstallInstructions() {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const isAndroid = /Android/.test(navigator.userAgent);
        
        let instructions = '';
        
        if (isIOS) {
            instructions = `
                <h3>📱 Cài đặt ứng dụng trên iOS</h3>
                <ol>
                    <li>Nhấn vào nút <strong>Chia sẻ</strong> (⬆️) ở thanh công cụ</li>
                    <li>Cuộn xuống và chọn <strong>"Thêm vào Màn hình chính"</strong></li>
                    <li>Nhấn <strong>"Thêm"</strong> để hoàn tất</li>
                </ol>
            `;
        } else if (isAndroid) {
            instructions = `
                <h3>📱 Cài đặt ứng dụng trên Android</h3>
                <ol>
                    <li>Nhấn vào menu <strong>⋮</strong> ở góc trên bên phải</li>
                    <li>Chọn <strong>"Thêm vào màn hình chính"</strong> hoặc <strong>"Cài đặt ứng dụng"</strong></li>
                    <li>Nhấn <strong>"Cài đặt"</strong> để hoàn tất</li>
                </ol>
            `;
        } else {
            instructions = `
                <h3>💻 Cài đặt ứng dụng trên máy tính</h3>
                <p>Tìm biểu tượng cài đặt (⬇️) ở thanh địa chỉ trình duyệt và nhấn vào để cài đặt.</p>
            `;
        }
        
        this.showModal('Cài đặt ứng dụng Sắp Tết', instructions);
    }

    showInstalledMessage() {
        this.showModal(
            '🎉 Cài đặt thành công!', 
            '<p>Ứng dụng Sắp Tết đã được cài đặt thành công! Bạn có thể tìm thấy nó trên màn hình chính của thiết bị.</p>'
        );
    }

    showUpdateAvailable() {
        const updateModal = this.showModal(
            '🔄 Cập nhật có sẵn', 
            '<p>Có phiên bản mới của ứng dụng. Bạn có muốn cập nhật ngay không?</p>',
            [
                {
                    text: 'Cập nhật ngay',
                    action: () => {
                        window.location.reload();
                    }
                },
                {
                    text: 'Để sau',
                    action: () => {
                        updateModal.remove();
                    }
                }
            ]
        );
    }

    showModal(title, content, buttons = null) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            backdrop-filter: blur(5px);
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 2rem;
            border-radius: 15px;
            max-width: 400px;
            margin: 1rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            text-align: center;
        `;
        
        modalContent.innerHTML = `
            <h2 style="color: var(--color-primary); margin-bottom: 1rem;">${title}</h2>
            <div style="margin-bottom: 1.5rem; text-align: left;">${content}</div>
        `;
        
        if (buttons) {
            const buttonContainer = document.createElement('div');
            buttonContainer.style.cssText = 'display: flex; gap: 1rem; justify-content: center;';
            
            buttons.forEach(button => {
                const btn = document.createElement('button');
                btn.textContent = button.text;
                btn.style.cssText = `
                    padding: 0.75rem 1.5rem;
                    border: none;
                    border-radius: 25px;
                    cursor: pointer;
                    font-weight: 600;
                    background: var(--color-primary);
                    color: white;
                    transition: all 0.3s ease;
                `;
                btn.addEventListener('click', button.action);
                buttonContainer.appendChild(btn);
            });
            
            modalContent.appendChild(buttonContainer);
        } else {
            const closeBtn = document.createElement('button');
            closeBtn.textContent = 'Đóng';
            closeBtn.style.cssText = `
                padding: 0.75rem 1.5rem;
                border: none;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 600;
                background: var(--color-primary);
                color: white;
                transition: all 0.3s ease;
            `;
            closeBtn.addEventListener('click', () => modal.remove());
            modalContent.appendChild(closeBtn);
        }
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        return modal;
    }
}

// Initialize PWA installer when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new PWAInstaller();
    });
} else {
    new PWAInstaller();
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            transform: translateY(100px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .pwa-install-button:active {
        transform: translateY(1px) !important;
    }
`;
document.head.appendChild(style);