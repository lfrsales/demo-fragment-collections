function renderHangoutButton() {
	window.___gcfg = {
		lang: themeDisplay.getBCP47LanguageId()
	};
	
	const script = document.createElement("script");
	
	script.type = "text/javascript";
	script.async = true;
	script.src = "https://apis.google.com/js/platform.js";
	
	script.onload = function () {
		gapi.hangout.render("googleHangoutButton", {
			render: "createhangout",
		});
	};
	
	const firstScript = document.getElementsByTagName("script")[0];
	
	firstScript.parentNode.insertBefore(script, firstScript);
}

if (document.body.classList.contains('has-edit-mode-menu')) {
	if (!window.__HANGOUT_BUTTON_RENDERED__) {
		renderHangoutButton();

		window.__HANGOUT_BUTTON_RENDERED__ = true;
	}
}
else {
	renderHangoutButton();
}