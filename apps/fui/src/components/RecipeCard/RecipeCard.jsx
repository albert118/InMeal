import { ImageCard } from '../../components/Card';
import { useRecipeImage } from '../../hooks/data';

export default function RecipeCard({ ...additionalProps }) {
    const { recipe, item } = additionalProps;
    // fallback to "item" if the recipe cannot be found
    const entity = recipe ?? item;

    // TODO: this should be phased out once the real content can be loaded
    const { getRecipeImage } = useRecipeImage();
    const recipeImage = getRecipeImage(null);

    return (
        <ImageCard
            key={additionalProps.key ?? entity.id}
            id={entity.id}
            entityName='recipe'
            ctaHandler={additionalProps.onClick}
            {...additionalProps}
        >
            {additionalProps.image && (
                <img
                    src={additionalProps.image.url}
                    alt={additionalProps.label ?? additionalProps.image.label}
                    url={recipeImage.url}
                />
            )}
        </ImageCard>
    );
}
