/* =============================================
   CONFETTI.JS - Confetti & Celebration Effects
   ============================================= */

'use strict';

/**
 * ConfettiEffects Module
 * Handles confetti and celebration animations
 */

const ConfettiEffects = {

    /**
     * Main celebration - fires multiple confetti bursts
     */
    celebrate() {
        // Initial burst
        this.burst({ spread: 70, origin: { y: 0.6 } });

        // Delayed bursts
        setTimeout(() => {
            this.burst({ spread: 90, origin: { y: 0.5 } });
        }, 300);

        setTimeout(() => {
            this.burst({ spread: 60, origin: { y: 0.7 } });
        }, 600);

        // Continuous gentle confetti
        this.startContinuous();
    },

    /**
     * Single confetti burst
     * @param {Object} options
     */
    burst(options = {}) {
        const defaults = {
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#D4AF37', '#F5E6A3', '#E8B4B8', '#FFFFFF', '#FFD700'],
            ticks: 200,
            gravity: 0.8,
            scalar: 1.2,
            shapes: ['circle', 'square'],
            drift: 0
        };

        const config = { ...defaults, ...options };
        confetti(config);
    },

    /**
     * Start continuous gentle confetti rain
     */
    startContinuous() {
        const duration = 10000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#D4AF37', '#F5E6A3', '#E8B4B8']
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#D4AF37', '#F5E6A3', '#E8B4B8']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };

        frame();
    },

    /**
     * Side cannons effect
     */
    sideCannon() {
        const count = 200;
        const defaults = {
            origin: { y: 0.7 },
            colors: ['#D4AF37', '#F5E6A3', '#E8B4B8', '#FFFFFF']
        };

        function fire(particleRatio, opts) {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio)
            });
        }

        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });
    },

    /**
     * Stars confetti effect
     */
    stars() {
        confetti({
            particleCount: 100,
            spread: 360,
            ticks: 100,
            gravity: 0,
            decay: 0.94,
            startVelocity: 20,
            shapes: ['star'],
            colors: ['#D4AF37', '#F5E6A3', '#FFD700'],
            scalar: 1.5
        });
    }
};
