import { ImageCard } from '../../components/Card';

export default function RecipeCard({ ...additionalProps }) {
    const { recipe, item } = additionalProps;
    // fallback to "item" if the recipe cannot be found
    const entity = recipe ?? item;

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
                />
            )}
        </ImageCard>
    );
}
