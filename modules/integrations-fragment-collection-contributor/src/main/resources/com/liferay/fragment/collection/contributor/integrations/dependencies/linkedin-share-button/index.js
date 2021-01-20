if (document.body.classList.contains('has-edit-mode-menu')) {
	const infoDiv = document.createElement("div");

	infoDiv.classList.add("alert");
	infoDiv.classList.add("alert-info");

	const newContent = document.createTextNode("This fragment will render a LinkedIn share button once published.");

	infoDiv.appendChild(newContent);

	fragmentElement.insertAdjacentElement('afterbegin', infoDiv);
}