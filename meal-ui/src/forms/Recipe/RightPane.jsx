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
					label='steps and notes'
					className='recipe__steps'
					name='preparationSteps'
					value={recipe.preparationSteps}
					placeholder='include lots of detail'
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
						onChange={selected => onDropdownUpdate('category', selected)}
					/>
					<Dropdown
						id='recipe-data__type'
						label='choose which type'
						items={types}
						title='meal type'
						selectedItem={recipe.type}
						onChange={selected => onDropdownUpdate('type', selected)}
					/>
					<Dropdown
						id='recipe-data__course'
						label='choose which course'
						items={courses}
						title='course'
						selectedItem={recipe.course}
						onChange={selected => onDropdownUpdate('course', selected)}
					/>
				</div>
			</div>

			<div className='recipe-card__actions'>
				<CancelButton onClick={handleCancel} />
				<SaveButton />
			</div>
		</div>
	);
}
