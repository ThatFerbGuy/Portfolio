document.addEventListener('DOMContentLoaded', () => {
    
    // --- Dark/Light Mode Toggle ---
    const themeToggle = document.getElementById('darkModeToggle');
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    
    if (prefersDarkScheme.matches) {
        document.body.setAttribute('data-theme', 'dark');
        themeToggle.checked = true;
    }

    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.body.setAttribute('data-theme', 'dark');
        } else {
            document.body.removeAttribute('data-theme');
        }
    });

    // --- Custom Video Player Logic ---
    const video = document.getElementById('mainVideo');
    const playPauseBtn = document.getElementById('playPause');
    const skipBackBtn = document.getElementById('skipBack');
    const skipForwardBtn = document.getElementById('skipForward');
    const progressBar = document.getElementById('progressBar');
    const progressContainer = document.querySelector('.progress-container');
    const mainVideoTitle = document.getElementById('mainVideoTitle');

    // Play/Pause
    playPauseBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playPauseBtn.textContent = '⏸️';
        } else {
            video.pause();
            playPauseBtn.textContent = '▶️';
        }
    });

    // Skip Buttons
    skipBackBtn.addEventListener('click', () => { video.currentTime -= 10; });
    skipForwardBtn.addEventListener('click', () => { video.currentTime += 10; });

    // Update Progress Bar
    video.addEventListener('timeupdate', () => {
        if (!isNaN(video.duration)) {
            const progressPercent = (video.currentTime / video.duration) * 100;
            progressBar.style.width = `${progressPercent}%`;
        }
    });

    // Click on Progress Bar to Seek
    progressContainer.addEventListener('click', (e) => {
        const width = progressContainer.clientWidth;
        const clickX = e.offsetX;
        const duration = video.duration;
        video.currentTime = (clickX / width) * duration;
    });

    // Quality Button Toggle Effect
    const qualityBtn = document.getElementById('qualityBtn');
    qualityBtn.addEventListener('click', () => {
        const qualities = ['HD', '4K'];
        let current = qualities.indexOf(qualityBtn.textContent);
        qualityBtn.textContent = qualities[(current + 1) % qualities.length];
    });

    // Reset Play Button when video ends
    video.addEventListener('ended', () => {
        playPauseBtn.textContent = '▶️';
    });

    // --- Gallery Click-to-Play Logic ---
    const videoCards = document.querySelectorAll('.video-card');

    videoCards.forEach(card => {
        card.addEventListener('click', () => {
            const newSrc = card.getAttribute('data-src');
            const newTitle = card.getAttribute('data-title');
            
            if (newSrc) {
                // Fade out title, change it, fade back in
                mainVideoTitle.style.opacity = 0;
                
                setTimeout(() => {
                    video.src = newSrc;
                    mainVideoTitle.textContent = newTitle; 
                    mainVideoTitle.style.opacity = 1;
                    
                    video.play();
                    playPauseBtn.textContent = '⏸️';
                }, 300); // 300ms delay matches CSS transition
                
                // Scroll up to the player smoothly
                document.querySelector('.showreel-section').scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }
        });
    });
});