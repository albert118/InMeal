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
            src={entity.image?.url ?? null}
            alt={entity.image ? entity.title ?? additionalProps.label : null}
            {...additionalProps}
        />
    );
}
