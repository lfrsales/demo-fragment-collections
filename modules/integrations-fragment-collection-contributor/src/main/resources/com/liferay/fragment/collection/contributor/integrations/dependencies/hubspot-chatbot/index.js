if (document.body.classList.contains('has-edit-mode-menu')) {
	const infoDiv = document.createElement("div");

	infoDiv.classList.add("alert");
	infoDiv.classList.add("alert-info");

	const newContent = document.createTextNode("Use parameter utm_source=hubspot to start chatbot. You can also click the small red dot that's displayed.");

	infoDiv.appendChild(newContent);

	fragmentElement.insertAdjacentElement('afterbegin', infoDiv);
}