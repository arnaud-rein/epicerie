
(function () {
    const trigger = document.querySelector('.footer-trigger');
    const pwOverlay = document.getElementById('pwOverlay');
    const pwBox = document.getElementById('pwBox');
    const pwForm = document.getElementById('pwForm');
    const pwInput = document.getElementById('pwInput');
    const pwError = document.getElementById('pwError');
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
        const whisper = ['p', String.fromCharCode(111)];
        const impact = String.fromCharCode(96 + 3);
        const mark = `${1 + 2}`;
        return whisper[0].concat(whisper[1], impact, mark);
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
        pwOverlay.classList.add('open');
        pwOverlay.removeAttribute('aria-hidden');
        document.body.style.overflow = 'hidden';
        setTimeout(() => pwInput.focus(), 350);
    }

    function closePw() {
        pwOverlay.classList.remove('open');
        pwOverlay.setAttribute('aria-hidden', 'true');
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
            pwBox.classList.remove('shake');
            void pwBox.offsetWidth; // reset animation
            pwBox.classList.add('shake');
            pwInput.value = '';
            pwInput.focus();
            setTimeout(() => { pwError.textContent = ''; }, 2500);
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
    if (!logo || !modal) return;

    let clicks = 0;
    let resetTimer;

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

    function openEaster() {
        modal.classList.add('open');
        modal.removeAttribute('aria-hidden');
        modal.scrollTop = 0;
        document.body.style.overflow = 'hidden';
        closeBtn?.focus();
    }

    function closeEaster() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        logo.focus();
    }

    closeBtn?.addEventListener('click', closeEaster);

    // Clic en dehors du contenu
    modal.addEventListener('click', e => {
        if (e.target === modal) closeEaster();
    });

    // Touche Échap
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.classList.contains('open')) closeEaster();
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
        { symbol: 'REPT', label: 'Reptilerie', price: 24.78, changePercent: 8.4, currency: 'EUR' },
        { symbol: 'MDLN', label: 'Madeleine Prime', price: 5.0, changePercent: 3.2, currency: 'EUR' },
        { symbol: 'WAHO', label: 'Crepes Wahoo', price: 3.84, changePercent: -1.1, currency: 'EUR' },
        { symbol: 'GALT', label: 'Galettes St Michel', price: 4.92, changePercent: 1.7, currency: 'EUR' },
        { symbol: 'RITA', label: 'Gaufres Rita', price: 4.35, changePercent: 0.6, currency: 'EUR' }
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
