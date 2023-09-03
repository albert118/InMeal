import FormContainer from 'forms';
import { LeftPane } from './LeftPane';
import { RightPane } from './RightPane';
import useRecipeFormData from './useRecipeFormData';

export default function AddOrEdit() {
	const { recipe, formStatus, submitHandler, onUpdate, handleCancel, isAdd } = useRecipeFormData();

	return (
		<FormContainer
			className='two-pane-recipe-card'
			onSubmit={submitHandler}
		>
			<LeftPane
				recipe={recipe}
				formStatus={formStatus}
				onUpdate={onUpdate}
			/>
			<RightPane
				recipe={recipe}
				onUpdate={onUpdate}
				handleCancel={handleCancel}
			/>
		</FormContainer>
	);
}
