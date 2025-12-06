// 1. Sélectionner les éléments nécessaires
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');

// 2. Fonction de basculement du menu
function toggleMenu() {
    // Inverse l'état de la classe 'open' sur la navigation
    mainNav.classList.toggle('open');
    
    // Met à jour l'attribut ARIA pour l'accessibilité
    const isExpanded = mainNav.classList.contains('open');
    menuToggle.setAttribute('aria-expanded', isExpanded);
}

// 3. Écouteur d'événement pour le clic sur le bouton burger
menuToggle.addEventListener('click', toggleMenu);


// 4. Fermer le menu après un clic sur un lien (pour améliorer l'UX mobile)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Vérifie si le menu est ouvert
        if (mainNav.classList.contains('open')) {
            // Ferme le menu
            toggleMenu();
        }
    });
});

// ===================================
// Logique d'animation (Fade-in au défilement)
// ===================================

const observerOptions = {
    // La zone d'intersection est la fenêtre du navigateur
    root: null, 
    // Déclenche l'action quand 10% de l'élément est visible
    threshold: 0.1 
};

// 1. Créer l'observateur
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        // Si l'élément est en vue
        if (entry.isIntersecting) {
            // Ajouter la classe 'active' pour déclencher l'animation CSS
            entry.target.classList.add('active');
            
            // Arrêter d'observer l'élément une fois qu'il a été révélé
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 2. Cibler les éléments à observer
const revealElements = document.querySelectorAll('.reveal');

// 3. Demander à l'observateur de surveiller chaque élément
revealElements.forEach(element => {
    observer.observe(element);
});

// ===================================
// Logique du bouton Retour en Haut (Back to Top)
// ===================================

const backToTopBtn = document.getElementById('backToTopBtn');

// Afficher ou masquer le bouton au défilement
window.addEventListener('scroll', () => {
    // Si l'utilisateur a défilé de plus de 300px
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

// L'effet smooth scroll est déjà géré par le CSS 'scroll-behavior: smooth'
// donc on n'a pas besoin de code JS pour le clic