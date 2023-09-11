import { objectMap } from 'utils';
import { ItemBadge } from 'components';
import { NumberInput } from 'forms/Inputs';

export function RecipeIngredients({ recipeIngredients }) {
	return (
		<div className='recipe-data__ingredients ingredients-list'>
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
			className='ingredient-form-row'
			key={item.id}
		>
			<NumberInput
				className='ingredient-form-row__quantity'
				id={item.label}
				value={item.quantity}
				placeholder=''
				disabled={true}
			/>
			<ItemBadge
				className='ingredient-form-row__detail'
				item={item}
				subLabel={item.units.name}
			/>
		</div>
	);
}
