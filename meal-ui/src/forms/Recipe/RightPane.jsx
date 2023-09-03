import { Dropdown } from 'components';
import { LongTextInput } from 'forms/Inputs';
import { FormActions } from './components';

export function RightPane({ recipe, meta, onUpdate, handleCancel }) {
	const { categories, types, courses } = meta;
	console.log(meta);

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
						onChange={() => console.log('selected category')}
					/>
					<Dropdown
						id='recipe-data__type'
						label='choose which type'
						items={types}
						title='meal type'
						selectedItem={recipe.type}
						direction='top'
						onChange={() => console.log('selected type')}
					/>
					<Dropdown
						id='recipe-data__course'
						label='choose which course'
						items={courses}
						title='course'
						selectedItem={recipe.course}
						direction='top'
						onChange={() => console.log('selected course')}
					/>
				</div>
			</div>

			<FormActions handleCancel={handleCancel} />
		</div>
	);
}
