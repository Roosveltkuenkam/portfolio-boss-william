document.addEventListener('DOMContentLoaded', function() {

    // --- Smooth Scrolling for Nav Links ---
    const navLinks = document.querySelectorAll('.nav-link, .btn[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Reveal elements on scroll ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    const allNavLinks = document.querySelectorAll('.nav-menu .nav-link');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                allNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px' });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- Contact form submission ---
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Merci pour votre message ! Nous vous recontacterons bientôt.');
        contactForm.reset();
    });

    // --- Modal Logic ---
    const modal = document.getElementById('project-modal');
    const projectCards = document.querySelectorAll('.project-card');
    const closeModalButton = document.querySelector('.close-button');
    const modalTitle = document.getElementById('modal-title');
    const modalCategory = document.getElementById('modal-category');
    const modalDescription = document.getElementById('modal-description');
    const galleryImagesContainer = document.querySelector('.gallery-images');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');

    let currentImageIndex = 0;
    let images = [];

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.dataset.title;
            const category = card.dataset.category;
            const description = card.dataset.description;
            images = card.dataset.images.split(',');

            modalTitle.textContent = title;
            modalCategory.textContent = category;
            modalDescription.textContent = description;
            
            galleryImagesContainer.innerHTML = '';
            images.forEach(imgUrl => {
                const img = document.createElement('img');
                img.src = imgUrl;
                img.alt = title;
                galleryImagesContainer.appendChild(img);
            });
            
            currentImageIndex = 0;
            updateGallery();
            
            modal.classList.add('visible');
            document.body.classList.add('modal-open');
        });
    });

    function closeModal() {
        modal.classList.remove('visible');
        document.body.classList.remove('modal-open');
    }

    function updateGallery() {
        const offset = -currentImageIndex * 100;
        galleryImagesContainer.style.transform = `translateX(${offset}%)`;
    }

    closeModalButton.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    prevButton.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : images.length - 1;
        updateGallery();
    });

    nextButton.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex < images.length - 1) ? currentImageIndex + 1 : 0;
        updateGallery();
    });

});