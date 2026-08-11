/* =============================================
   COUNTDOWN.JS - Live Countdown Timer
   ============================================= */

'use strict';

/**
 * Countdown Module
 * Calculates and displays countdown to engagement date
 */

const Countdown = {
    // Engagement date: Sunday, August 30, 2026
    targetDate: new Date('2026-08-30T10:00:00'),
    interval: null,
    previousValues: {
        days: '',
        hours: '',
        minutes: '',
        seconds: ''
    },

    /**
     * Start the countdown
     */
    start() {
        if (this.interval) return;
        this.update();
        this.interval = setInterval(() => this.update(), 1000);
    },

    /**
     * Stop the countdown
     */
    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    },

    /**
     * Update countdown values
     */
    update() {
        const now = new Date();
        const diff = this.targetDate - now;

        if (diff <= 0) {
            this.stop();
            this.setDisplay('00', '00', '00', '00');
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const daysStr = this.pad(days);
        const hoursStr = this.pad(hours);
        const minutesStr = this.pad(minutes);
        const secondsStr = this.pad(seconds);

        // Animate only changed values
        if (this.previousValues.days !== daysStr) {
            this.animateValue('countdown-days', daysStr);
            this.previousValues.days = daysStr;
        }
        if (this.previousValues.hours !== hoursStr) {
            this.animateValue('countdown-hours', hoursStr);
            this.previousValues.hours = hoursStr;
        }
        if (this.previousValues.minutes !== minutesStr) {
            this.animateValue('countdown-minutes', minutesStr);
            this.previousValues.minutes = minutesStr;
        }
        if (this.previousValues.seconds !== secondsStr) {
            this.animateValue('countdown-seconds', secondsStr);
            this.previousValues.seconds = secondsStr;
        }
    },

    /**
     * Set display values directly
     */
    setDisplay(days, hours, minutes, seconds) {
        document.getElementById('countdown-days').textContent = days;
        document.getElementById('countdown-hours').textContent = hours;
        document.getElementById('countdown-minutes').textContent = minutes;
        document.getElementById('countdown-seconds').textContent = seconds;
    },

    /**
     * Animate a value change with flip effect
     * @param {string} id - element id
     * @param {string} value - new value
     */
    animateValue(id, value) {
        const el = document.getElementById(id);
        if (!el) return;

        gsap.to(el, {
            rotateX: -90,
            duration: 0.15,
            ease: 'power2.in',
            onComplete: () => {
                el.textContent = value;
                gsap.to(el, {
                    rotateX: 0,
                    duration: 0.15,
                    ease: 'power2.out'
                });
            }
        });
    },

    /**
     * Pad number with leading zero
     * @param {number} num
     * @returns {string}
     */
    pad(num) {
        return num.toString().padStart(2, '0');
    }
};
