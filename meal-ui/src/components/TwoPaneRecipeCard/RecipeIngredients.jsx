import { Checkbox } from 'forms/Inputs';
import { objectMap } from 'utils';

export function RecipeIngredients({ recipeIngredients }) {
	return (
		<div className='recipe--ingredients'>
			{recipeIngredients &&
				objectMap(recipeIngredients, (key, value) => (
					<Checkbox
						key={key}
						label={value.label}
						value={false}
					/>
				))}
		</div>
	);
}
