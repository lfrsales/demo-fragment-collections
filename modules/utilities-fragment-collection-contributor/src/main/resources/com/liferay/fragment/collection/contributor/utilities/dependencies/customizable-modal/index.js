const editMode = document.body.classList.contains('has-edit-mode-menu');

const offerModal = fragmentElement.querySelector('.modal-root');

const backdrop = document.createElement('div');

const delay = configuration.delay;

const controller = new AbortController();
const signal = controller.signal;

const closeModal = () => {
	document.body.removeChild(backdrop);

	offerModal.classList.remove('show');

	setTimeout(() => offerModal.style.display = 'none', 500);

	controller.abort();
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
			offerModal.querySelectorAll('[data-dismiss="modal"]').forEach(item => {
				item.addEventListener(
					'click',
					event => {
						closeModal();
					},
					{
						signal
					}
				)
			});
		},
		delay
	);
}