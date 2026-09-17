const pages = {
    'a-propos': [
        'À propos',
        'L’École Supérieure pour la Recherche et l’Innovation est établie à Pointe-Noire, au Congo.',
        [
            'Notre mission',
            'Former des professionnels capables de répondre aux besoins du marché de l’emploi, par une pédagogie pratique et professionnalisante.'
        ],
        [
            'Partenaires',
            'AIBS, Collège de Paris, Ascencia Business School, EBS, ESPIMA et UQAT sont présentés comme écoles et université partenaires.'
        ],
        [
            'Campus',
            'Centre de Polio Matendé, Pointe-Noire — Congo.'
        ]
    ],

    formations: [
        'Formations',
        'Nos licences professionnelles et formations continues couvrent le commerce, l’industrie et l’informatique.',
        [
            'Parcours commercial',
            'Gestion comptable, banque et finance ; gestion administrative et ressources humaines ; commerce international et métiers de mer.'
        ],
        [
            'Parcours informatique',
            'Génie logiciel ; réseaux et télécommunications ; maintenance informatique.'
        ],
        [
            'Parcours industriel',
            'Maintenance industrielle et automatisation ; génie pétrolier et gazier ; qualité hygiène sécurité environnement.'
        ],
        [
            'Formation continue',
            'Cours du soir et cours en ligne pour le renforcement des capacités : informatique, banque et assurance, transport-logistique, marketing-management, audit-contrôle de gestion, ressources humaines et QHSE.'
        ]
    ],

    admissions: [
        'Admissions',
        'Rentrée académique 2026–2027 : renseignez-vous avant de déposer votre dossier.',
        [
            'Parcours commercial',
            'Gestion comptable, banque et finance ; gestion administrative et ressources humaines ; commerce international et métiers de mer. Frais mensuels : 30 000 FCFA en 1ère année, 35 000 FCFA en 2ème année et 40 000 FCFA en 3ème année.'
        ],
        [
            'Parcours industriel et informatique',
            'Génie logiciel ; réseaux et télécommunications ; maintenance industrielle et automatisation ; génie pétrolier et gazier ; QHSE. Frais mensuels : 35 000 FCFA en 1ère année, 40 000 FCFA en 2ème année et 50 000 FCFA en 3ème année.'
        ],
        [
            'Avant de candidater',
            'Contactez l’administration pour les pièces exigées, les dates, les modalités de règlement et la confirmation du parcours choisi.'
        ]
    ],

    inscriptions: [
        'Inscriptions',
        'Les demandes d’information pour la rentrée 2026–2027 sont reçues par les contacts de l’école.',
        [
            'Nous contacter',
            'Téléphones : +242 06 944 64 54, +242 04 012 28 38 ou +242 04 016 57 42. E-mail : esrinnovationcg@gmail.com.'
        ],
        [
            'Important',
            'Le formulaire sécurisé de dépôt de dossier n’est pas encore actif : ne transmettez aucun document personnel via ce site.'
        ]
    ],

    faq: [
        'Questions fréquentes',
        'Les réponses ci-dessous orientent les futurs étudiants.',
        [
            'Comment candidater ?',
            'Consultez d’abord la page Admissions ; le dépôt numérique sera ouvert lorsque le service sera opérationnel.'
        ],
        [
            'Où trouver les frais ?',
            'Les frais officiels doivent être communiqués directement par l’administration.'
        ],
        [
            'Comment contacter l’école ?',
            'Utilisez la page Contact ou l’adresse indiquée dans l’en-tête.'
        ]
    ],

    contact: [
        'Contact',
        'Une question sur un programme, l’admission ou la formation continue ?',
        [
            'Nous écrire',
            'esrinnovationcg@gmail.com'
        ],
        [
            'Nous appeler',
            '+242 06 944 64 54 · +242 04 012 28 38 · +242 04 016 57 42'
        ],
        [
            'Nous trouver',
            'Centre de Polio Matendé, Pointe-Noire — Congo.'
        ]
    ],

    'mentions-legales': [
        'Mentions légales',
        'Cette page doit être complétée par les informations légales de l’éditeur.',
        [
            'À compléter avant publication',
            'Raison sociale, adresse, responsable de publication, hébergeur, numéro d’enregistrement et moyens de contact.'
        ]
    ],

    confidentialite: [
        'Politique de confidentialité',
        'La collecte de données personnelles n’est pas active dans cette maquette.',
        [
            'À compléter avant publication',
            'Finalités, base légale, durée de conservation, destinataires, droits des personnes, responsable de traitement et procédure de contact.'
        ]
    ]
};


