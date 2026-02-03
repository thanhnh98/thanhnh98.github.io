/**
 * App intro section: QR images (Android / iOS), click to open zoom modal.
 */
(function () {
    function init() {
        var modal = document.getElementById('app-intro-qr-modal');
        var modalImg = document.getElementById('app-intro-qr-modal-img');
        var modalTitle = document.getElementById('app-intro-qr-modal-title');
        var modalBackdrop = modal && modal.querySelector('.app-intro-qr-modal-backdrop');
        var modalClose = modal && modal.querySelector('.app-intro-qr-modal-close');

        if (!modal || !modalImg || !modalTitle) return;

        function getTitleForLabel(label) {
            if (label === 'Google Play') return 'Tải ứng dụng Sắp Tết trên Android';
            if (label === 'App Store') return 'Tải ứng dụng Sắp Tết trên iOS';
            return 'Tải ứng dụng Sắp Tết';
        }

        function openZoom(imageSrc, label) {
            modalImg.src = imageSrc;
            modalImg.alt = label;
            modalTitle.textContent = getTitleForLabel(label);
            modal.classList.add('is-open');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }

        function closeZoom() {
            modal.classList.remove('is-open');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }

        document.querySelectorAll('.app-intro-qr-item').forEach(function (btn) {
            var imageSrc = btn.getAttribute('data-image');
            var label = btn.getAttribute('data-label') || 'QR';
            if (imageSrc) {
                btn.addEventListener('click', function () { openZoom(imageSrc, label); });
            }
        });

        if (modalBackdrop) modalBackdrop.addEventListener('click', closeZoom);
        if (modalClose) modalClose.addEventListener('click', closeZoom);
        modal.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal.classList.contains('is-open')) closeZoom();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
