var editing = document.body.classList.contains('has-edit-mode-menu');

if (!editing && configuration.isDismissable && configuration.autoHide) {
	setTimeout(
		function () {
			fragmentElement.classList.add("invisible");
		},
		parseInt(configuration.hideDelay)
	);
}
