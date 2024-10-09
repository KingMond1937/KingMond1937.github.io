document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    const sections = [
        {
            section: '.quads-box.left',
            display: 'left-quads-timer-display',
            start: 'left-quads-start-btn',
            stop: 'left-quads-stop-btn',
            reset: 'left-quads-reset-btn',
            inputHours: 'left-quads-hours-input',
            inputMinutes: 'left-quads-minutes-input',
            inputSeconds: 'left-quads-seconds-input'
        },
        {
            section: '.quads-box.right',
            display: 'right-quads-timer-display',
            start: 'right-quads-start-btn',
            stop: 'right-quads-stop-btn',
            reset: 'right-quads-reset-btn',
            inputHours: 'right-quads-hours-input',
            inputMinutes: 'right-quads-minutes-input',
            inputSeconds: 'right-quads-seconds-input'
        },
        {
            section: '.hamstrings-box.left',
            display: 'left-hamstrings-timer-display',
            start: 'left-hamstrings-start-btn',
            stop: 'left-hamstrings-stop-btn',
            reset: 'left-hamstrings-reset-btn',
            inputHours: 'left-hamstrings-hours-input',
            inputMinutes: 'left-hamstrings-minutes-input',
            inputSeconds: 'left-hamstrings-seconds-input'
        },
        {
            section: '.hamstrings-box.right',
            display: 'right-hamstrings-timer-display',
            start: 'right-hamstrings-start-btn',
            stop: 'right-hamstrings-stop-btn',
            reset: 'right-hamstrings-reset-btn',
            inputHours: 'right-hamstrings-hours-input',
            inputMinutes: 'right-hamstrings-minutes-input',
            inputSeconds: 'right-hamstrings-seconds-input'
        },
        {
            section: '.calf-box.left',
            display: 'left-calf-timer-display',
            start: 'left-calf-start-btn',
            stop: 'left-calf-stop-btn',
            reset: 'left-calf-reset-btn',
            inputHours: 'left-calf-hours-input',
            inputMinutes: 'left-calf-minutes-input',
            inputSeconds: 'left-calf-seconds-input'
        },
        {
            section: '.calf-box.right',
            display: 'right-calf-timer-display',
            start: 'right-calf-start-btn',
            stop: 'right-calf-stop-btn',
            reset: 'right-calf-reset-btn',
            inputHours: 'right-calf-hours-input',
            inputMinutes: 'right-calf-minutes-input',
            inputSeconds: 'right-calf-seconds-input'
        },
        {
            section: '.foot-box.left',
            display: 'left-foot-timer-display',
            start: 'left-foot-start-btn',
            stop: 'left-foot-stop-btn',
            reset: 'left-foot-reset-btn',
            inputHours: 'left-foot-hours-input',
            inputMinutes: 'left-foot-minutes-input',
            inputSeconds: 'left-foot-seconds-input'
        },
        {
            section: '.foot-box.right',
            display: 'right-foot-timer-display',
            start: 'right-foot-start-btn',
            stop: 'right-foot-stop-btn',
            reset: 'right-foot-reset-btn',
            inputHours: 'right-foot-hours-input',
            inputMinutes: 'right-foot-minutes-input',
            inputSeconds: 'right-foot-seconds-input'
        }
    ];

    const beepSound = new Audio('beep_sound_effect.mp3');  // Path to your beep sound

    sections.forEach(section => {
        const sectionElement = document.querySelector(section.section);
        const timerDisplay = document.getElementById(section.display);
        const startButton = document.getElementById(section.start);
        const stopButton = document.getElementById(section.stop);
        const resetButton = document.getElementById(section.reset);
        const inputHours = document.getElementById(section.inputHours);
        const inputMinutes = document.getElementById(section.inputMinutes);
        const inputSeconds = document.getElementById(section.inputSeconds);

        let timer = null;
        let flashInterval = null;
        let totalSeconds = 0;

        // Function to update the timer display
        function updateTimerDisplay() {
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            timerDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }

        // Function to start the flashing effect and beep sound
        function startFlashing() {
            flashInterval = setInterval(() => {
                sectionElement.classList.toggle('flash');  // Toggle the flash class
                playBeep();
            }, 500);  // Flash twice per second
        }

        // Function to stop flashing and beep
        function stopFlashing() {
            clearInterval(flashInterval);
            sectionElement.classList.remove('flash');
            stopBeep();
        }

        // Function to play the beep sound
        function playBeep() {
            beepSound.currentTime = 0;  // Reset sound to the start
            beepSound.play();  // Play the beep sound
        }

        // Function to stop the beep sound
        function stopBeep() {
            beepSound.pause();
            beepSound.currentTime = 0;  // Reset the audio to the start
        }

        // Start button event listener
        startButton.addEventListener('click', () => {
            console.log('Start button clicked for section:', section.section);

            // Clear any existing timer and stop flashing/beeping before restarting
            clearInterval(timer);
            stopFlashing();

            const hours = parseInt(inputHours.value, 10) || 0;
            const minutes = parseInt(inputMinutes.value, 10) || 0;
            const seconds = parseInt(inputSeconds.value, 10) || 0;

            console.log(`Hours: ${hours}, Minutes: ${minutes}, Seconds: ${seconds}`);  // Debugging log

            totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

            console.log(`Total Seconds: ${totalSeconds}`);  // Debugging log

            // Only start the timer if there's time to count down
            if (totalSeconds > 0) {
                updateTimerDisplay();  // Update the timer display immediately
                timer = setInterval(() => {
                    if (totalSeconds > 0) {
                        totalSeconds--;
                        updateTimerDisplay();
                    } else {
                        clearInterval(timer);
                        timer = null;
                        startFlashing();  // Start flashing and beep when timer hits zero
                    }
                }, 1000);
            } else {
                console.warn("Timer is set to zero. Enter valid time values.");
            }
        });

        // Stop button event listener
        stopButton.addEventListener('click', () => {
            console.log('Stop button clicked for section:', section.section);
            clearInterval(timer);
            timer = null;
            stopFlashing();  // Stop the flashing and beep
        });

        // Reset button event listener
        resetButton.addEventListener('click', () => {
            console.log('Reset button clicked for section:', section.section);
            clearInterval(timer);
            timer = null;
            stopFlashing();
            totalSeconds = 0;
            updateTimerDisplay();  // Reset display to 00:00:00
        });

        // Initialize display
        updateTimerDisplay();
    });
});