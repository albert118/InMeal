import { useState, useContext } from 'react';
import { Modal } from 'carbon-components-react';
import { ErrorDetailContext } from 'hooks/data';

export default function EditModalWrapper({
	editCallback,
	refreshCallback,
	headingText,
	labelText,
	buttonComponent,
	children
}) {
	const [open, setOpen] = useState(false);
	const { setError } = useContext(ErrorDetailContext);

	function onSubmitWrapper() {
		editCallback().then(hasError => {
			if (hasError) return;

			refreshCallback();
			onCloseWrapper();
		});
	}

	function onCloseWrapper() {
		setOpen(false);
		// remove the error when closing, as this modal
		// implementation is too smart and remebers its state
		// when we re-open itsetError
		setError(null);
	}

	return (
		<div className='edit-modal'>
			<Modal
				modalHeading={headingText}
				modalLabel={labelText}
				size='sm'
				open={open}
				primaryButtonText='Save'
				secondaryButtonText='Cancel'
				onRequestSubmit={onSubmitWrapper}
				onRequestClose={onCloseWrapper}
				shouldSubmitOnEnter={true}
			>
				<div className='edit-modal__content'>{children}</div>
			</Modal>
			<div
				className='edit-modal__button'
				onClick={() => setOpen(true)}
			>
				{buttonComponent}
			</div>
		</div>
	);
}
