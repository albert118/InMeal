import { ImageCard } from 'components/Card';
import { useNavigate } from 'react-router-dom';
import AppRoutes from 'navigation/AppRoutes';
import { FormStatuses } from 'forms';
import { demoImage } from 'DemoImage';
import useRecipes from 'dataHooks/useRecipes';

export default function View() {
	const recipeIds = [
		'2b271329-83dc-4123-be11-f1ac96873868',
		'4cf33993-777f-497d-b007-4f2e333e2dca',
		'918e8444-db04-452d-a40d-295039fbdf93',
		'c24e6841-c919-4c49-b283-2d10697216f6',
		'ea7ca771-889c-4e53-ae88-e2b11a2c20ee'
	];

	const navigate = useNavigate();

	const mapper = dto => {
		return {
			id: dto.id,
			content: dto,
			label: 'Breakfast',
			status: FormStatuses.Unknown,
			handler: id => navigate(`${AppRoutes.recipe}/${id}`),
			image: demoImage
		};
	};

	const { recipes, isLoading } = useRecipes(recipeIds, mapper);

	return (
		<div className='p-recipe-view'>
			<div className='recipe-grid'>
				{isLoading
					? 'loading...'
					: recipes.map(r => (
							<ImageCard
								key={r.id}
								id={r.id}
								className='recipe-grid-content'
								label={r.content.title}
								status={r.status}
								ctaHandler={r.handler}
							>
								<img
									src={r.image.url}
									alt={r.label}
								/>
							</ImageCard>
					  ))}
			</div>
		</div>
	);
}
