import { initBeamsBackground } from './beams.js?v=1';

// Initialize WebGL Beams Background immediately
initBeamsBackground('beams-canvas-container', {
    beamWidth: 3,
    beamHeight: 30,
    beamNumber: 20,
    lightColor: '#ffffff',
    speed: 2,
    noiseIntensity: 1.75,
    scale: 0.2,
    rotation: 30
});

document.addEventListener('DOMContentLoaded', () => {

    // Advanced hover effect: 3D tilt & Proximity Mouse Tracking for Shape Blur
    const cards = document.querySelectorAll('.project-card');

    // Global mouse tracking so cards glow even when near (but fade out when far)
    window.addEventListener('mousemove', e => {
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position relative to card
            const y = e.clientY - rect.top;  // y position relative to card

            // Set CSS variables for the Shape Blur border tracking
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            // Calculate distance from the edges of the card to fade out glow
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            // Distance from the bounding box of the card
            const dx = Math.max(rect.left - mouseX, 0, mouseX - rect.right);
            const dy = Math.max(rect.top - mouseY, 0, mouseY - rect.bottom);
            const distanceToEdge = Math.sqrt(dx * dx + dy * dy);

            // Max distance threshold before glow disappears completely from the edge
            const maxDistance = 300;

            // Calculate opacity based on being closer to the card edge
            let opacity = 1 - (distanceToEdge / maxDistance);
            opacity = Math.max(0, Math.min(1, opacity)); // clamp between 0 and 1

            // If we are hovering the card directly, keep opacity at 1
            if (e.target.closest && e.target.closest('.project-card') === card) {
                opacity = 1;
            }

            card.style.setProperty('--glow-opacity', opacity);
        });
    });

    // 3D Tilt Logic
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
});
