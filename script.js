/* ════════════════════════════════
   script.js — Portfolio Interactions
   ════════════════════════════════ */

'use strict';

/* ─── LOADER ─── */
(function initLoader() {
  const loader   = document.getElementById('loader');
  const fill     = document.getElementById('loader-fill');
  const status   = document.getElementById('loader-status');
  const messages = [
    'Loading security protocols...',
    'Scanning for vulnerabilities...',
    'Decrypting payload...',
    'Establishing secure connection...',
    'Portfolio ready.',
  ];
  let pct = 0;
  let msgIdx = 0;

  const iv = setInterval(() => {
    pct += Math.random() * 15 + 5;
    if (pct >= 100) { pct = 100; clearInterval(iv); }
    fill.style.width = pct + '%';
    msgIdx = Math.min(Math.floor(pct / 25), messages.length - 1);
    status.textContent = messages[msgIdx];

    if (pct === 100) {
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
        startCounters();
        revealElements();
      }, 600);
    }
  }, 120);

  document.body.style.overflow = 'hidden';
})();

/* ─── MATRIX RAIN ─── */
(function initMatrix() {
  const canvas = document.getElementById('matrix-canvas');
  const ctx    = canvas.getContext('2d');
  let   cols, drops, raf;
  const chars  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?/\\~`!';

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.floor(canvas.width / 16);
    drops = new Array(cols).fill(1);
  }

  function draw() {
    ctx.fillStyle = 'rgba(2,11,20,0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00e6ff';
    ctx.font = '13px Share Tech Mono, monospace';
    drops.forEach((y, i) => {
      const c = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(c, i * 16, y * 16);
      if (y * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
    raf = requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', () => { resize(); });
})();

/* ─── CUSTOM CURSOR ─── */
(function initCursor() {
  const cur = document.getElementById('cursor');
  const fol = document.getElementById('cursor-follower');
  if (!cur || !fol) return;

  let mx = -200, my = -200;
  let fx = -200, fy = -200;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + 'px';
    cur.style.top  = my + 'px';
  });

  function loop() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    fol.style.left = fx + 'px';
    fol.style.top  = fy + 'px';
    requestAnimationFrame(loop);
  }
  loop();

  document.querySelectorAll('a, button, .skill-card, .project-card, .tool-item').forEach(el => {
    el.addEventListener('mouseenter', () => { cur.classList.add('hovered'); fol.classList.add('hovered'); });
    el.addEventListener('mouseleave', () => { cur.classList.remove('hovered'); fol.classList.remove('hovered'); });
  });
})();

/* ─── NAVBAR ─── */
(function initNav() {
  const navbar = document.getElementById('navbar');
  const ham    = document.getElementById('hamburger');
  const links  = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveLink();
  });

  ham.addEventListener('click', () => {
    links.classList.toggle('open');
    const spans = ham.querySelectorAll('span');
    if (links.classList.contains('open')) {
      spans[0].style.cssText = 'transform:rotate(45deg) translate(5px,5px)';
      spans[1].style.opacity = '0';
      spans[2].style.cssText = 'transform:rotate(-45deg) translate(5px,-5px)';
    } else {
      spans.forEach(s => (s.style.cssText = ''));
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => { links.classList.remove('open'); });
  });
})();

/* ─── ACTIVE NAV ON SCROLL ─── */
function updateActiveLink() {
  const sections = ['home', 'about', 'skills', 'projects', 'contact'];
  const scrollY  = window.scrollY + 150;
  sections.forEach(id => {
    const sec  = document.getElementById(id);
    const link = document.querySelector(`.nav-link[data-section="${id}"]`);
    if (!sec || !link) return;
    if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}

/* ─── TYPEWRITER ─── */
(function initTypewriter() {
  const el    = document.getElementById('typewriter');
  if (!el) return;
  const texts = [
    'Cybersecurity Analyst',
    'Digital Forensics Investigator',
    'Ethical Hacker',
    'Malware Analyst',
    'Software Engineer',
    'Penetration Tester',
  ];
  let ti = 0, ci = 0, deleting = false;

  function type() {
    const full = texts[ti];
    if (!deleting) {
      el.textContent = full.slice(0, ++ci);
      if (ci === full.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
      el.textContent = full.slice(0, --ci);
      if (ci === 0) { deleting = false; ti = (ti + 1) % texts.length; }
    }
    setTimeout(type, deleting ? 55 : 95);
  }
  setTimeout(type, 1200);
})();

/* ─── COUNTER ANIMATION ─── */
function startCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    let   cur    = 0;
    const step   = Math.ceil(target / 50);
    const iv     = setInterval(() => {
      cur += step;
      if (cur >= target) { cur = target; clearInterval(iv); }
      el.textContent = cur;
    }, 40);
  });
}

/* ─── SCROLL REVEAL ─── */
function revealElements() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        animateSkillBars(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => io.observe(el));
}

function animateSkillBars(container) {
  const fills = container.querySelectorAll ? container.querySelectorAll('.skill-fill') : [];
  fills.forEach(f => { f.style.width = f.dataset.pct + '%'; });

  const langFills = container.querySelectorAll ? container.querySelectorAll('.lang-fill') : [];
  langFills.forEach(f => { f.style.width = f.style.getPropertyValue('--w') || '0%'; });
}

/* also trigger on tab switch */
function animateAllVisibleBars() {
  document.querySelectorAll('.skill-fill').forEach(f => {
    const card = f.closest('.skill-card');
    if (card && card.offsetParent !== null) f.style.width = f.dataset.pct + '%';
  });
  document.querySelectorAll('.lang-fill').forEach(f => {
    const card = f.closest('.lang-card');
    if (card && card.offsetParent !== null) {
      const w = getComputedStyle(f).getPropertyValue('--w');
      f.style.width = w;
    }
  });
}

/* ─── SKILL TABS ─── */
(function initTabs() {
  const btns     = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.tab-content');
  const grid     = document.querySelector('.skills-grid');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      btns.forEach(b => b.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.getElementById('tab-' + target);
      if (panel) {
        panel.classList.add('active');
        // Re-reveal items inside the newly shown panel
        panel.querySelectorAll('.reveal-up').forEach(el => {
          el.classList.remove('visible');
          setTimeout(() => el.classList.add('visible'), 50);
        });
        setTimeout(animateAllVisibleBars, 100);
      }
    });
  });
})();

/* ─── PROJECT FILTERS ─── */
(function initFilters() {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !match);
        if (match) {
          card.classList.remove('visible');
          setTimeout(() => card.classList.add('visible'), 50);
        }
      });
    });
  });
})();

/* ─── SMOOTH SCROLL ─── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ─── CONTACT FORM ─── */
(function initForm() {
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  const btn     = document.getElementById('submit-btn');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    // Validate
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = 'var(--clr-red)';
        valid = false;
        field.addEventListener('input', () => { field.style.borderColor = ''; }, { once: true });
      }
    });
    if (!valid) return;

    // Simulate send
    const btnText    = btn.querySelector('.btn-text');
    const btnLoading = btn.querySelector('.btn-loading');
    btn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'flex';

    setTimeout(() => {
      btn.disabled = false;
      btnText.style.display = 'flex';
      btnLoading.style.display = 'none';
      success.style.display = 'block';
      form.reset();
      setTimeout(() => { success.style.display = 'none'; }, 6000);
    }, 2200);
  });
})();

/* ─── PARALLAX HERO ─── */
(function initParallax() {
  const heroBg = document.querySelector('.hero-bg-image');
  if (!heroBg) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroBg.style.transform = `translateY(${y * 0.4}px)`;
  }, { passive: true });
})();

/* ─── TILT EFFECT ON CARDS ─── */
(function initTilt() {
  document.querySelectorAll('.project-card, .skill-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.width  / 2;
      const cy     = rect.height / 2;
      const dx     = (e.clientX - rect.left - cx) / cx;
      const dy     = (e.clientY - rect.top  - cy) / cy;
      card.style.transform = `perspective(800px) rotateY(${dx * 6}deg) rotateX(${-dy * 6}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ─── FLOATING BADGES INTERACTIVE ─── */
(function initBadgeParallax() {
  const badges = document.querySelectorAll('.badge');
  if (!badges.length) return;
  document.addEventListener('mousemove', e => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    badges.forEach((b, i) => {
      const factor = (i % 2 === 0 ? 1 : -1) * 0.015;
      const dx = (e.clientX - cx) * factor;
      const dy = (e.clientY - cy) * factor;
      b.style.transform = `translate(${dx}px, ${dy}px)`;
    });
  });
})();

/* ─── PAGE PARTICLE STARS ─── */
(function initStars() {
  const container = document.querySelector('.hero-section');
  if (!container) return;
  for (let i = 0; i < 50; i++) {
    const star = document.createElement('div');
    star.style.cssText = `
      position:absolute;
      width:${Math.random() * 2 + 1}px;
      height:${Math.random() * 2 + 1}px;
      background:rgba(0,230,255,${Math.random() * 0.5 + 0.1});
      border-radius:50%;
      top:${Math.random() * 100}%;
      left:${Math.random() * 100}%;
      animation: pulse ${Math.random() * 3 + 2}s ease-in-out infinite;
      animation-delay:${Math.random() * 3}s;
      pointer-events:none; z-index:0;
    `;
    container.appendChild(star);
  }
})();
