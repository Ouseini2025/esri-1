/* =========================================================
   E.S.R.I — Navigation
   Gestion centralisée du menu mobile
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    if (!burger || !navLinks) return;

    const closeMenu = ({ restoreFocus = false } = {}) => {

        navLinks.classList.remove('open');
        burger.classList.remove('active');

        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute(
            'aria-label',
            'Ouvrir le menu'
        );

        if (restoreFocus) {
            burger.focus();
        }
    };

    burger.addEventListener('click', () => {

        const isOpen = navLinks.classList.toggle('open');

        burger.classList.toggle('active', isOpen);

        burger.setAttribute(
            'aria-expanded',
            String(isOpen)
        );

        burger.setAttribute(
            'aria-label',
            isOpen
                ? 'Fermer le menu'
                : 'Ouvrir le menu'
        );
    });

    navLinks.querySelectorAll('a').forEach(link => {

        link.addEventListener('click', () => {
            closeMenu();
        });

    });

    window.addEventListener('resize', () => {

        if (window.innerWidth > 1020) {
            closeMenu();
        }

    });

    document.addEventListener('keydown', event => {

        if (
            event.key === 'Escape' &&
            navLinks.classList.contains('open')
        ) {
            closeMenu({
                restoreFocus: true
            });
        }

    });

});