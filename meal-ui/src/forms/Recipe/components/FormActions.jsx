import { CancelButton, SaveButton } from 'forms/FormActions';
import ViewRecipeButton from './ViewRecipeButton';

export default function FormActions({ showViewButton, recipeId, handleCancel, saveActionText }) {
	return (
		<div className='action-container'>
			{showViewButton && <ViewRecipeButton recipeId={recipeId} />}
			<CancelButton onClick={handleCancel} />
			<SaveButton>{saveActionText ? saveActionText : 'save'}</SaveButton>
		</div>
	);
}
