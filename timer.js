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

    const beepSound = new Audio('beep_sound_effect.mp3'); // Path to your beep sound
    let isMuted = false; // Global variable to track mute state

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

        function updateTimerDisplay() {
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            timerDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

            if (totalSeconds <= 300 && totalSeconds > 0) { // 5 minutes or less
                sectionElement.classList.add('timer-red');
            } else {
                sectionElement.classList.remove('timer-red');
            }
        }

        function startFlashing() {
            flashInterval = setInterval(() => {
                sectionElement.classList.toggle('flash');
                if (!isMuted) playBeep();
            }, 500); // Flash twice per second
        }

        function stopFlashing() {
            clearInterval(flashInterval);
            sectionElement.classList.remove('flash');
            stopBeep();
        }

        function playBeep() {
            beepSound.currentTime = 0;
            beepSound.play();
        }

        function stopBeep() {
            beepSound.pause();
            beepSound.currentTime = 0;
        }

        startButton.addEventListener('click', () => {
            clearInterval(timer);
            stopFlashing();

            const hours = parseInt(inputHours.value, 10) || 0;
            const minutes = parseInt(inputMinutes.value, 10) || 0;
            const seconds = parseInt(inputSeconds.value, 10) || 0;

            totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

            if (totalSeconds > 0) {
                updateTimerDisplay();
                timer = setInterval(() => {
                    if (totalSeconds > 0) {
                        totalSeconds--;
                        updateTimerDisplay();
                    } else {
                        clearInterval(timer);
                        timer = null;
                        startFlashing();
                    }
                }, 1000);
            }
        });

        stopButton.addEventListener('click', () => {
            clearInterval(timer);
            timer = null;
            stopFlashing();
        });

        resetButton.addEventListener('click', () => {
            clearInterval(timer);
            timer = null;
            stopFlashing();
            totalSeconds = 0;
            updateTimerDisplay();
            inputHours.value = inputMinutes.value = inputSeconds.value = '';
        });

        updateTimerDisplay();
    });

    // Mute button functionality
    const muteButton = document.getElementById('mute-button');
    muteButton.addEventListener('click', () => {
        isMuted = !isMuted;
        muteButton.textContent = isMuted ? 'Unmute Sound' : 'Mute Sound';
    });

    // Generate 8x8 grid
    function generateGrid() {
        const gridContainer = document.getElementById("sensor-grid");
        // Updated sensor positions to match the image
        const sensorPositions = [
            [0, 3],
            [1, 1], [1, 3], [1, 5],
            [2, 2], [2, 4],
            [4, 0], [4, 2], [4, 5], [4, 7],
            [7, 0], [7, 2], [7, 5], [7, 7]
        ];

        for (let row = 0; row < 8; row++) {
            const tableRow = document.createElement("tr");
            for (let col = 0; col < 8; col++) {
                const cell = document.createElement("td");
                if (sensorPositions.some(pos => pos[0] === row && pos[1] === col)) {
                    cell.classList.add("sensor-cell"); // Red cell for sensor
                } else {
                    cell.classList.add("empty-cell"); // Blue cell for empty space
                }
                tableRow.appendChild(cell);
            }
            gridContainer.appendChild(tableRow);
        }
    }

    // Initialize
    document.getElementById("lower-body").style.display = "block";
    generateGrid();

    let userAge = null;  // Global variable to store age
    let userWeight = null;  // Global variable to store weight

    // Save user info
    window.saveUserInfo = function saveUserInfo() {
        const age = document.getElementById('age').value;
        const weight = document.getElementById('weight').value;

        // Store the user info
        userAge = age;
        userWeight = weight;

        // Display the confirmation message
        const confirmationMessage = document.getElementById('save-confirmation');
        confirmationMessage.style.display = 'block';

        // Hide the message after 3 seconds
        setTimeout(() => {
            confirmationMessage.style.display = 'none';
        }, 3000);

        // Log the saved values (for debugging)
        console.log('Age:', age, 'Weight:', weight);
    };

    // Add an event listener to the save button
    document.addEventListener("DOMContentLoaded", () => {
        const saveButton = document.getElementById("save-button");

        if (saveButton) {
            // Debugging: Log that the save button element was found
            console.log("Save button element found.");

            saveButton.addEventListener("click", saveUserInfo);
        } else {
            console.error("Save button not found.");
        }
    });

    // Hide all tabs initially
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
    }

    // Show the default tab (Lower Body Monitoring)
    const defaultTab = document.getElementById("lower-body");
    if (defaultTab) {
        defaultTab.style.display = "block";
    }

    // Set the first tab link as active
    const tabLinks = document.getElementsByClassName("tab-link");
    if (tabLinks.length > 0) {
        tabLinks[0].classList.add("active");
    }
});