/* =========================================================
   PAGE COURANTE
   ========================================================= */

const key = document.body.dataset.page;

const data = pages[key] || [
    'Page introuvable',
    'La page demandée n’existe pas.',
    [
        'Retour',
        'Utilisez le lien ci-dessous pour revenir à l’accueil.'
    ]
];

document.title = `${data[0]} | E.S.R.I`;


/* =========================================================
   IMAGES DES FORMATIONS
   ========================================================= */

const formationImages = [
    [
        '../images/formation.jpg',
        'Étudiants de l’E.S.R.I en formation en salle'
    ],
    [
        '../images/formationgl.jpg',
        'Étudiants de l’E.S.R.I dans un environnement de travail'
    ],
    [
        '../images/formationidustrielle.jpg',
        'Étudiants de l’E.S.R.I en formation industrielle'
    ]
];


/* =========================================================
   GÉNÉRATION DES CARTES
   ========================================================= */

const cards = data
    .slice(2)
    .map(([heading, text], index) => {

        let image = '';

        if (
            key === 'formations' &&
            formationImages[index]
        ) {
            image = `
                <img
                    class="formation-image"
                    src="${formationImages[index][0]}"
                    alt="${formationImages[index][1]}"
                >
            `;
        }

        return `
            <article class="content-card">
                ${image}
                <h2>${heading}</h2>
                <p>${text}</p>
            </article>
        `;
    })
    .join('');


/* =========================================================
   NAVIGATION
   ========================================================= */

document.querySelector('#app').innerHTML = `

<a class="skip-link" href="#contenu">
    Aller au contenu principal
</a>

<header class="navbar">

    <div class="nav-inner container">

        <a class="brand" href="../index.html">
            <span class="brand-mark">ESRI</span>

            <span class="brand-text">
                <b>E.S.R.I</b>
                <span>Recherche & Innovation</span>
            </span>
        </a>

        <nav aria-label="Navigation principale">

            <ul class="nav-links" id="navLinks">

                <li>
                    <a class="nav-link" href="../index.html">
                        Accueil
                    </a>
                </li>

                <li>
                    <a class="nav-link" href="a-propos.html">
                        À propos
                    </a>
                </li>

                <li>
                    <a class="nav-link" href="formations.html">
                        Formations
                    </a>
                </li>

                <li>
                    <a class="nav-link" href="admissions.html">
                        Admissions
                    </a>
                </li>

                <li>
                    <a class="nav-link" href="inscriptions.html">
                        Inscriptions
                    </a>
                </li>

                <li>
                    <a class="nav-link" href="contact.html">
                        Contact
                    </a>
                </li>

            </ul>

        </nav>

        <div class="nav-actions">

            <a
                href="inscriptions.html"
                class="btn btn-primary btn-sm"
            >
                S'inscrire
            </a>

            <button
                class="burger"
                type="button"
                aria-label="Ouvrir le menu"
                aria-expanded="false"
                aria-controls="navLinks"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

        </div>

    </div>

</header>


<main id="contenu">

    <section class="page-banner">

        <div class="container">

            <p class="breadcrumb">
                <a href="../index.html">
                    Accueil
                </a>
                /
                ${data[0]}
            </p>

            <h1>
                ${data[0]}
            </h1>

            <p>
                ${data[1]}
            </p>

        </div>

    </section>


    <section>

        <div class="container">

            <div class="content-grid">
                ${cards}
            </div>

            ${
                key === 'admissions' ||
                key === 'inscriptions'
                    ? `
                        <p
                            class="notice"
                            style="margin-top:32px"
                        >
                            Ne transmettez aucune donnée personnelle
                            avant la mise en ligne d’un formulaire
                            sécurisé et de la politique de confidentialité
                            complète.
                        </p>
                    `
                    : ''
            }

        </div>

    </section>

</main>


<footer>

    <div class="container">

        <div class="footer-bottom">

            <span>
                © 2026 E.S.R.I — École Supérieure pour la Recherche et l’Innovation.
            </span>

            <span>
                <a href="mentions-legales.html">
                    Mentions légales
                </a>

                ·

                <a href="confidentialite.html">
                    Confidentialité
                </a>
            </span>

        </div>

    </div>

</footer>
`;