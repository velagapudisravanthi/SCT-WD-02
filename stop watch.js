const display = document.querySelector('.display');
const startBtn = document.querySelector('.start-btn');
const pauseBtn = document.querySelector('.pause-btn');
const resetBtn = document.querySelector('.reset-btn');
const lapBtn = document.querySelector('.lap-btn');
const lapsList = document.querySelector('.laps');

let startTime;
let running = false;
let interval;

function startStopwatch() {
  if (!running) {
    running = true;
    startTime = Date.now() - (pausedTime || 0);
    interval = setInterval(updateDisplay, 10);
  }
}

function pauseStopwatch() {
  running = false;
  clearInterval(interval);
}

function resetStopwatch() {
  running = false;
  clearInterval(interval);
  display.textContent = '00:00:00';
  lapsList.innerHTML = '';
}

function updateDisplay() {
  const elapsedTime = Date.now() - startTime;
  const formattedTime = formatTime(elapsedTime);
  display.textContent = formattedTime;
}

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  const centiseconds = Math.floor((milliseconds % 1000) / 10).toString().padStart(2, '0');
  return `${minutes}:${seconds}:${centiseconds}`;
}

let pausedTime = 0;

function lap() {
  const lapTime = display.textContent;
  const lapItem = document.createElement('li');
  lapItem.textContent = lapTime;
  lapsList.appendChild(lapItem);
}

startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', lap);
