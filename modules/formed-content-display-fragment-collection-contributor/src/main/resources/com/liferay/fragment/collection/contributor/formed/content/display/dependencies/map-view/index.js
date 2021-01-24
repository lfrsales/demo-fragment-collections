if (document.body.classList.contains('has-edit-mode-menu')) {
	const infoDiv = document.createElement("div");

	infoDiv.classList.add("alert");
	infoDiv.classList.add("alert-info");

	const newContent = document.createTextNode("Add this fragment to a display page or collection display fragment to show a map for geolocation content.");

	infoDiv.appendChild(newContent);

	fragmentElement.insertAdjacentElement('afterbegin', infoDiv);
}