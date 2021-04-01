const SET_TIME_INTERVAL = 1000;

const isEditMode = document.body.classList.contains('has-edit-mode-menu');

const windowUrl = new URL(window.location);

const initTime = parseInt(windowUrl.searchParams.get('t'), 10)

const setCurrentTime = (currentTime, url) => {
	const roundedTime = Math.round(currentTime);

	url.searchParams.set('t', roundedTime);

	history.replaceState({}, document.title, url)
}

const mappableVideo = fragmentElement.querySelector('.mappable-video');

let intervalID;

const onPlay = (getCurrentTime) => {
	mappableVideo.classList.add('playing');
	if (intervalID) {
		clearInterval(intervalID);
	}

	intervalID = setInterval(() => {
		setCurrentTime(getCurrentTime(), windowUrl);
	}, SET_TIME_INTERVAL);
}

const onPause = () => {
	mappableVideo.classList.remove('playing');

	clearInterval(intervalID);

	intervalID = null;
}

const mappableVideoUrlNode = fragmentElement.querySelector('.mappable-url');

if (isEditMode) {
	mappableVideoUrlNode.classList.remove('hide');
}

const mappableVideoUrl = mappableVideoUrlNode ? mappableVideoUrlNode.textContent.trim() : null;

let content = null;
let videoContainer = null;
let errorMessage = null;
let loadingIndicator = null;
let videoMask = null;

const height = configuration.videoHeight
	? configuration.videoHeight.replace('px', '')
	: configuration.videoHeight;
const width = configuration.videoWidth
	? configuration.videoWidth.replace('px', '')
	: configuration.videoWidth;

function resize() {
	content.style.height = '';
	content.style.width = '';

	requestAnimationFrame(function () {
		try {
			const boundingClientRect = content.getBoundingClientRect();

			const contentWidth = width || boundingClientRect.width;

			const contentHeight = height || contentWidth * 0.5625;

			content.style.height = contentHeight + 'px';
			content.style.width = contentWidth + 'px';
		}
		catch (error) {
			window.removeEventListener('resize', resize);
		}
	});
}

function showVideo() {
	videoContainer.removeAttribute('aria-hidden');
	errorMessage.parentElement.removeChild(errorMessage);
	loadingIndicator.parentElement.removeChild(loadingIndicator);

	if (!isEditMode) {
		videoMask.parentElement.removeChild(videoMask);
	}

	window.addEventListener('resize', resize);

	resize();
}

function showError() {
	if (document.body.classList.contains('has-edit-mode-menu')) {
		errorMessage.removeAttribute('hidden');
		videoContainer.parentElement.removeChild(videoContainer);
		loadingIndicator.parentElement.removeChild(loadingIndicator);
	}
	else {
		fragmentElement.parentElement.removeChild(fragmentElement);
	}
}

const rawProvider = {
	getParameters: function (url) {
		return {url: url};
	},

	showVideo: function (parameters) {
		const playbackRateDropdown = fragmentElement.querySelector('.playback-rate-dropdown');

		playbackRateDropdown.classList.remove('hide');

		const video = document.createElement('video');
		const source = document.createElement('source');

		source.src = parameters.url;

		video.autoplay = configuration.autoPlay;
		video.controls = !configuration.hideControls;
		video.loop = configuration.loop;
		video.muted = configuration.mute;

		video.style.height = '100%';
		video.style.width = '100%';

		video.appendChild(source);
		videoContainer.appendChild(video);

		showVideo();

		if (!!initTime) {
			video.currentTime = initTime;
		}

		const playbackRateDropdownList = playbackRateDropdown.querySelector('.dropdown-menu');

		const dropDownItems = playbackRateDropdownList.querySelectorAll('.dropdown-item');

		playbackRateDropdownList.addEventListener('click', (e) => {
			const clickedItem = e.target;

			if (clickedItem.classList.contains('dropdown-item')) {
				const playbackRate = parseFloat(clickedItem.getAttribute('data-playback-rate'));

				video.playbackRate = playbackRate;

				dropDownItems.forEach(item => item.classList.remove('active'));

				clickedItem.classList.add('active');

				playbackRateDropdown.classList.remove('show');
				playbackRateDropdownList.classList.remove('show');
			}
		});

		video.onplay = () => onPlay(() => video.currentTime);

		video.onpause = () => onPause();
	},
};

const youtubeProvider = {
	getParameters: function (url) {
		const start = url.searchParams.get('start');

		if (['www.youtube.com', 'youtube.com'].includes(url.hostname)) {
			const videoId = url.searchParams.get('v');

			if (videoId) {
				return {
					start: start,
					videoId: videoId,
				};
			}
		}
		else if (['www.youtu.be', 'youtu.be'].includes(url.hostname)) {
			const videoId = url.pathname.substr(1);

			if (videoId) {
				return {
					start: start,
					videoId: videoId,
				};
			}
		}
	},

	showVideo: function (parameters) {
		const handleAPIReady = function () {
			const player = new YT.Player(videoContainer, {
				events: {
					onStateChange: function (e) {
						if (e.data == YT.PlayerState.PLAYING) {
							onPlay(() => player.getCurrentTime());
						}
						else if (e.data == YT.PlayerState.PAUSED) {
							onPause();
						}
					},
					onReady: function () {
						if (configuration.mute) {
							player.mute();
						}

						showVideo();
					},
				},
				height: height,
				playerVars: {
					autoplay: configuration.autoPlay,
					controls: configuration.hideControls ? 0 : 1,
					loop: configuration.loop ? 1 : 0,
					playlist: configuration.loop
						? parameters.videoId
						: undefined,
					start: !!initTime ? initTime : !parameters.start ? 0 : parameters.start,
				},
				videoId: parameters.videoId,
				width: width,
			});
		};

		if ('YT' in window) {
			handleAPIReady();
		}
		else {
			const oldCallback =
				window.onYouTubeIframeAPIReady || function () {};

			window.onYouTubeIframeAPIReady = function () {
				oldCallback();
				handleAPIReady();
			};

			const apiSrc = '//www.youtube.com/iframe_api';

			let script = Array.from(document.querySelectorAll('script')).find(
				function (script) {
					return script.src === apiSrc;
				}
			);

			if (!script) {
				script = document.createElement('script');
				script.src = apiSrc;
				document.body.appendChild(script);
			}
		}
	},
};

function main() {
	content = fragmentElement.querySelector('.video');

	if (!content) {
		return requestAnimationFrame(main);
	}

	videoContainer = content.querySelector('.video-container');
	errorMessage = content.querySelector('.error-message');
	loadingIndicator = content.querySelector('.loading-animation');
	videoMask = content.querySelector('.video-mask');

	window.removeEventListener('resize', resize);

	try {
		let matched = false;

		let url;

		if (configuration.useMappableUrl && !mappableVideoUrl.includes('Click here to map your video.')) {
			url = new URL(mappableVideoUrl, window.origin);
		} else {
			url = new URL(configuration.url);
		}

		const providers = [youtubeProvider, rawProvider];

		for (let i = 0; i < providers.length && !matched; i++) {
			const provider = providers[i];
			const parameters = provider.getParameters(url);

			if (parameters) {
				provider.showVideo(parameters);
				matched = true;
			}
		}

		if (!matched) {
			showError();
		}
	}
	catch (error) {
		showError();
	}
}

main();