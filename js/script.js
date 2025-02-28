// script.js
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPauseBtn');
const progressBar = document.getElementById('progressBar');
const volumeControl = document.getElementById('volumeControl');
const volumeIcon = document.getElementById('volumeIcon');

// Set default volume to 30%
audio.volume = 0.3;

// Play/Pause functionality
playPauseBtn.addEventListener('click', () => {
	if (audio.paused) {
		audio.play();
		playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
	} else {
		audio.pause();
		playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
	}
});

// Update volume icon based on volume level
const updateVolumeIcon = () => {
	const volume = volumeControl.value;
	if (volume == 0) {
		volumeIcon.innerHTML = '<i class="fa-solid fa-volume-off"></i>';
	} else if (volume < 0.5) {
		volumeIcon.innerHTML = '<i class="fa-solid fa-volume-low"></i>';
	} else {
		volumeIcon.innerHTML = '<i class="fa-solid fa-volume-up"></i>';
	}
};

// Initialize volume icon on page load
updateVolumeIcon();

// Adjust volume and update icon
volumeControl.addEventListener('input', () => {
	audio.volume = volumeControl.value;
	updateVolumeIcon();
});

// Update progress bar as the audio plays
audio.addEventListener('timeupdate', () => {
	const progress = (audio.currentTime / audio.duration) * 100;
	progressBar.value = progress;
});

// Seek through the audio when progress bar is adjusted
progressBar.addEventListener('input', () => {
	const seekTime = (progressBar.value / 100) * audio.duration;
	audio.currentTime = seekTime;
});

// Contact Form Submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
	event.preventDefault();
	
	const formData = {
	  name: document.getElementById('name').value,
	  email: document.getElementById('email').value,
	  message: document.getElementById('message').value,
	};
	
	const scriptUrl = 'https://script.google.com/macros/s/AKfycbwZzaqd_WxUXWMo-74zDQdpP84_x2fw9YIeqisxhmAcNW-15pUzcGBWVWPfvw6t3NJ2xQ/exec';
	
	fetch(scriptUrl, {
	  method: 'POST',
	  body: JSON.stringify(formData),
	})
	.then(response => response.json())
	.then(data => {
	  document.getElementById('confirmation-message').style.display = 'block';
	  document.getElementById('contact-form').reset();
	})
	.catch(error => {
	  alert('Failed to send message. Please try again.');
	});
 });