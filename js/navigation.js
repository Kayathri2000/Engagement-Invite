/* =============================================
   NAVIGATION.JS - Continuous Scroll Experience
   ============================================= */

'use strict';

/**
 * Navigation Module
 * One continuous scrolling invitation. Handles only the
 * special interactive elements (envelope, venue card) and
 * scroll-triggered section actions. Normal page scrolling
 * is the primary navigation and is never hijacked.
 */

const Navigation = {
    sections: [
        'intro',
        'envelope',
        'welcome',
        'story',
        'details',
        'countdown',
        'bless',
        'final'
    ],

    scrollActionsBound: false,

    /**
     * Initialize interactions and scroll-triggered actions
     */
    init() {
        this.bindVenue();
        this.initScrollActions();
    },

    /**
     * Bind the interactive venue card -> opens the map
     */
    bindVenue() {
        const venue = document.getElementById('venue-card');
        if (!venue) return;

        const openVenue = (e) => {
            if (e) e.stopPropagation();
            this.openVenue(venue);
        };

        venue.addEventListener('click', openVenue);
        venue.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.openVenue(venue);
            }
        });
    },

    /**
     * Animate the venue card and open the map in a new tab
     * @param {HTMLElement} el
     */
    openVenue(el) {
        if (!el) return;

        if (window.gsap) {
            gsap.fromTo(el,
                { y: 0, boxShadow: '0 0 0 rgba(212, 175, 55, 0)' },
                {
                    y: -5,
                    boxShadow: '0 0 35px rgba(212, 175, 55, 0.55)',
                    duration: 0.35,
                    ease: 'power2.out',
                    yoyo: true,
                    repeat: 1
                }
            );
        }

        setTimeout(() => {
            window.open('https://maps.app.goo.gl/9BGKTQdvtv2hCTvy5?g_st=aw', '_blank', 'noopener');
        }, 300);
    },

    /**
     * Gentle golden light sweep when crossing into a new section
     */
    sweepLight() {
        const el = document.getElementById('transition-light');
        if (!el || !window.gsap) return;
        gsap.fromTo(el, { opacity: 0 }, {
            opacity: 0.5,
            duration: 0.35,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut'
        });
    },

    /**
     * Wire up GSAP ScrollTrigger actions for each section
     * (entrances, timeline draw, countdown, confetti, parallax)
     */
    initScrollActions() {
        if (this.scrollActionsBound) return;
        if (!window.ScrollTrigger) return;
        this.scrollActionsBound = true;

        // Welcome + Details entrances (self-triggering timelines)
        Animations.welcomeEntrance();
        Animations.detailsEntrance();

        // Story timeline golden line draw (scrubbed by scroll)
        Animations.animateTimeline();

        // Start the countdown once it is reached
        ScrollTrigger.create({
            trigger: '#countdown',
            start: 'top 70%',
            once: true,
            onEnter: () => Countdown.start()
        });

        // Final section: confetti + magical entrance
        ScrollTrigger.create({
            trigger: '#final',
            start: 'top 60%',
            once: true,
            onEnter: () => {
                ConfettiEffects.celebrate();
                Animations.finalScreenEntrance();
            }
        });

        // Light sweep crossing into each new section
        this.sections.forEach(id => {
            if (id === 'intro') return;
            const sec = document.getElementById(id);
            if (!sec) return;
            ScrollTrigger.create({
                trigger: sec,
                start: 'top 55%',
                once: true,
                onEnter: () => this.sweepLight()
            });
        });

        // Subtle parallax on decorative elements
        gsap.utils.toArray('.floral-decoration, .ornament-svg, .details-ornament').forEach(el => {
            gsap.to(el, {
                y: () => (Math.random() * 30) - 15,
                ease: 'none',
                scrollTrigger: {
                    trigger: el.closest('.invitation-section') || el,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
            });
        });

        AOS.refresh();
    }
};

/* =============================================
   INIT
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {
    Navigation.init();
});
