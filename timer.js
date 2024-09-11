let timer = 0;
let flashInterval; // Declare flashInterval globally
let totalSeconds = 0;
let running = false;

const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const timeDisplay = document.getElementById('time-display');
const startButton = document.getElementById('start-btn');
const stopButton = document.getElementById('stop-btn');
const resetButton = document.getElementById('reset-btn');

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
                    clearInterval(timer);
                    flashRed(); // Start flashing when time hits zero
                }
            }, 1000); // Decrement every second
        }
    }
}

function stopTimer() {
    running = false;
    clearInterval(timer); // Stop the countdown timer
    clearInterval(flashInterval); // Stop flashing if the timer is stopped
    document.body.classList.remove('flash'); // Ensure the flashing stops immediately
}

function resetTimer() {
    running = false;
    clearInterval(timer); // Stop the countdown timer
    clearInterval(flashInterval); // Stop flashing if the reset button is pressed
    totalSeconds = 0;
    updateDisplay(); // Reset the display to 00:00:00
    document.body.classList.remove('flash'); // Ensure the flashing stops and the background is reset
}

function flashRed() {
    // Clear any existing flash interval to prevent multiple intervals from running simultaneously
    clearInterval(flashInterval);

    // Set up the flashing effect to continue indefinitely
    flashInterval = setInterval(() => {
        document.body.classList.toggle('flash');
    }, 500); // Toggle every 500 milliseconds for a slower flash effect
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

updateDisplay();
