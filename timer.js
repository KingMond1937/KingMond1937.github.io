let timer;
let flashInterval;
let totalSeconds = 0;
let running = false;

const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const timeDisplay = document.getElementById('time-display');
const startButton = document.getElementById('start-btn');
const stopButton = document.getElementById('stop-btn');
const resetButton = document.getElementById('reset-btn');

const beepSound = document.getElementById('beep-sound'); // Audio element for beep

function updateDisplay() {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    timeDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
    if (!running) {
        const hours = parseInt(hoursInput.value) || 0;
        const minutes = parseInt(minutesInput.value) || 0;
        const seconds = parseInt(secondsInput.value) || 0;
        totalSeconds = hours * 3600 + minutes * 60 + seconds;

        if (totalSeconds > 0) {
            updateDisplay(); // Immediately update display with the correct initial time
            running = true;

            timer = setInterval(() => {
                if (totalSeconds > 0) {
                    totalSeconds--;
                    updateDisplay(); // Update display after each decrement
                } else {
                    clearInterval(timer); // Stop the countdown when it hits zero
                    flashRed(); // Start flashing and sound immediately
                }
            }, 1000); // Decrement every second
        }
    }
}

function stopTimer() {
    running = false;
    clearInterval(timer); // Stop the countdown timer
    clearInterval(flashInterval); // Stop flashing
    stopBeep(); // Stop the beep
    document.body.classList.remove('flash'); // Ensure the flashing stops immediately
}

function resetTimer() {
    running = false;
    clearInterval(timer); // Stop the countdown timer
    clearInterval(flashInterval); // Stop flashing
    stopBeep(); // Stop the beep
    totalSeconds = 0;
    updateDisplay(); // Reset the display to 00:00:00
    document.body.classList.remove('flash'); // Ensure the flashing stops and the background is reset
}

function flashRed() {
    clearInterval(flashInterval); // Clear any previous flashing intervals

    // Immediately flash red and play beep
    document.body.classList.add('flash'); // Turn on red immediately
    playBeep(); // Play the beep sound immediately

    // Set interval for future flashes (every second)
    flashInterval = setInterval(() => {
        document.body.classList.toggle('flash'); // Toggle flash on/off

        if (document.body.classList.contains('flash')) {
            playBeep(); // Play beep sound only when turning red
        }
    }, 1000); // 1 second red (with beep), 1 second off (cycle every second)
}

function playBeep() {
    beepSound.currentTime = 0; // Reset sound to the start
    beepSound.play(); // Play the beep sound
}

function stopBeep() {
    beepSound.pause(); // Stop the beep sound
    beepSound.currentTime = 0; // Reset the audio to the start
}

// Add event listeners for buttons
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

updateDisplay();