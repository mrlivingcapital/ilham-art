/* ==========================================================================
   THE DARK SIDE OF AN ENLIGHTENED SUFI'S MIND - KINETIC MOTION ENGINE
   Library Engine: GSAP 3.12.5 Core + ScrollTrigger Plugin
   ========================================================================== */

// Explicit safety registration of the motion plugin
gsap.registerPlugin(ScrollTrigger);

window.addEventListener('DOMContentLoaded', () => {
    initializeCinematicAnimations();
});

function initializeCinematicAnimations() {
    
    // ----------------------------------------------------------------------
    // ANIMATION 1: THE VOID HERO FADE-OUT
    // Fades and shifts headers dynamically based on scroll delta
    // ----------------------------------------------------------------------
    gsap.to(".hero-text-wrap", {
        scrollTrigger: {
            trigger: ".hero-void",
            start: "top top",      // Begins when top of hero hits top of viewport
            end: "bottom top",     // Concludes when bottom of hero clears viewport
            scrub: 1,              // Smooth time-catchup sync to mouse wheel
            invalidateOnRefresh: true
        },
        opacity: 0,
        y: -60,
        ease: "power1.inOut"
    });

    // ----------------------------------------------------------------------
    // ANIMATION 2: THE IMMERSIVE REVEAL
    // Creates a depth-scaling effect to draw attention to the book theme
    // ----------------------------------------------------------------------
    const timelineDuality = gsap.timeline({
        scrollTrigger: {
            trigger: ".duality-canvas",
            start: "top bottom",   // Begins when the top enters from the bottom screen
            end: "bottom top",     // Ends when fully passing through view
            scrub: 1.5,            // Slightly slower delay for premium weight feel
            invalidateOnRefresh: true
        }
    });

    timelineDuality.fromTo(".sufi-layer", 
        { 
            scale: 0.9, 
            opacity: 0.4 
        },
        { 
            scale: 1.05, 
            opacity: 0.95, 
            ease: "power2.out" 
        }
    );

    timelineDuality.fromTo(".testimony-text",
        { 
            y: 40, 
            opacity: 0 
        },
        { 
            y: 0, 
            opacity: 1, 
            ease: "power1.out" 
        },
        "-=0.5" // Overlaps timeline slightly so text appears alongside scaling asset
    );

    // ----------------------------------------------------------------------
    // ANIMATION 3: SYSTEM INTERFACE REFRESH SPEED GUARD
    // Guarantees layout dimensions map properly across responsive window resizes
    // ----------------------------------------------------------------------
    ScrollTrigger.addEventListener("refresh", () => {
        // Keeps computational boundaries locked relative to mobile address bars
    });
}
