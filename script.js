document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------------------
       1. INITIAL HERO ANIMATION & VIDEO
       ---------------------------------------------------------------------- */
    const heroVideo = document.querySelector('.hero-video');

    // Zoom out slow effect
    setTimeout(() => {
        if (heroVideo) {
            heroVideo.classList.add('loaded');
        }
    }, 100);

    /* ----------------------------------------------------------------------
       2. SCROLL - NAVBAR STYLES
       ---------------------------------------------------------------------- */
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ----------------------------------------------------------------------
       3. THE "LUXURY REVEAL" (Intersection Observer)
       ---------------------------------------------------------------------- */
    const revealElements = document.querySelectorAll('.reveal-fade-up, .reveal-fade-left, .reveal-fade-right');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -100px 0px" // Trigger slightly before it hits the bottom
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                // Optional: For one-time play
                // observer.unobserve(entry.target);
            } else {
                // Remove to play every time scroll happens (optional, for demo)
                // entry.target.classList.remove('is-revealed');
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    /* ----------------------------------------------------------------------
       4. MOBILE MENU TOGGLE
       ---------------------------------------------------------------------- */
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileToggle && mobileOverlay) {
        mobileToggle.addEventListener('click', () => {
            mobileOverlay.classList.toggle('active');
            mobileToggle.classList.toggle('is-active'); // For burger animation if needed
        });

        // Close when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileOverlay.classList.remove('active');
                mobileToggle.classList.remove('is-active');
            });
        });
    }

    /* ----------------------------------------------------------------------
       5. RULES ACCORDION EXCLUSIVE TOGGLE (Optional Polish)
       ---------------------------------------------------------------------- */
    // If you want only one open at a time like a true accordion
    const accordions = document.querySelectorAll('.accordion-item');
    accordions.forEach(acc => {
        acc.addEventListener('toggle', (e) => {
            if (acc.open) {
                accordions.forEach(otherAcc => {
                    if (otherAcc !== acc && otherAcc.open) {
                        otherAcc.open = false;
                    }
                });
            }
        });
    });

    /* ----------------------------------------------------------------------
       6. PARALLAX EFFECT ON SCROLL (Subtle)
       ---------------------------------------------------------------------- */
    const parallaxImgs = document.querySelectorAll('.parallax-img');

    window.addEventListener('scroll', () => {
        let scrollY = window.scrollY;
        parallaxImgs.forEach(img => {
            // Very subtle movement
            let speed = 0.05;
            img.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });

});
