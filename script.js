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

        setTimeout(() => {
            sceneCelebration.classList.add('active');

            // Start intense confetti
            startConfetti();

            // Shoot flowers from sides
            shootFlowersFromSides();

            const macroHeartText = document.querySelector('.macro-heart-text');
            const celebrationTitle = document.querySelector('.celebration-title');
            const letterContainer = document.querySelector('.letter-container');

            // Show "Welcome to my macro heart" text
            setTimeout(() => {
                macroHeartText.classList.add('show');
            }, 500);

            // SEQUENCE: 
            // 1. Wait 3 seconds reading time.
            // 2. Fade out "Welcome" text.
            // 3. Remove "Welcome" from flow and Fade in "Celebration" + "Letter".

            setTimeout(() => {
                // Fade out welcome text
                macroHeartText.classList.remove('show');

                // Wait for fade out transition (1s) to complete before switching layout
                setTimeout(() => {
                    macroHeartText.style.display = 'none'; // Remove from flow

                    // Prepare new elements
                    celebrationTitle.style.display = 'block';
                    letterContainer.style.display = 'block';

                    // Force reflow
                    void celebrationTitle.offsetWidth;

                    // Fade in new elements
                    celebrationTitle.classList.add('show');
                    letterContainer.classList.add('show');
                }, 1000); // Wait for 1s CSS transition

            }, 3500); // 3.5 seconds after "Welcome" appeared

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

    // --- Confetti / Petals Animation ---
    function startConfetti() {
        const colors = ['#ff4d6d', '#ff758f', '#ffb3c1', '#fff0f3', '#c9184a'];
        const shapes = ['❤️', '🌸', '🌹'];

        // Initial burst
        for (let i = 0; i < 50; i++) {
            createPetal(colors, shapes);
        }

        // Continuous gentle fall
        setInterval(() => {
            createPetal(colors, shapes);
        }, 200);
    }

    function createPetal(colors, shapes) {
        const petal = document.createElement('div');
        petal.classList.add('heart'); // Reusing class for styling
        petal.innerText = shapes[Math.floor(Math.random() * shapes.length)];
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.color = colors[Math.floor(Math.random() * colors.length)];
        petal.style.fontSize = (Math.random() * 20 + 10) + 'px';

        const duration = Math.random() * 3 + 2; // 2-5 seconds
        petal.style.animationDuration = duration + 's';

        heartsContainer.appendChild(petal);

        setTimeout(() => {
            petal.remove();
        }, duration * 1000);
    }

    // --- Side Flowers Animation ---
    function shootFlowersFromSides() {
        const flowerCount = 15; // Number of flowers per side
        const shapes = ['🌸', '🌹', '🌺', '🌻', '🌼', '🌷'];

        for (let i = 0; i < flowerCount; i++) {
            setTimeout(() => {
                createSideFlower('left', shapes);
                createSideFlower('right', shapes);
            }, i * 150); // Stagger the shots
        }
    }

    function createSideFlower(side, shapes) {
        const flower = document.createElement('div');
        flower.classList.add('flower-side');
        flower.innerText = shapes[Math.floor(Math.random() * shapes.length)];

        // Randomize size slightly
        const size = Math.random() * 20 + 30; // 30px to 50px
        flower.style.fontSize = `${size}px`;

        // Position vertically random but lower half mostly
        const topPos = Math.random() * 60 + 40; // 40% to 100% of viewport height
        flower.style.top = `${topPos}vh`;

        if (side === 'left') {
            flower.style.left = '-50px';
            flower.style.animation = `shootLeft 2s ease-out forwards`;
        } else {
            flower.style.right = '-50px';
            flower.style.animation = `shootRight 2s ease-out forwards`;
        }

        // Randomize animation duration slightly
        const duration = Math.random() * 1 + 1.5; // 1.5s to 2.5s
        flower.style.animationDuration = `${duration}s`;

        sceneCelebration.appendChild(flower);

        setTimeout(() => {
            flower.remove();
        }, duration * 1000);
    }
});
