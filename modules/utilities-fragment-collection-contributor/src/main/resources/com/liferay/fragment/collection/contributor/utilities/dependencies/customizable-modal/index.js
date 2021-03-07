const editMode = document.body.classList.contains('has-edit-mode-menu');

const offerModal = fragmentElement.querySelector('.modal-root');

const backdrop = document.createElement('div');

const delay = configuration.delay;

const closeModal = () => {
	document.body.removeChild(backdrop);
	offerModal.classList.remove('show');
	setTimeout(() => offerModal.style.display = 'none', 500);
}

if (editMode) {
    offerModal.style.display = 'block';
    offerModal.classList.remove('fade', 'modal');
}
else {	
	setTimeout(
		function() {
    	offerModal.style.display = 'block';
			offerModal.classList.add('show');
			backdrop.className = 'modal-backdrop fade show';
			document.body.appendChild(backdrop);
			// Add listeners to close modal
			document.querySelectorAll('[data-dismiss="modal"]').forEach(item => {
				item.addEventListener('click', event => {
					closeModal();
				})
			});
		},
		delay
	);
}