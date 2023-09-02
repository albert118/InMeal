import { ImageCard } from 'components/Card';
import Selectable from 'components/Selectable';

export function SelectableRecipeCard({ recipe, onClick, onCheck, ...additionalProps }) {
	return (
		<ImageCard
			key={additionalProps.key ?? recipe.id}
			id={recipe.id}
			className={additionalProps.className}
			label={recipe.title}
			ctaHandler={onClick}
			entityName='recipe'
		>
			<Selectable
				className='image-slot'
				onClick={isSelected => onCheck(recipe.id, isSelected)}
			>
				{/* <img
					src={recipe.image.url}
					alt={label}
				/> */}
			</Selectable>
		</ImageCard>
	);
}
