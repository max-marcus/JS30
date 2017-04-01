// Get elements
const player = document.querySelector('.player');
const video = player.querySelector('video');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggleButton = player.querySelector('.toggle');
const sliders = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('[data-skip]');

// Build functions
function togglePlay() {
  if (video.paused) video.play();
  else video.pause();
}

function updateIcon() {
  const icon = this.paused ? '►' : '❚ ❚'
  toggleButton.textContent = icon;
}

function skip() {
  const time = this.dataset.skip;
  video.currentTime += Number(time);
}

function updateSliderRange() {
  video[this.name] = this.value
}

function updateProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
  const spot = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = spot;
}

// Add event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateIcon);
video.addEventListener('pause', updateIcon);
video.addEventListener('timeupdate', updateProgress);

toggleButton.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

sliders.forEach(slider => slider.addEventListener('change', updateSliderRange));
sliders.forEach(slider => slider.addEventListener('mousemove', updateSliderRange));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);