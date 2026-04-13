
(function () {
    const trigger = document.querySelector('.footer-trigger');
    const pwOverlay = document.getElementById('pwOverlay');
    const pwBox = document.getElementById('pwBox');
    const pwForm = document.getElementById('pwForm');
    const pwInput = document.getElementById('pwInput');
    const pwError = document.getElementById('pwError');
    const pwGifWrap = document.getElementById('pwGifWrap');
    const pwCancel = document.getElementById('pwCancel');
    const classified = document.getElementById('classifiedModal');
    const classClose = classified?.querySelector('.classified-close');

    if (!trigger || !pwOverlay || !classified) return;

    let triggerClicks = 0;
    let triggerTimer;

    function normalizeAttempt(value) {
        return value.trim().toLowerCase().replace(/[\s_-]+/g, '');
    }

    function forgeAccessCode() {
        const num = parseInt("1010011010", 2);
        const word = atob("ZGlnaXRhbHpvbw==");
        return num + word;
    }

    // ── Triple clic sur © pour ouvrir le terminal ──
    trigger.addEventListener('click', () => {
        clearTimeout(triggerTimer);
        triggerClicks++;
        if (triggerClicks >= 3) {
            triggerClicks = 0;
            openPw();
        } else {
            triggerTimer = setTimeout(() => { triggerClicks = 0; }, 2000);
        }
    });

    function openPw() {
        pwInput.value = '';
        pwError.textContent = '';
        pwGifWrap?.classList.remove('visible');
        pwGifWrap?.setAttribute('aria-hidden', 'true');
        pwOverlay.classList.add('open');
        pwOverlay.removeAttribute('aria-hidden');
        document.body.style.overflow = 'hidden';
        setTimeout(() => pwInput.focus(), 350);
    }

    function closePw() {
        pwOverlay.classList.remove('open');
        pwOverlay.setAttribute('aria-hidden', 'true');
        pwGifWrap?.classList.remove('visible');
        pwGifWrap?.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // ── Vérification du mot de passe ──
    pwForm.addEventListener('submit', e => {
        e.preventDefault();
        const val = normalizeAttempt(pwInput.value);

        if (val === forgeAccessCode()) {
            closePw();
            setTimeout(openClassified, 200);
        } else {
            pwError.textContent = '// ACCÈS REFUSÉ — Code invalide';
            pwGifWrap?.classList.add('visible');
            pwGifWrap?.setAttribute('aria-hidden', 'false');
            pwBox.classList.remove('shake');
            void pwBox.offsetWidth; // reset animation
            pwBox.classList.add('shake');
            pwInput.value = '';
            pwInput.focus();
        }
    });

    pwCancel?.addEventListener('click', closePw);
    pwOverlay.addEventListener('click', e => { if (e.target === pwOverlay) closePw(); });

    // ── Ouverture du dossier classifié ──
    function openClassified() {
        classified.classList.add('open');
        classified.removeAttribute('aria-hidden');
        classified.scrollTop = 0;
        document.body.style.overflow = 'hidden';
        classClose?.focus();
    }

    function closeClassified() {
        classified.classList.remove('open');
        classified.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    classClose?.addEventListener('click', closeClassified);
    classified.addEventListener('click', e => { if (e.target === classified) closeClassified(); });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            if (classified.classList.contains('open')) closeClassified();
            else if (pwOverlay.classList.contains('open')) closePw();
        }
    });
})();

