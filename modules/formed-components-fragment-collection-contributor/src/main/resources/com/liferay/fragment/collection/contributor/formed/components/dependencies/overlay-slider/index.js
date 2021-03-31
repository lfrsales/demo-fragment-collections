const MOVE_LEFT = 'move-left';
const MOVE_RIGHT = 'move-right';
const INTERVAL = 5000;

const editMode = document.body.classList.contains('has-edit-mode-menu');

const indicators = Array.from(
	fragmentElement.querySelectorAll('.carousel-navigation button')
);
const items = Array.from(fragmentElement.querySelectorAll('.carousel-item'));

let moving = false;

function getActiveIndicator() {
	return fragmentElement.querySelector(
		'.carousel-navigation .active'
	);
}

function move(movement, index = null) {
	if (moving) {
		return;
	}

	moving = true;

	const activeItem = fragmentElement.querySelector('.carousel-item.active');
	const indexActiveItem = items.indexOf(activeItem);
	const activeIndicator = getActiveIndicator();

	let nextItemIndex = index;

	if (index === null) {
		nextItemIndex = indexActiveItem >= configuration.numberOfSlides-1 ? 0 : indexActiveItem + 1;
	}

	const nextItem = items[nextItemIndex];

	activeItem.classList.add(movement);
	nextItem.classList.add(movement);
	activeIndicator.classList.remove('active');
	indicators[nextItemIndex].classList.add('active');

	setTimeout(function () {
		activeItem.classList.remove('active', movement);
		nextItem.classList.add('active');
		nextItem.classList.remove(movement);

		moving = false;
	}, 600);
}

function createInterval() {
	let intervalId = null;

	if (!editMode) {
		intervalId = setInterval(function () {
			if (document.contains(items[0])) {
				move(MOVE_RIGHT);
			}
			else {
				clearInterval(intervalId);
			}
		}, INTERVAL);
	}

	return intervalId;
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function getObjectWithBackgroundImage(rootNode) {
    const srcChecker = /url\(\s*?['"]?\s*?(\S+?)\s*?["']?\s*?\)/i;
    return Array.from(
        Array.from(rootNode.querySelectorAll('*')).reduce((collection,node) => {
            let prop = window.getComputedStyle(node, null).getPropertyValue('background-image');
            let match = srcChecker.exec(prop);
            if (match) {
                collection.add(node);
            }
            return collection;
        }, new Set())
    )
}

function setOverlayColor(rootElement,hexColor,opacity) {
	const overlayColor = hexToRgb(hexColor);
	const boxShadowColor = "rgba("
	+ overlayColor.r + ","
	+ overlayColor.g + ","
	+ overlayColor.b + ","
	+ opacity +")";

	rootElement.style.setProperty('--overlay-color', boxShadowColor);
}

(function main() {

	if (configuration.showParallax || configuration.showOverlay) {
		document.querySelectorAll(".carousel-item").forEach(
			(node) => { 
				if (configuration.showParallax) node.classList.add("parallax"); 
				if (configuration.showOverlay) node.classList.add("overlay-active");
                
				setOverlayColor(
					node, 
					Liferay.Util.escape(configuration.overlayColor), 
					Liferay.Util.escape(configuration.opacity)
				);
			}
		)
	}
	
	let intervalId = createInterval();

	indicators.forEach(function (indicator, index) {
		indicator.addEventListener('click', function () {
			const indexActiveIndicator = indicators.indexOf(
				getActiveIndicator()
			);

			if (index !== indexActiveIndicator) {
				if (index < indexActiveIndicator) {
					move(MOVE_LEFT, index);
				}
				else {
					move(MOVE_RIGHT, index);
				}
			}

			clearInterval(intervalId);
			intervalId = createInterval();
		});
	});	
})();