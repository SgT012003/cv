// ============================================
// VICTOR DIDOFF — PORTFOLIO INTERACTIONS
// Inspired by Antigravity.google effects
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  // ---- MOBILE MENU ----
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      mobileMenu.classList.toggle('open');
      const icon = menuToggle.querySelector('.material-icons');
      icon.textContent = mobileMenu.classList.contains('open') ? 'close' : 'menu';
    });
  }

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      if (mobileMenu && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        const icon = menuToggle.querySelector('.material-icons');
        icon.textContent = 'menu';
      }
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // ---- SCROLL: ACTIVE NAV LINK ----
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      const link = document.querySelector('.nav-link[href*="' + sectionId + '"]');
      if (!link) return;

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // ---- SCROLL: HEADER EFFECT ----
  const header = document.getElementById('header');
  function updateHeader() {
    if (!header) return;
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  // ---- SCROLL REVEAL ANIMATIONS ----
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---- MOUSE FOLLOWER (Antigravity-inspired) ----
  const follower = document.querySelector('.mouse-follower');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;
  let isMouseOnPage = false;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMouseOnPage = true;
    if (follower) follower.style.opacity = '0.8';
  });

  document.addEventListener('mouseleave', () => {
    isMouseOnPage = false;
    if (follower) follower.style.opacity = '0';
  });

  // Interactive element hover effect
  const interactiveElements = document.querySelectorAll('a, button, .card, .project-card, .contact-card, .timeline__card');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (follower) follower.classList.add('hovering-interactive');
    });
    el.addEventListener('mouseleave', () => {
      if (follower) follower.classList.remove('hovering-interactive');
    });
  });

  function animateFollower() {
    if (follower && isMouseOnPage) {
      // Smooth lerp
      followerX += (mouseX - followerX) * 0.08;
      followerY += (mouseY - followerY) * 0.08;
      follower.style.transform = `translate(${followerX - 250}px, ${followerY - 250}px)`;
    }
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // ---- PARALLAX ORBS ----
  const parallaxOrbs = document.querySelectorAll('[data-parallax]');
  function updateParallax() {
    const scrollY = window.scrollY;
    parallaxOrbs.forEach(orb => {
      const speed = parseFloat(orb.dataset.parallax) || 0.02;
      orb.style.transform = `translateY(${scrollY * speed * 100}px)`;
    });
  }

  // ---- MAGNETIC BUTTONS (Antigravity-inspired) ----
  const magneticButtons = document.querySelectorAll('.btn');
  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });

  // ---- SCROLL HANDLER ----
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActiveNav();
        updateHeader();
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initial calls
  updateActiveNav();
  updateHeader();
  updateParallax();

  // ---- PROGRESS BAR & SEMESTER ----
  // Course: 8 semesters, Aug 2023 – Jun 2027
  // Semester calendar (FIAP):
  //   1st half:  Aug – Dec
  //   2nd half:  Feb – Jun
  const progressBar = document.getElementById('progress-bar');
  const progressPercentage = document.getElementById('progress-percentage');
  const currentSemester = document.getElementById('current-semester');
  const TOTAL_SEMESTERS = 8;
  const now = new Date();

  // Each entry: [startYear, startMonth (0-indexed)]
  const semesterStarts = [
    [2023, 7],  // 1º sem – Aug 2023  (Y1S1)
    [2024, 1],  // 2º sem – Feb 2024  (Y1S2)
    [2024, 7],  // 3º sem – Aug 2024  (Y2S1)
    [2025, 1],  // 4º sem – Feb 2025  (Y2S2)
    [2025, 7],  // 5º sem – Aug 2025  (Y3S1)
    [2026, 1],  // 6º sem – Feb 2026  (Y3S2) ← current
    [2026, 7],  // 7º sem – Aug 2026  (Y4S1)
    [2027, 1],  // 8º sem – Feb 2027  (Y4S2)
  ];
  const courseEnd = new Date(2027, 5, 30); // Jun 30, 2027

  // Determine current semester number (1-based)
  let semNum = TOTAL_SEMESTERS; // default to last if past all starts
  for (let i = semesterStarts.length - 1; i >= 0; i--) {
    const [y, m] = semesterStarts[i];
    if (now >= new Date(y, m, 1)) {
      semNum = i + 1;
      break;
    }
  }
  semNum = Math.max(1, Math.min(semNum, TOTAL_SEMESTERS));

  // Progress: completed semesters as percentage
  // If past course end date, show 100%
  let progress;
  if (now >= courseEnd) {
    progress = 100;
  } else {
    // Fraction within current semester
    const [sY, sM] = semesterStarts[semNum - 1];
    const semStart = new Date(sY, sM, 1);
    let semEnd;
    if (semNum < TOTAL_SEMESTERS) {
      const [eY, eM] = semesterStarts[semNum];
      semEnd = new Date(eY, eM, 1);
    } else {
      semEnd = courseEnd;
    }
    const semFraction = Math.max(0, Math.min(1, (now - semStart) / (semEnd - semStart)));
    progress = ((semNum - 1 + semFraction) / TOTAL_SEMESTERS) * 100;
    progress = Math.max(0, Math.min(100, progress));
  }

  if (progressBar) progressBar.style.width = progress.toFixed(1) + '%';
  if (progressPercentage) progressPercentage.textContent = Math.floor(progress);
  if (currentSemester) currentSemester.textContent = semNum + 'º';

  // ---- CURRENT YEAR ----
  const currentYearElement = document.getElementById('current-year');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  // ---- AGE CALCULATION ----
  const ageElements = document.querySelectorAll('.age');
  if (ageElements.length > 0) {
    const birthDate = new Date('2003-03-18');
    let age = now.getFullYear() - birthDate.getFullYear();
    const monthDiff = now.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.getDate())) {
      age--;
    }
    ageElements.forEach(el => { el.textContent = age; });
  }

  // ---- SMOOTH SCROLL for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const targetTop = target.offsetTop - headerHeight - 20;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    });
  });

});