// ── Easter Egg : 5 clics sur le logo ──
(function () {
    const logo = document.querySelector('.logo');
    const modal = document.getElementById('easterModal');
    const closeBtn = modal?.querySelector('.easter-close');
    const previewModal = document.getElementById('easterPreviewModal');
    const previewImage = document.getElementById('easterPreviewImage');
    const previewCaption = document.getElementById('easterPreviewCaption');
    const previewCloseBtn = previewModal?.querySelector('.easter-preview-close');
    const zooModal = document.getElementById('zooModal');
    const zooCloseBtn = zooModal?.querySelector('.zoo-close');
    const zooInput = document.getElementById('zooNameInput');
    const zooSubmit = document.getElementById('zooSubmit');
    const zooResult = document.getElementById('zooResult');
    const zooResultImage = document.getElementById('zooResultImage');
    const zooResultMessage = document.getElementById('zooResultMessage');
    const easterFigures = modal?.querySelectorAll('.easter-figure[role="button"]');
    if (!logo || !modal || !previewModal || !previewImage || !previewCaption || !zooModal || !zooInput || !zooSubmit || !zooResult || !zooResultImage || !zooResultMessage) return;

    let clicks = 0;
    let resetTimer;
    const zooProfiles = {
        arnaud: {
            image: 'https://res.cloudinary.com/de3xvrrq5/image/upload/v1776071990/animal_arnaud_kyhkkz.jpg',
            message: 'Arnaud reconnu'
        },
        jeremy: {
            image: 'https://res.cloudinary.com/de3xvrrq5/image/upload/v1776071489/animal_jeremy_jkkc4s.webp',
            message: 'Jeremy reconnu'
        },
        remy: {
            image: 'https://res.cloudinary.com/de3xvrrq5/image/upload/v1776071489/animal_r%C3%A9my_ykvzma.jpg',
            message: 'Rémy reconnu'
        },
        dimos: {
            image: 'https://res.cloudinary.com/de3xvrrq5/image/upload/v1776071989/animal_dimos_c3agej.jpg',
            message: 'Dimos reconnu'
        },
        valentin: {
            image: 'https://res.cloudinary.com/de3xvrrq5/image/upload/v1776071489/animal-valentin_qquohe.jpg',
            message: 'Valentin reconnu'
        },
        quentin: {
            image: 'https://res.cloudinary.com/de3xvrrq5/image/upload/v1776071489/animal_quentin_zu3etv.webp',
            message: 'Quentin reconnu'
        },
        maximederveaux: {
            image: 'https://res.cloudinary.com/de3xvrrq5/image/upload/v1776071489/animal-maxime-derveaux_1_mokcwd.jpg',
            message: 'Maxime reconnu'
        },
        maximederonne: {
            image: 'https://res.cloudinary.com/de3xvrrq5/image/upload/v1776071489/animal-maxime-deronne_dvdjxn.jpg',
            message: 'Maxime reconnu'
        },
        mateo: {
            image: 'https://res.cloudinary.com/de3xvrrq5/image/upload/v1776071489/animal_mat%C3%A9o_2_uauzuy.jpg',
            message: 'Matéo reconnu'
        },
        antoine: {
            image: 'https://res.cloudinary.com/de3xvrrq5/image/upload/v1776071489/animal-antoine_1_hiymqv.jpg',
            message: 'Antoine reconnu'
        },
        remybar: {
            image: 'https://res.cloudinary.com/de3xvrrq5/image/upload/v1776071490/r%C3%A9my_plus_hpbahi.webp',
            message: 'Rémy plus reconnu'
        },
        jeremybar: {
            image: 'https://res.cloudinary.com/de3xvrrq5/image/upload/v1776071490/jeremy_plus_evuwxj.webp',
            message: 'Jeremy plus reconnu'
        },
        valentinbar: {
            image: 'https://res.cloudinary.com/de3xvrrq5/image/upload/v1776071490/valentin_plus_jun1df.webp',
            message: 'Valentin plus reconnu'
        }


    };
    const invalidIllustration = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540">
            <defs>
                <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stop-color="#25110f"/>
                    <stop offset="100%" stop-color="#5f1313"/>
                </linearGradient>
            </defs>
            <rect width="960" height="540" rx="28" fill="url(#bg)"/>
            <rect x="54" y="54" width="852" height="432" rx="20" fill="none" stroke="#ffb3b3" stroke-width="8" stroke-dasharray="18 14"/>
            <circle cx="480" cy="214" r="86" fill="#170808" stroke="#ff8d8d" stroke-width="12"/>
            <path d="M436 170l88 88M524 170l-88 88" stroke="#ff8d8d" stroke-width="16" stroke-linecap="round"/>
            <text x="480" y="368" text-anchor="middle" fill="#fff0f0" font-family="Arial, sans-serif" font-size="54" letter-spacing="6">INVALIDE</text>
            <text x="480" y="426" text-anchor="middle" fill="#ffb3b3" font-family="Arial, sans-serif" font-size="26" letter-spacing="3">profil introuvable</text>
        </svg>
    `)}`;

    logo.addEventListener('click', () => {
        clearTimeout(resetTimer);
        clicks++;

        // Feedback visuel : petit rebond
        logo.style.transform = 'scale(1.18)';
        logo.style.textShadow = `0 0 ${clicks * 6}px rgba(217,170,95,${clicks * 0.18})`;
        setTimeout(() => {
            logo.style.transform = '';
            logo.style.textShadow = '';
        }, 180);

        if (clicks >= 5) {
            clicks = 0;
            openEaster();
        } else {
            // Réinitialise après 3s d'inactivité
            resetTimer = setTimeout(() => { clicks = 0; }, 3000);
        }
    });

    function syncBodyScrollLock() {
        const hasOpenModal =
            modal.classList.contains('open') ||
            previewModal.classList.contains('open') ||
            zooModal.classList.contains('open');
        document.body.style.overflow = hasOpenModal ? 'hidden' : '';
    }

    function normalizeName(value) {
        return value
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    }

    function openPreview(figure) {
        const src = figure.dataset.easterSrc;
        if (!src) return;

        previewImage.src = src;
        previewImage.alt = figure.dataset.easterAlt || '';
        previewCaption.textContent = figure.dataset.easterCaption || '';
        previewModal.classList.add('open');
        previewModal.removeAttribute('aria-hidden');
        syncBodyScrollLock();
        previewCloseBtn?.focus();
    }

    function closePreview(returnFocus = true) {
        previewModal.classList.remove('open');
        previewModal.setAttribute('aria-hidden', 'true');
        previewImage.src = '';
        previewImage.alt = '';
        previewCaption.textContent = '';
        syncBodyScrollLock();
        if (returnFocus) closeBtn?.focus();
    }

    function resetZooResult() {
        zooResult.hidden = true;
        zooResult.classList.remove('is-invalid');
        zooResultImage.src = '';
        zooResultImage.alt = '';
        zooResultMessage.textContent = '';
    }

    function openZoo() {
        resetZooResult();
        zooInput.value = '';
        zooModal.classList.add('open');
        zooModal.removeAttribute('aria-hidden');
        syncBodyScrollLock();
        zooInput.focus();
    }

    function closeZoo(returnFocus = true) {
        zooModal.classList.remove('open');
        zooModal.setAttribute('aria-hidden', 'true');
        resetZooResult();
        syncBodyScrollLock();
        if (returnFocus) closeBtn?.focus();
    }

    function handleZooSubmit() {
        const normalizedName = normalizeName(zooInput.value);
        const match = zooProfiles[normalizedName];

        zooResult.hidden = false;

        if (match) {
            zooResult.classList.remove('is-invalid');
            zooResultImage.src = match.image;
            zooResultImage.alt = normalizedName;
            zooResultMessage.textContent = match.message;
            return;
        }

        zooResult.classList.add('is-invalid');
        zooResultImage.src = invalidIllustration;
        zooResultImage.alt = 'Invalide';
        zooResultMessage.textContent = 'Invalide';
    }

    function openEaster() {
        modal.classList.add('open');
        modal.removeAttribute('aria-hidden');
        modal.scrollTop = 0;
        syncBodyScrollLock();
        closeBtn?.focus();
    }

    function closeEaster() {
        closePreview(false);
        closeZoo(false);
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        syncBodyScrollLock();
        logo.focus();
    }

    closeBtn?.addEventListener('click', closeEaster);
    previewCloseBtn?.addEventListener('click', () => closePreview());
    zooCloseBtn?.addEventListener('click', () => closeZoo());
    zooSubmit.addEventListener('click', handleZooSubmit);
    zooInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleZooSubmit();
        }
    });

    easterFigures?.forEach(figure => {
        const openFigure = () => {
            if (figure.dataset.easterAction === 'zoo') {
                openZoo();
                return;
            }

            openPreview(figure);
        };

        figure.addEventListener('click', openFigure);
        figure.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openFigure();
            }
        });
    });

    // Clic en dehors du contenu
    modal.addEventListener('click', e => {
        if (e.target === modal) closeEaster();
    });
    previewModal.addEventListener('click', e => {
        if (e.target === previewModal) closePreview();
    });
    zooModal.addEventListener('click', e => {
        if (e.target === zooModal) closeZoo();
    });

    // Touche Échap
    document.addEventListener('keydown', e => {
        if (e.key !== 'Escape') return;
        if (previewModal.classList.contains('open')) {
            closePreview();
            return;
        }
        if (zooModal.classList.contains('open')) {
            closeZoo();
            return;
        }
        if (modal.classList.contains('open')) closeEaster();
    });
})();

