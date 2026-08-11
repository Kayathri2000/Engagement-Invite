/* =============================================
   MUSIC.JS - Background Music Controls
   ============================================= */

'use strict';

/**
 * Music Module
 * Handles background music playback and controls
 */

const Music = {
    audio: null,
    isPlaying: false,
    isMuted: false,
    autoplayMuted: false,
    volume: 0.3,
    gestureEvents: ['pointerdown', 'touchstart', 'keydown', 'scroll', 'wheel'],

    /**
     * Initialize music controls
     */
    init() {
        this.audio = document.getElementById('bg-music');
        if (!this.audio) return;

        this.audio.volume = this.volume;
        this.bindEvents();
        this.showControls();

        // Start the music from the very beginning.
        // Strategy: try unmuted first. If the browser blocks sound
        // autoplay, fall back to muted autoplay (always allowed) and
        // unmute on the very first user gesture. This makes the music
        // start as early as the browser physically allows.
        this.play();

        // Retry as late as possible, after all resources have loaded
        window.addEventListener('load', () => this.play());

        // Any user gesture starts / un-mutes the music
        this.bindGestureUnlock();
    },

    /**
     * Start (or un-mute) the music on the first user gesture
     */
    bindGestureUnlock() {
        const unlock = () => {
            if (!this.isPlaying) {
                this.play();
            } else if (this.autoplayMuted && this.audio && this.audio.muted) {
                this.audio.muted = false;
                this.audio.volume = this.volume;
                this.autoplayMuted = false;
                this.updateUI();
            }

            // Once audible music is actually playing, stop listening
            if (this.isPlaying && !this.autoplayMuted) {
                this.gestureEvents.forEach(evt => {
                    document.removeEventListener(evt, unlock);
                });
            }
        };

        this.gestureEvents.forEach(evt => {
            document.addEventListener(evt, unlock);
        });
    },

    /**
     * Bind music control events
     */
    bindEvents() {
        const toggleBtn = document.getElementById('music-toggle');
        const volumeRange = document.getElementById('volume-range');
        const volumeIcon = document.getElementById('volume-icon');

        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggle());
        }

        if (volumeRange) {
            volumeRange.addEventListener('input', (e) => {
                this.setVolume(e.target.value / 100);
            });
        }
    },

    /**
     * Play music
     */
    play() {
        if (!this.audio) return;

        const onSuccess = () => {
            this.isPlaying = true;
            this.updateUI();
        };

        this.audio.play().then(onSuccess).catch(() => {
            // Sound autoplay blocked - play muted instead (muted autoplay
            // is allowed everywhere) and unlock the sound on the first gesture
            if (!this.autoplayMuted && !this.audio.muted) {
                this.autoplayMuted = true;
                this.audio.muted = true;
                this.audio.play().then(onSuccess).catch(() => {
                    // Fully blocked; the gesture handler will retry via play()
                    this.audio.muted = false;
                    this.autoplayMuted = false;
                    this.isPlaying = false;
                });
            }
        });
    },

    /**
     * Pause music
     */
    pause() {
        if (!this.audio) return;
        this.audio.pause();
        this.isPlaying = false;
        this.updateUI();
    },

    /**
     * Toggle play/pause
     */
    toggle() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    },

    /**
     * Set volume
     * @param {number} vol - volume from 0 to 1
     */
    setVolume(vol) {
        this.volume = vol;
        if (this.audio) {
            this.audio.volume = vol;
        }

        // Update volume icon
        const volumeIcon = document.getElementById('volume-icon');
        if (volumeIcon) {
            if (vol === 0) {
                volumeIcon.className = 'fas fa-volume-mute';
            } else if (vol < 0.5) {
                volumeIcon.className = 'fas fa-volume-down';
            } else {
                volumeIcon.className = 'fas fa-volume-up';
            }
        }
    },

    /**
     * Toggle mute
     */
    mute() {
        if (this.isMuted) {
            this.setVolume(0.3);
            this.isMuted = false;
        } else {
            this.setVolume(0);
            this.isMuted = true;
        }
    },

    /**
     * Update play/pause button UI
     */
    updateUI() {
        const icon = document.getElementById('music-icon');
        if (icon) {
            icon.className = this.isPlaying ? 'fas fa-pause' : 'fas fa-play';
        }
    },

    /**
     * Show music controls
     */
    showControls() {
        const controls = document.getElementById('music-controls');
        if (controls) {
            controls.classList.remove('hidden');
            gsap.fromTo(controls, { opacity: 0, y: 20 }, {
                opacity: 1, y: 0, duration: 0.6, ease: 'power2.out'
            });
        }
    }
};

/* =============================================
   INIT
   ============================================= */
// Initialize immediately so the music starts from the very beginning.
// The audio element and GSAP are already parsed when this script runs.
Music.init();
