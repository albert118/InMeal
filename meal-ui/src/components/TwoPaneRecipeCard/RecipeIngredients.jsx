import { objectMap } from 'utils';
import { ItemBadge } from 'components';
import { NumberInput } from 'forms/Inputs';

export function RecipeIngredients({ recipeIngredients }) {
	return (
		<div className='recipe--ingredients'>
			{recipeIngredients &&
				objectMap(recipeIngredients, (key, value) => (
					<IngredientItemRow
						key={key}
						item={value}
					/>
				))}
		</div>
	);
}

function IngredientItemRow({ item }) {
	return (
		<div
			className='ingredient-form-row '
			key={item.id}
		>
			<NumberInput
				className='ingredient-form-row--quantity'
				id={item.label}
				value={item.quantity.amount}
				placeholder=''
				disabled={true}
			/>
			<ItemBadge
				item={item}
				subLabel={item.quantity.units}
			/>
		</div>
	);
}
