import { ModalWrapper } from 'carbon-components-react';

export default function EditModal({ callToActionText, headingText, labelText }) {
	return (
		<ModalWrapper
			buttonTriggerText={callToActionText}
			modalHeading={headingText}
			modalLabel={labelText}
			size='sm'
		>
			<div className='edit-modal__content'>{children}</div>
		</ModalWrapper>
	);
}
