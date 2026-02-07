document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const thinkBtn = document.getElementById('think-btn');
    const sceneQuestion = document.getElementById('scene-question');
    const sceneThink = document.getElementById('scene-think');
    const sceneCelebration = document.getElementById('scene-celebration');
    const noMessage = document.getElementById('no-message');
    const heartsContainer = document.getElementById('hearts-container');

    let noAttempts = 0;
    const maxAttempts = 3;

    // Teasing messages
    const messages = [
        "No? Are you sure? 😏",
        "Really no? 🤨",
        "Last chance 😌",
        "Don't break my heart! 💔",
        "Pretty please? 🥺"
    ];

    // --- YES Button Logic ---
    yesBtn.addEventListener('click', () => {
        // Smooth transition to celebration
        sceneQuestion.classList.remove('active');
        sceneCelebration.classList.remove('hidden');

        // Slight delay to allow display:block to apply before opacity transition if needed, 
        // but since we used opacity in CSS, we handle class toggling.
        // For 'display: none' in .hidden, we need to manage it.
        // CSS: .active { opacity: 1; pointer-events: all; } .scene { opacity: 0; pointer-events: none; }
        // We need to ensure display is handled if we want to remove it from flow, 
        // but absolute positioning handles flow. Code assumes opacity transition.

        setTimeout(() => {
            sceneCelebration.classList.add('active');
            createHearts();
        }, 100);
    });

    // --- NO Button Logic ---
    const moveNoButton = () => {
        noAttempts++;

        // Update message
        if (noAttempts <= messages.length) {
            noMessage.textContent = messages[noAttempts - 1];
            noMessage.style.opacity = 1;
        }

        // Check for "Think Again" scene
        if (noAttempts > maxAttempts) {
            showThinkAgain();
            return;
        }

        // Move button
        const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - 40) - (window.innerWidth / 2 - noBtn.offsetWidth / 2);
        const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - 40) - (window.innerHeight / 2 - noBtn.offsetHeight / 2);

        // Apply strict absolute positioning boundaries within viewport to avoid overflow
        // Actually, let's use fixed translate for smoother effect from center
        // But we need to make sure it doesn't go off screen.

        // Better approach: Calculate random position within viewport relative to current center
        // But the button is in a flex container initially. 
        // We switch to absolute positioning on first move.

        // Use fixed positioning to move relative to the viewport
        noBtn.style.position = 'fixed';

        // Calculate safe bounds within the viewport
        // Subtract button size and a margin to keep it fully visible
        const maxWidth = window.innerWidth - noBtn.offsetWidth - 20;
        const maxHeight = window.innerHeight - noBtn.offsetHeight - 20;

        const safeX = Math.max(20, Math.random() * maxWidth);
        const safeY = Math.max(20, Math.random() * maxHeight);

        noBtn.style.left = `${safeX}px`;
        noBtn.style.top = `${safeY}px`;

        // Add rotation for playfulness
        const rotation = Math.random() * 20 - 10;
        noBtn.style.transform = `rotate(${rotation}deg)`;
    };

    noBtn.addEventListener('mouseover', moveNoButton);
    noBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Just in case
        moveNoButton();
    });

    // For mobile touch
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent click
        moveNoButton();
    });

    // --- Think Again Logic ---
    function showThinkAgain() {
        sceneQuestion.classList.remove('active');
        sceneThink.classList.remove('hidden');
        setTimeout(() => {
            sceneThink.classList.add('active');
        }, 100);
    }

    thinkBtn.addEventListener('click', () => {
        sceneThink.classList.remove('active');

        setTimeout(() => {
            sceneThink.classList.add('hidden');
            sceneQuestion.classList.add('active');

            // Reset state
            noAttempts = 0;
            noMessage.style.opacity = 0;

            // Bring button back to center (reset inline styles)
            noBtn.style.position = '';
            noBtn.style.left = '';
            noBtn.style.top = '';
            noBtn.style.transform = '';
        }, 800); // Wait for transition
    });

    // --- Hearts Animation ---
    function createHearts() {
        setInterval(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = Math.random() * 2 + 3 + 's';
            heartsContainer.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 5000);
        }, 300);
    }
});
