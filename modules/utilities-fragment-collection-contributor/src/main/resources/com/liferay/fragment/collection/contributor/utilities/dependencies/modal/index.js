const editMode = document.body.classList.contains('has-edit-mode-menu');

const fragmentModal = fragmentElement.querySelector('.modal-root');

const backdrop = document.createElement('div');

const delay = configuration.delay;

const controller = new AbortController();

const signal = controller.signal;

const closeModal = () => {
	document.body.removeChild(backdrop);

	fragmentModal.classList.remove('show');

	setTimeout(() => fragmentModal.style.display = 'none', 500);

	controller.abort();
}

if (editMode) {
    fragmentModal.style.display = 'block';
    fragmentModal.classList.remove('fade', 'modal');
}
else {	
	setTimeout(
		function() {
    		fragmentModal.style.display = 'block';
			fragmentModal.classList.add('show');

			backdrop.className = 'modal-backdrop fade show';

			document.body.appendChild(backdrop);

			fragmentModal.querySelectorAll('[data-dismiss="modal"]').forEach(item => {
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