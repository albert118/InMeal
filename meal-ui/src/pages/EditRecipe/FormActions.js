import { CancelButton, SaveButton } from 'forms/FormActions';
import Button from 'components/Button';

export function FormActions({ clearChanges, handleCancel, saveActionText }) {
	return (
		<div className='action-container'>
			<Button handler={clearChanges}>clear changes</Button>
			<CancelButton handler={handleCancel} />
			<SaveButton>
				{saveActionText ? saveActionText : 'save and complete'}
			</SaveButton>
		</div>
	);
}
