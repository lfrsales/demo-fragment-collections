const editMode = document.body.classList.contains('has-edit-mode-menu');

const offerModal = fragmentElement.querySelector('#offerModal');

const delay = configuration.delay;

if (editMode) {
    offerModal.style.display = 'block';
    offerModal.classList.remove('fade', 'modal');
}
else {	
	setTimeout(
		function() {
			$('#offerModal').modal();
		},
		delay
	);
}