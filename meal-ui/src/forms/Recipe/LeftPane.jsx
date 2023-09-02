import { useContext } from 'react';
import { TitleBar, StatusBadge, Image } from 'components';
import { LongTextInput, MultiSelectWithMultiLine, TextInput, NumberInput } from 'forms/Inputs';
import { ValidationErrors } from 'forms/Validation';
import { MultiSelectItemBadge } from './components';
import { ErrorDetailContext, useIngredients } from 'hooks/data';

export function LeftPane({ recipe, formStatus, onUpdate }) {
	const { ingredients } = useIngredients();
	const { error: errors } = useContext(ErrorDetailContext);

	return (
		<div className='card recipe-card two-pane-recipe-card--left'>
			<Image
				alt={recipe.title}
				className='image-slot'
			/>

			<TitleBar>
				<TextInput
					name='title'
					value={recipe.title}
					placeholder='Add a descriptive title'
					handler={onUpdate}
				/>
				<StatusBadge
					className='e-image-status-badge'
					status={formStatus}
				/>
				{errors && <ValidationErrors errors={errors} />}
			</TitleBar>

			<div className='recipe--data scrollbar-vertical'>
				<LongTextInput
					className='recipe--blurb'
					name='blurb'
					value={recipe.blurb}
					placeholder='maybe some details too?'
					handler={onUpdate}
				/>

				<MultiSelectWithMultiLine
					className='recipe--ingredients'
					items={recipe.recipeIngredients}
					selectableOptions={ingredients}
					attrName='recipeIngredients'
					onChange={onUpdate}
					placeholder='add another ingredient'
				>
					<MultiSelectItemRow onChange={onUpdate} />
				</MultiSelectWithMultiLine>
			</div>
		</div>
	);
}

function MultiSelectItemRow({ item, attrName, onRemove, onUpdate }) {
	return (
		<div
			className='ingredient-form-row'
			key={item.id}
		>
			<NumberInput
				className='ingredient-form-row--quantity'
				name='recipeIngredients'
				id={item.label}
				value={item.quantity}
				placeholder='how many?'
				onChange={onUpdate}
			/>
			<MultiSelectItemBadge
				item={item}
				attrName={attrName}
				onChange={onRemove}
				key={item.hasOwnProperty('label') ? item.label : item}
				subLabel={item.units.name}
			/>
		</div>
	);
}
