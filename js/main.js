/* =========================================================
   E.S.R.I — Interactions front-end
   Aucune dépendance externe. Progressive enhancement.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* --- Méga-menus --- */
    document.querySelectorAll('.nav-links > li').forEach(li => {

        const link = li.querySelector('.nav-link');

        if (!link || !li.querySelector('.mega')) return;

        link.addEventListener('click', (e) => {

            if (window.innerWidth <= 1020) {

                e.preventDefault();

                const wasOpen = li.classList.contains('open');

                document
                    .querySelectorAll('.nav-links > li.open')
                    .forEach(o => o.classList.remove('open'));

                if (!wasOpen) {
                    li.classList.add('open');
                }
            }
        });

        li.addEventListener('mouseenter', () => {

            if (window.innerWidth > 1020) {
                li.classList.add('open');
            }

        });

        li.addEventListener('mouseleave', () => {

            if (window.innerWidth > 1020) {
                li.classList.remove('open');
            }

        });

        li.addEventListener('focusin', () => {

            if (window.innerWidth > 1020) {

                li.classList.add('open');

                link.setAttribute(
                    'aria-expanded',
                    'true'
                );
            }

        });

        li.addEventListener('focusout', () => {

            window.setTimeout(() => {

                if (
                    window.innerWidth > 1020 &&
                    !li.contains(document.activeElement)
                ) {

                    li.classList.remove('open');

                    link.setAttribute(
                        'aria-expanded',
                        'false'
                    );
                }

            }, 0);

        });

    });


    /* --- Révélation au scroll --- */

    const revealEls =
        document.querySelectorAll('.reveal');

    if (
        'IntersectionObserver' in window &&
        revealEls.length
    ) {

        const io = new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add('in');

                        io.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.15
            }
        );

        revealEls.forEach(el => io.observe(el));

    } else {

        revealEls.forEach(el =>
            el.classList.add('in')
        );

    }


    /* --- Onglets rôle --- */

    const roleButtons =
        document.querySelectorAll('.role-tabs button');

    const roleHint =
        document.querySelector('[data-role-hint]');

    const roleTexts = {

        etudiant:
            "Accédez à vos notes, emploi du temps, documents et paiements.",

        enseignant:
            "Gérez vos cours, saisissez les notes et consultez vos classes.",

        admin:
            "Administrez le contenu, les utilisateurs et les données de l'établissement."
    };


    roleButtons.forEach(btn => {

        btn.addEventListener('click', () => {

            roleButtons.forEach(b => {

                b.classList.remove('active');

                b.setAttribute(
                    'aria-selected',
                    'false'
                );

            });

            btn.classList.add('active');

            btn.setAttribute(
                'aria-selected',
                'true'
            );

            const role = btn.dataset.role;

            if (
                roleHint &&
                roleTexts[role]
            ) {

                roleHint.textContent =
                    roleTexts[role];
            }

            const form =
                document.querySelector('#login-form');

            if (form) {
                form.dataset.role = role;
            }

        });

    });


    /* --- Connexion démo --- */

    const loginForm =
        document.querySelector('#login-form');

    if (loginForm) {

        loginForm.addEventListener(
            'submit',
            (e) => {

                e.preventDefault();

                const role =
                    loginForm.dataset.role ||
                    'etudiant';

                const msg =
                    document.querySelector(
                        '#login-feedback'
                    );

                if (msg) {

                    msg.hidden = false;

                    msg.textContent =
                        `Ceci est une maquette front-end. En production, ce formulaire appellerait POST /api/auth/login (rôle : ${role}) sur le serveur.`;
                }

            }
        );

    }


    /* --- Formulaire de contact démo --- */

    const contactForm =
        document.querySelector('#contact-form');

    if (contactForm) {

        contactForm.addEventListener(
            'submit',
            (e) => {

                e.preventDefault();

                const msg =
                    document.querySelector(
                        '#contact-feedback'
                    );

                if (msg) {

                    msg.hidden = false;

                    msg.textContent =
                        "Message envoyé (démo). En production : POST /api/contact.";
                }

                contactForm.reset();

            }
        );

    }


    /* --- Fermer les méga-menus au clic extérieur --- */

    document.addEventListener('click', (e) => {

        if (
            !e.target.closest(
                '.nav-links > li'
            )
        ) {

            document
                .querySelectorAll(
                    '.nav-links > li.open'
                )
                .forEach(li =>
                    li.classList.remove('open')
                );
        }

    });


    /* --- Fermer les méga-menus avec Échap --- */

    document.addEventListener(
        'keydown',
        (e) => {

            if (e.key !== 'Escape') return;

            document
                .querySelectorAll(
                    '.nav-links > li.open'
                )
                .forEach(li => {

                    li.classList.remove('open');

                    const link =
                        li.querySelector('.nav-link');

                    if (link) {

                        link.setAttribute(
                            'aria-expanded',
                            'false'
                        );
                    }

                });

        }
    );

});