/* ==========================================================================
   THE DARK SIDE OF AN ENLIGHTENED SUFI'S MIND - KINETIC MOTION ENGINE V2
   Library Engine: GSAP 3.12.5 Core + ScrollTrigger Plugin
   Target Optimization: Desktop & iPhone 14/15 Responsive Viewports
   ========================================================================== */

// Register the core scroll-tracking engine safely
gsap.registerPlugin(ScrollTrigger);

window.addEventListener('DOMContentLoaded', () => {
    // Fire the initialization sequence once the browser renders the markup
    initSufiCinematicEngine();
});

function initSufiCinematicEngine() {
    
    // ----------------------------------------------------------------------
    // 1. HERO TEXT RADIAL DISPERSION
    // Smoothly dissolves and drops the primary header into the black void
    // ----------------------------------------------------------------------
    gsap.to(".hero-void .frame-content-gate", {
        scrollTrigger: {
            trigger: ".hero-void",
            start: "top top",      // Activates immediately as scroll begins
            end: "bottom top",     // Concludes when the hero section fully exits
            scrub: 1,              // Ties animation tightly to the scroll speed
            invalidateOnRefresh: true
        },
        opacity: 0,
        y: -50,                    // Shifts upward gently as it disappears
        scale: 0.97,               // Recedes into the background
        ease: "none"
    });

    // ----------------------------------------------------------------------
    // 2. 2.5D PARALLAX SUFI LAYER ZOOM
    // Scales and shifts the figure independently to create an illusion of depth
    // ----------------------------------------------------------------------
    gsap.fromTo(".sufi-layer", 
        { 
            scale: 0.95,
            y: -30
        },
        {
            scale: 1.08,           // Zooms forward smoothly as you descend
            y: 30,                 // Shifts downward at a offset speed
            scrollTrigger: {
                trigger: ".duality-canvas",
                start: "top bottom", // Starts when section apex breaks bottom screen
                end: "bottom top",   // Ends when section base leaves top screen
                scrub: 1.5,          // Slower scrub creates an organic, heavy feel
                invalidateOnRefresh: true
            },
            ease: "power1.out"
        }
    );

    // ----------------------------------------------------------------------
    // 3. REVEAL SCROLL FOR MANUSCRIPT TEXT FRAMES
    // Gently fades and reveals poetry lines inside your geometric borders
    // ----------------------------------------------------------------------
    const manuscriptFrames = gsap.utils.toArray(".manuscript-frame-wrapper");
    
    manuscriptFrames.forEach((frame, index) => {
        // Skip the very first hero frame so it displays instantly on load
        if (index === 0) return;

        gsap.fromTo(frame.querySelector(".frame-content-gate"), 
            { 
                opacity: 0, 
                y: 40,
                scale: 0.98
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                scrollTrigger: {
                    trigger: frame,
                    start: "top 85%",    // Triggers when the card is near the lower viewport
                    end: "top 50%",      // Fully displays by the time it reaches center screen
                    scrub: 1,
                    invalidateOnRefresh: true
                },
                ease: "power2.out"
            }
        );
    });

    // ----------------------------------------------------------------------
    // 4. BUTTON GLOW CYCLE
    // An infinite, loopable breathing pulse effect for the preorder gateway
    // ----------------------------------------------------------------------
    gsap.to(".gate-button", {
        boxShadow: "0 0 25px rgba(201, 106, 27, 0.5)",
        borderColor: "rgba(242, 179, 92, 0.6)",
        duration: 2,
        yoyo: true,          // Automatically reverses direction
        repeat: -1,          // Loops indefinitely
        ease: "sine.inOut"
    });
}

// Append this function block to the base of script.js to initialize the audio triggers
const playButton = document.getElementById('playTrigger');
const audioTrack = document.getElementById('manuscriptAudio');
const waveformVisual = document.querySelector('.waveform-container');

if (playButton && audioTrack) {
    playButton.addEventListener('click', () => {
        if (audioTrack.paused) {
            // Audio engine execution safety catch
            audioTrack.play().catch(err => console.log("Audio file initialization waiting for asset link."));
            playButton.textContent = "SUSPEND TRANSMISSION";
            waveformVisual.classList.add('playing');
        } else {
            audioTrack.pause();
            playButton.textContent = "LISTEN TO VOICE WITNESS";
            waveformVisual.classList.remove('playing');
        }
    });
}
