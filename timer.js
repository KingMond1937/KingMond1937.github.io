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
            section: '.knee-pit-box.left',
            display: 'left-knee-pit-timer-display',
            start: 'left-knee-pit-start-btn',
            stop: 'left-knee-pit-stop-btn',
            reset: 'left-knee-pit-reset-btn',
            inputHours: 'left-knee-pit-hours-input',
            inputMinutes: 'left-knee-pit-minutes-input',
            inputSeconds: 'left-knee-pit-seconds-input'
        },
        {
            section: '.knee-pit-box.right',
            display: 'right-knee-pit-timer-display',
            start: 'right-knee-pit-start-btn',
            stop: 'right-knee-pit-stop-btn',
            reset: 'right-knee-pit-reset-btn',
            inputHours: 'right-knee-pit-hours-input',
            inputMinutes: 'right-knee-pit-minutes-input',
            inputSeconds: 'right-knee-pit-seconds-input'
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

            // Update the display text
            timerDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

            // Calculate the total minutes left
            const minutesLeft = totalSeconds / 60;

            // Apply red background if time is 5 minutes or less
            if (minutesLeft <= 5 && totalSeconds > 0) {  // 5 minutes or less and timer is still running
                sectionElement.classList.add('timer-red');
            } else {
                sectionElement.classList.remove('timer-red');
            }
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

        // Placeholder function to update battery percentage
        function updateBatteryPercentage(percentage) {
            const batteryPercentage = document.getElementById('battery-percentage');
            batteryPercentage.textContent = `${percentage}%`;
        }

        // Example: Call this function to test battery percentage display
        updateBatteryPercentage(85); // Example: Set to 85% initially

        // Global variable to track mute state
        let isMuted = false;

        // Function to toggle mute
        function toggleMute() {
            isMuted = !isMuted;
            const muteButton = document.getElementById('mute-button');
            muteButton.textContent = isMuted ? 'Unmute Sound' : 'Mute Sound';
        }

        // Attach event listener to mute button
        document.getElementById('mute-button').addEventListener('click', toggleMute);

        // Modify playBeep function to respect mute state
        function playBeep() {
            if (!isMuted) {
                beepSound.currentTime = 0;  // Reset sound to the start
                beepSound.play();  // Play the beep sound
            }
        }

    });
});