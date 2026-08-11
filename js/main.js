/* =============================================
   MAIN.JS - Application Initialization
   ============================================= */

'use strict';

/**
 * Wedding Invitation Application
 * Main entry point - initializes all modules
 */

const WeddingApp = {
    isMobile: window.matchMedia('(max-width: 767px)').matches,

    /**
     * Initialize the application
     */
    init() {
        this.initAOS();
        this.initParticles();
        this.createLightRays();
        this.createFloatingPetals();
        this.startIntro();
    },

    /**
     * Initialize AOS (Animate On Scroll)
     */
    initAOS() {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50
        });
    },

    /**
     * Initialize golden dust particles on all sections
     */
    initParticles() {
        if (!window.tsParticles) return;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const count = this.isMobile ? 18 : 40;

        const goldDust = {
            fpsLimit: 60,
            fullScreen: { enable: false },
            detectRetina: true,
            background: { color: 'transparent' },
            particles: {
                number: { value: reduceMotion ? 8 : count, density: { enable: true, area: 900 } },
                color: { value: ['#D4AF37', '#F5E6A3', '#E8B4B8'] },
                shape: { type: ['circle', 'square'] },
                opacity: {
                    value: 0.4,
                    random: true,
                    anim: { enable: true, speed: 0.6, opacity_min: 0.05, sync: false }
                },
                size: {
                    value: { min: 1, max: 3 },
                    random: true,
                    anim: { enable: true, speed: 2, size_min: 0.3, sync: false }
                },
                move: {
                    enable: true,
                    speed: 0.7,
                    direction: 'top',
                    random: true,
                    straight: false,
                    outModes: { default: 'out' }
                },
                twinkle: {
                    particles: { enable: true, frequency: 0.06, opacity: 0.9 }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onHover: { enable: false },
                    onClick: { enable: false },
                    resize: { enable: true }
                }
            }
        };

        const containers = [
            'tsintro-particles', 'tspetals-particles',
            'tswelcome-particles', 'tsstory-particles', 'tsdetails-particles',
            'tscountdown-particles', 'tsbless-particles', 'tsfinal-particles'
        ];

        containers.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                tsParticles.load({ id, options: goldDust }).catch(() => {});
            }
        });
    },

    /**
     * Add subtle golden light rays behind every section
     */
    createLightRays() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        document.querySelectorAll('.invitation-section').forEach(section => {
            const rays = document.createElement('div');
            rays.className = 'light-rays';
            for (let i = 0; i < 8; i++) {
                const ray = document.createElement('div');
                ray.className = 'light-ray';
                ray.style.setProperty('--rot', (i * 45) + 'deg');
                ray.style.animationDelay = ((i % 4) * 1.4) + 's';
                rays.appendChild(ray);
            }
            section.appendChild(rays);
        });
    },

    /**
     * Start the intro animation sequence (first section only)
     */
    startIntro() {
        setTimeout(() => {
            Animations.introSequence();
        }, 500);
    },

    /**
     * Create floating petal elements with warm festive colors
     */
    createFloatingPetals() {
        const container = document.getElementById('floating-petals-overlay');
        if (!container) return;

        const petalColors = ['#D4AF37', '#F5E6A3', '#E8B4B8', '#B8960F', '#2D6A4F', '#F5E6A3'];

        for (let i = 0; i < 25; i++) {
            const petal = document.createElement('div');
            petal.className = 'petal';
            petal.style.left = Math.random() * 100 + '%';
            petal.style.backgroundColor = petalColors[Math.floor(Math.random() * petalColors.length)];
            petal.style.animationDuration = (Math.random() * 10 + 10) + 's';
            petal.style.animationDelay = (Math.random() * 15) + 's';
            petal.style.width = (Math.random() * 10 + 8) + 'px';
            petal.style.height = (Math.random() * 10 + 8) + 'px';
            container.appendChild(petal);
        }
    }
};

/* =============================================
   INITIALIZATION
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {
    WeddingApp.init();
});
