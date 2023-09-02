import { useState } from 'react';
import { Modal } from 'carbon-components-react';

export default function EditModalWrapper({
	editCallback,
	refreshCallback,
	headingText,
	labelText,
	buttonComponent,
	children
}) {
	const [open, setOpen] = useState(false);

	function onSubmitWrapper() {
		editCallback().then(hasError => {
			if (hasError) return;

			refreshCallback();
			setOpen(false);
		});
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
				onRequestClose={() => setOpen(false)}
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
