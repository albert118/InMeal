import { Dropdown } from 'components';
import { LongTextInput } from 'forms/Inputs';
import { CancelButton, SaveButton } from 'forms/FormActions';

export function RightPane({ recipe, meta, onUpdate, handleCancel }) {
	const { categories, types, courses } = meta;

	const onDropdownUpdate = (name, selected) => {
		onUpdate({
			target: { name: name, value: selected }
		});
	};

	return (
		<div className='card recipe-card two-pane-recipe-card--right'>
			<div className='recipe-card__data scrollbar-vertical'>
				<LongTextInput
					className='recipe--steps'
					name='preparationSteps'
					value={recipe.preparationSteps}
					placeholder='include lots of details and steps'
					handler={onUpdate}
					rows='20'
				/>
				<div className='recipe-data__meta'>
					<Dropdown
						id='recipe-data__category'
						label='choose a category'
						items={categories}
						title='category'
						selectedItem={recipe.category}
						direction='top'
						onChange={selected => onDropdownUpdate('category', selected)}
					/>
					<Dropdown
						id='recipe-data__type'
						label='choose which type'
						items={types}
						title='meal type'
						selectedItem={recipe.type}
						direction='top'
						onChange={selected => onDropdownUpdate('type', selected)}
					/>
					<Dropdown
						id='recipe-data__course'
						label='choose which course'
						items={courses}
						title='course'
						selectedItem={recipe.course}
						direction='top'
						onChange={selected => onDropdownUpdate('course', selected)}
					/>
				</div>
			</div>

			<div className='action-container'>
				<CancelButton onClick={handleCancel} />
				<SaveButton />
			</div>
		</div>
	);
}
