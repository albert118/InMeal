import { Image, StatusBadge, TitleBar } from 'components';
import { LongTextInput, MultiSelectWithMultiLine, NumberInput, TextInput } from 'forms/Inputs';
import { ValidationErrors } from 'forms/Validation';
import { ErrorDetailContext, useIngredients } from 'hooks/data';
import { useContext } from 'react';
import { MultiSelectItemBadge } from './components';

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

			<div className='recipe-card__data scrollbar-vertical'>
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
				className='ingredient-form-row__quantity'
				name='recipeIngredients'
				id={item.label}
				value={item.quantity}
				placeholder='how many?'
				onChange={onUpdate}
			/>
			<MultiSelectItemBadge
				className='ingredient-form-row__detail'
				item={item}
				attrName={attrName}
				onChange={onRemove}
				key={item.hasOwnProperty('label') ? item.label : item}
				subLabel={item.units.name}
			/>
		</div>
	);
}