// ── Smooth scroll ──
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ── Hamburger menu ──
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        hamburger.classList.toggle('active', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
}

// ── Scroll reveal ──
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Carousel ──
function initCarousel() {
    const viewport = document.querySelector('.carousel-viewport');
    if (!viewport) return;

    const cards = [...viewport.querySelectorAll('.carousel-card')];
    const prevBtn = document.querySelector('.carousel-btn--prev');
    const nextBtn = document.querySelector('.carousel-btn--next');
    const dotsContainer = document.querySelector('.carousel-dots');

    let current = 0;

    function visibleCount() {
        if (window.innerWidth < 480) return 1;
        if (window.innerWidth < 960) return 2;
        return 3;
    }

    function maxIndex() {
        return Math.max(0, cards.length - visibleCount());
    }

    function updateUI() {
        if (prevBtn) prevBtn.disabled = current === 0;
        if (nextBtn) nextBtn.disabled = current >= maxIndex();
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function goTo(i) {
        current = Math.max(0, Math.min(i, maxIndex()));
        const card = cards[current];
        const vpRect = viewport.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();
        viewport.scrollTo({
            left: viewport.scrollLeft + (cardRect.left - vpRect.left),
            behavior: 'smooth'
        });
        updateUI();
    }

    // Dots
    const dots = [];
    function buildDots() {
        dotsContainer.innerHTML = '';
        dots.length = 0;
        const count = maxIndex() + 1;
        for (let i = 0; i < count; i++) {
            const btn = document.createElement('button');
            btn.className = 'carousel-dot' + (i === 0 ? ' active' : '');
            btn.setAttribute('aria-label', `Slide ${i + 1}`);
            btn.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(btn);
            dots.push(btn);
        }
        updateUI();
    }

    prevBtn?.addEventListener('click', () => goTo(current - 1));
    nextBtn?.addEventListener('click', () => goTo(current + 1));

    // Swipe
    let sx = 0;
    viewport.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
    viewport.addEventListener('touchend', e => {
        const dx = sx - e.changedTouches[0].clientX;
        if (dx > 50) goTo(current + 1);
        else if (dx < -50) goTo(current - 1);
    }, { passive: true });

    // Sync dots when user scrolls manually
    viewport.addEventListener('scroll', () => {
        const vpLeft = viewport.getBoundingClientRect().left;
        let closest = 0, minDist = Infinity;
        cards.forEach((card, i) => {
            const dist = Math.abs(card.getBoundingClientRect().left - vpLeft);
            if (dist < minDist) { minDist = dist; closest = i; }
        });
        const clamped = Math.min(closest, maxIndex());
        if (clamped !== current) { current = clamped; updateUI(); }
    }, { passive: true });

    // Resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            current = Math.min(current, maxIndex());
            buildDots();
            goTo(current);
        }, 150);
    });

    buildDots();
}

