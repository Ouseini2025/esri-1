/* =========================================================
   E.S.R.I — Interactions front-end
   Aucune dépendance externe. Progressive enhancement.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Menu mobile --- */
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  let closeMobileMenu = null;
  if (burger && navLinks) {
    closeMobileMenu = ({ restoreFocus = false } = {}) => {
      navLinks.classList.remove('open');
      burger.classList.remove('active');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Ouvrir le menu');
      if (restoreFocus) burger.focus();
    };

    burger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      burger.classList.toggle('active', isOpen);
      burger.setAttribute('aria-expanded', isOpen);
      burger.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    });

    navLinks.querySelectorAll('a:not([aria-haspopup="true"])').forEach(link => {
      link.addEventListener('click', () => closeMobileMenu());
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1020) closeMobileMenu();
    });
  }

  /* --- Méga-menus (clic pour accessibilité tactile + clavier) --- */
  document.querySelectorAll('.nav-links > li').forEach(li => {
    const link = li.querySelector('.nav-link');
    if (!link || !li.querySelector('.mega')) return;
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 1020) {
        // en mobile : le lien déplie plutôt que de naviguer
        e.preventDefault();
        const wasOpen = li.classList.contains('open');
        document.querySelectorAll('.nav-links > li.open').forEach(o => o.classList.remove('open'));
        if (!wasOpen) li.classList.add('open');
      }
    });
    li.addEventListener('mouseenter', () => { if (window.innerWidth > 1020) li.classList.add('open'); });
    li.addEventListener('mouseleave', () => { if (window.innerWidth > 1020) li.classList.remove('open'); });
    li.addEventListener('focusin', () => { if (window.innerWidth > 1020) { li.classList.add('open'); link.setAttribute('aria-expanded', 'true'); } });
    li.addEventListener('focusout', () => {
      window.setTimeout(() => {
        if (window.innerWidth > 1020 && !li.contains(document.activeElement)) { li.classList.remove('open'); link.setAttribute('aria-expanded', 'false'); }
      }, 0);
    });
  });

  /* --- Révélation au scroll --- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* --- Onglets rôle (page connexion) --- */
  const roleButtons = document.querySelectorAll('.role-tabs button');
  const roleHint = document.querySelector('[data-role-hint]');
  const roleTexts = {
    etudiant: "Accédez à vos notes, emploi du temps, documents et paiements.",
    enseignant: "Gérez vos cours, saisissez les notes et consultez vos classes.",
    admin: "Administrez le contenu, les utilisateurs et les données de l'établissement."
  };
  roleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      roleButtons.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-selected','true');
      const role = btn.dataset.role;
      if (roleHint && roleTexts[role]) roleHint.textContent = roleTexts[role];
      const form = document.querySelector('#login-form');
      if (form) form.dataset.role = role;
    });
  });

  /* --- Démo : soumission formulaire de connexion (front seul, pas de backend ici) --- */
  const loginForm = document.querySelector('#login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const role = loginForm.dataset.role || 'etudiant';
      const msg = document.querySelector('#login-feedback');
      if (msg) {
        msg.hidden = false;
        msg.textContent = `Ceci est une maquette front-end. En production, cet formulaire appellerait POST /api/auth/login (rôle : ${role}) sur le serveur décrit dans docs/ARCHITECTURE.md.`;
      }
    });
  }

  /* --- Formulaire de contact (démo) --- */
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = document.querySelector('#contact-feedback');
      if (msg) { msg.hidden = false; msg.textContent = "Message envoyé (démo). En production : POST /api/contact."; }
      contactForm.reset();
    });
  }

  /* --- Fermer les méga-menus au clic extérieur --- */
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-links > li')) {
      document.querySelectorAll('.nav-links > li.open').forEach(li => li.classList.remove('open'));
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.nav-links > li.open').forEach(li => {
      li.classList.remove('open');
      const link = li.querySelector('.nav-link');
      if (link) link.setAttribute('aria-expanded', 'false');
    });
    if (closeMobileMenu && navLinks.classList.contains('open')) {
      closeMobileMenu({ restoreFocus: true });
    }
  });
});
