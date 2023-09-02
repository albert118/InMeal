import useRecipeFormData from './useRecipeFormData';
import FormContainer from 'forms';
import { RightPane } from './RightPane';
import { LeftPane } from './LeftPane';

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
				isAdd={isAdd}
				handleCancel={handleCancel}
			/>
		</FormContainer>
	);
}
