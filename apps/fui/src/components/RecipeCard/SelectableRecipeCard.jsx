import { ImageCard } from '../../components/Card';
import Selectable from '../../components/Selectable';
import { useNavigate } from 'react-router-dom';
import AppRoutes from '../../navigation/AppRoutes';

export function SelectableRecipeCard({
    recipe,
    onClick,
    onCheck,
    ...additionalProps
}) {
    const navigate = useNavigate();

    return (
        <ImageCard
            key={additionalProps.key ?? recipe.id}
            id={recipe.id}
            className={additionalProps.className}
            label={recipe.title}
            ctaHandler={() => navigate(`${AppRoutes.recipe}/${recipe.id}`)}
            entityName='recipe'
        >
            <Selectable
                className='image-slot'
                onClick={isSelected => onCheck(recipe.id, isSelected)}
            >
                <img src={recipe.image} alt={recipe.title} />
            </Selectable>
        </ImageCard>
    );
}