initCarousel();

// ── Hide hero scroll indicator on scroll ──
const heroScroll = document.querySelector('.hero-scroll');
if (heroScroll) {
    window.addEventListener('scroll', () => {
        heroScroll.style.opacity = window.scrollY > 80 ? '0' : '1';
    }, { passive: true });
}

// â”€â”€ About market ticker â”€â”€
function initAboutTicker() {
    const track = document.getElementById('aboutMarketTrack');
    if (!track) return;

    const marketData = [
        { symbol: 'REPT', label: 'Reptilerie', price: 37.58, changePercent: 8.4, currency: 'EUR' },

        // 🇫🇷 CAC 40
        { symbol: 'MC', label: 'LVMH', price: 780.50, changePercent: 1.2, currency: 'EUR' },
        { symbol: 'TTE', label: 'TotalEnergies', price: 64.20, changePercent: -0.8, currency: 'EUR' },
        { symbol: 'AI', label: 'Air Liquide', price: 175.30, changePercent: 0.6, currency: 'EUR' },
        { symbol: 'SGO', label: 'Saint-Gobain', price: 72.80, changePercent: 1.5, currency: 'EUR' },
        { symbol: 'OR', label: 'L’Oréal', price: 430.10, changePercent: -0.3, currency: 'EUR' },
        { symbol: 'BNP', label: 'BNP Paribas', price: 66.40, changePercent: 0.9, currency: 'EUR' },
        { symbol: 'SAN', label: 'Sanofi', price: 92.15, changePercent: -0.5, currency: 'EUR' },

        // 🇺🇸 Tech US
        { symbol: 'NVDA', label: 'NVIDIA', price: 890.00, changePercent: 2.4, currency: 'USD' },
        { symbol: 'AAPL', label: 'Apple', price: 175.60, changePercent: 0.7, currency: 'USD' },
        { symbol: 'MSFT', label: 'Microsoft', price: 420.30, changePercent: 1.1, currency: 'USD' },
        { symbol: 'GOOGL', label: 'Alphabet', price: 155.40, changePercent: -0.2, currency: 'USD' },
        { symbol: 'AMZN', label: 'Amazon', price: 185.90, changePercent: 0.4, currency: 'USD' },
        { symbol: 'META', label: 'Meta', price: 510.20, changePercent: 1.8, currency: 'USD' },
        { symbol: 'TSLA', label: 'Tesla', price: 170.80, changePercent: -1.5, currency: 'USD' },

        // 🏦 Finance / autres US
        { symbol: 'JPM', label: 'JPMorgan Chase', price: 195.30, changePercent: 0.5, currency: 'USD' },
        { symbol: 'V', label: 'Visa', price: 275.10, changePercent: 0.9, currency: 'USD' },
        { symbol: 'WMT', label: 'Walmart', price: 60.20, changePercent: 0.3, currency: 'USD' },

        // 📊 Indices
        { symbol: 'CAC40', label: 'CAC 40', price: 8050.00, changePercent: 0.6, currency: 'EUR' },
        { symbol: 'SP500', label: 'S&P 500', price: 5200.00, changePercent: 0.8, currency: 'USD' },
        { symbol: 'NASDAQ', label: 'NASDAQ 100', price: 18200.00, changePercent: 1.2, currency: 'USD' },
        { symbol: 'DAX', label: 'DAX', price: 18250.00, changePercent: 0.4, currency: 'EUR' },

        // 📦 ETF connus
        { symbol: 'CW8', label: 'Amundi MSCI World', price: 460.00, changePercent: 0.7, currency: 'EUR' },
        { symbol: 'EWLD', label: 'Lyxor MSCI World', price: 32.50, changePercent: 0.6, currency: 'EUR' },
        { symbol: 'SPY', label: 'SPDR S&P 500 ETF', price: 520.00, changePercent: 0.8, currency: 'USD' },
        { symbol: 'QQQ', label: 'Invesco Nasdaq ETF', price: 445.00, changePercent: 1.1, currency: 'USD' },
        { symbol: 'VEA', label: 'Vanguard FTSE Dev', price: 50.30, changePercent: 0.5, currency: 'USD' },

        // 🪙 Bonus (un peu crypto pour le fun)
        { symbol: 'BTC', label: 'Bitcoin', price: 68000.00, changePercent: 2.1, currency: 'USD' },
        { symbol: 'ETH', label: 'Ethereum', price: 3200.00, changePercent: 1.7, currency: 'USD' }
    ];

    function formatPrice(value, currency) {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    }

    function formatDelta(value) {
        if (!Number.isFinite(value) || value === 0) return '0,00%';
        const sign = value > 0 ? '+' : '';
        return `${sign}${value.toFixed(2).replace('.', ',')}%`;
    }

    function chipMarkup(item) {
        const trendClass = item.changePercent > 0 ? 'is-up' : item.changePercent < 0 ? 'is-down' : 'is-flat';
        const arrow = item.changePercent > 0 ? '▲' : item.changePercent < 0 ? '▼' : '—';
        return `<span class="about-market-chip ${trendClass}"><span class="amc-sym">${item.symbol}</span><span class="amc-lbl">${item.label}</span><span class="amc-prc">${formatPrice(item.price, item.currency)}</span><span class="amc-dlt">${arrow}&nbsp;${formatDelta(item.changePercent)}</span></span>`;
    }

    function render(items) {
        const markup = items.map(chipMarkup).join('');
        track.innerHTML = markup + markup;
    }

    render(marketData);
}

initAboutTicker();
