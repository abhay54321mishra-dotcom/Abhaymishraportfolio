/* ============================================
   ABHAY MISHRA PORTFOLIO — main.js
   ============================================ */

// ---- MOBILE MENU ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu  = document.getElementById('closeMenu');

if (hamburger) {
  hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
}
if (closeMenu) {
  closeMenu.addEventListener('click', () => mobileMenu.classList.remove('open'));
}
if (mobileMenu) {
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}

// ---- PORTFOLIO TABS ----
const tabBtns    = document.querySelectorAll('.tab-btn');
const tabContent = document.querySelectorAll('.tab-content');

if (tabBtns.length > 0) {
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContent.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const activeTab = document.getElementById('tab-' + target);
      if (activeTab) activeTab.classList.add('active');
    });
  });

  // Check URL for tab parameter (from home page discipline links)
  const urlParams = new URLSearchParams(window.location.search);
  const tabParam  = urlParams.get('tab');
  if (tabParam) {
    const matchBtn = document.querySelector(`.tab-btn[data-tab="${tabParam}"]`);
    if (matchBtn) matchBtn.click();
  }
}

// ---- SKILL BARS ANIMATION ----
function animateSkillBars() {
  document.querySelectorAll('.skill-fill').forEach(bar => {
    bar.classList.add('animated');
  });
}

const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillBars();
        skillObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });
  skillObserver.observe(skillsSection);
}

// ---- SCROLL REVEAL (generic) ----
const scrollRevealEls = document.querySelectorAll('.disc-card, .bring-card, .timeline-item, .lit-card, .portfolio-card, .resume-block');
if (scrollRevealEls.length > 0) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = (i * 0.07) + 's';
        entry.target.style.opacity = '0';
        entry.target.style.transform = 'translateY(20px)';
        entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        requestAnimationFrame(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        });
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  scrollRevealEls.forEach(el => revealObserver.observe(el));
}

// ---- NAVBAR SCROLL TINT ----
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  if (window.scrollY > 60) {
    navbar.style.background = 'rgba(26, 22, 5, 0.97)';
  } else {
    navbar.style.background = 'rgba(51, 44, 15, 0.92)';
  }
});

// ---- CONTACT FORM (client-side demo) ----
function handleFormSubmit() {
  const name    = document.getElementById('formName')?.value.trim();
  const email   = document.getElementById('formEmail')?.value.trim();
  const message = document.getElementById('formMessage')?.value.trim();
  const success = document.getElementById('formSuccess');

  if (!name || !email || !message) {
    alert('Please fill in at least your name, email, and message.');
    return;
  }

  // In a real site, you'd POST to a backend or use a service like Formspree.
  // For now, this shows a success message and opens mailto as fallback.
  if (success) success.style.display = 'block';

  const subject  = document.getElementById('formSubject')?.value || 'Portfolio Inquiry';
  const mailBody = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  window.location.href = `mailto:abhay54321mishra@gmil.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`;
}

// Lightbox
const lightbox     = document.getElementById('lightbox');
const lightboxImg  = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.card-placeholder img, .lit-card img').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightbox.classList.add('active');
  });
});

lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) lightbox.classList.remove('active');
});

// Close with Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') lightbox.classList.remove('active');
});