import { CancelButton, SaveButton } from 'forms/FormActions';

export function FormActions({ handleCancel, saveActionText }) {
	return (
		<div className='action-container'>
			<CancelButton onClick={handleCancel} />
			<SaveButton>
				{saveActionText ? saveActionText : 'save and complete'}
			</SaveButton>
		</div>
	);
}
