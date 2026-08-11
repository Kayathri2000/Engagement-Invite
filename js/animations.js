/* =============================================
   ANIMATIONS.JS - GSAP Animations
   ============================================= */

'use strict';

/**
 * Animations Module
 * Handles all GSAP-powered animations
 */

const Animations = {
    timelineTriggered: false,

    /**
     * Intro animation sequence (J - Heart - K - tagline)
     * @param {Function} onComplete - callback after sequence
     */
    introSequence(onComplete) {
        const tl = gsap.timeline({ onComplete });

        // Letter J
        tl.to('.intro-j', {
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out'
        })
        // Heart
        .to('.intro-heart-icon', {
            opacity: 1,
            duration: 0.8,
            ease: 'back.out(1.7)'
        }, '+=0.3')
        // Letter K
        .to('.intro-k', {
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out'
        }, '+=0.2')
        // Tagline
        .to('.intro-tagline', {
            opacity: 1,
            duration: 1,
            ease: 'power2.out'
        }, '+=0.5')
        // Hold - keep the opening visible for scrolling
        .to({}, { duration: 1.5 });
    },

    /**
     * Welcome sequence as the section enters the viewport:
     * heading fades, invitation text rises, Jayasuriya appears,
     * heart appears, Kayathri appears, then the request line.
     */
    welcomeEntrance() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#welcome',
                start: 'top 70%',
                once: true
            }
        });

        tl.fromTo('.ornament-top', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' })
            .fromTo('.welcome-together', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5')
            .fromTo('.welcome-invite', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5')
            .fromTo('.name-j', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.9, ease: 'power2.out' }, '-=0.4')
            .fromTo('.couple-heart', { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.7)' }, '-=0.5')
            .fromTo('.name-k', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.9, ease: 'power2.out' }, '-=0.6')
            .fromTo('.welcome-divider', { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.4')
            .fromTo('.welcome-request', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4');
    },

    /**
     * Details sequence: the card gently rises, the gold border draws
     * itself, then couple / date / time / venue appear in order.
     */
    detailsEntrance() {
        const card = document.querySelector('.details-card');
        if (!card) return;

        const frameTb = document.createElement('span');
        frameTb.className = 'card-frame-tb';
        const frameLr = document.createElement('span');
        frameLr.className = 'card-frame-lr';
        card.appendChild(frameTb);
        card.appendChild(frameLr);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: card,
                start: 'top 75%',
                once: true
            }
        });

        tl.fromTo(card, {
            opacity: 0,
            y: 50,
            scale: 0.96
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out'
        })
        .fromTo(frameTb, { scaleX: 0 }, {
            scaleX: 1,
            duration: 0.6,
            ease: 'power2.inOut'
        }, '-=0.4')
        .fromTo(frameLr, { scaleY: 0 }, {
            scaleY: 1,
            duration: 0.6,
            ease: 'power2.inOut'
        }, '<')
        .fromTo(card.querySelectorAll('.details-ornament, .details-title, .details-section'), {
            opacity: 0,
            y: 16
        }, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.12,
            ease: 'power2.out'
        }, '-=0.3');
    },

    /**
     * Story timeline animation - draws the golden line as the user scrolls.
     * Individual timeline stages are revealed by AOS (fade + slide).
     */
    animateTimeline() {
        const line = document.querySelector('.timeline-line');
        if (!line || this.timelineTriggered) return;
        if (!window.ScrollTrigger) return;
        this.timelineTriggered = true;

        gsap.fromTo(line, {
            xPercent: -50,
            scaleY: 0
        }, {
            xPercent: -50,
            scaleY: 1,
            transformOrigin: 'top center',
            ease: 'none',
            scrollTrigger: {
                trigger: '.timeline',
                start: 'top 85%',
                end: 'bottom 65%',
                scrub: true
            }
        });
    },

    /**
     * Countdown flip animation
     * @param {string} id - element id
     */
    animateCountdownFlip(id) {
        const el = document.getElementById(id);
        gsap.fromTo(el, {
            rotateX: 0
        }, {
            rotateX: -90,
            duration: 0.15,
            ease: 'power2.in',
            onComplete: () => {
                gsap.to(el, {
                    rotateX: 0,
                    duration: 0.15,
                    ease: 'power2.out'
                });
            }
        });
    },

    /**
     * Final section magical entrance
     */
    finalScreenEntrance() {
        gsap.fromTo('.final-title', {
            scale: 0.5,
            opacity: 0
        }, {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: 'back.out(1.7)'
        });

        // Create extra sparkles
        this.createFinalSparkles();
    },

    /**
     * Create sparkle stars for the final section
     */
    createFinalSparkles() {
        const container = document.getElementById('final');
        if (!container) return;
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle-star';
                sparkle.style.left = Math.random() * 100 + '%';
                sparkle.style.top = Math.random() * 100 + '%';
                sparkle.style.animationDuration = (Math.random() * 2 + 1) + 's';
                container.appendChild(sparkle);
                setTimeout(() => sparkle.remove(), 3000);
            }, i * 100);
        }
    }
};
