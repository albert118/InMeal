import AppRoutes from 'navigation/AppRoutes';
import { demoImage } from 'DemoImage';
import { useNavigate } from 'react-router-dom';
import { useAllRecipes } from 'hooks/data';
import { ManageRecipesTable } from './ManageRecipesTable';

export default function ViewRecipesContainer() {
	const navigate = useNavigate();

	const mapper = dto => {
		return {
			id: dto.id,
			content: dto,
			handler: id => navigate(`${AppRoutes.recipe}/${id}`),
			image: demoImage
		};
	};

	const { recipes, refreshData, archiveRecipes } = useAllRecipes(mapper);

	return (
		<div className='p-manage-recipes'>
			<h2>
				Recipes
				<label>Manage your various recipes</label>
			</h2>

			<ManageRecipesTable
				archiveRecipes={archiveRecipes}
				recipes={recipes}
				refreshGrid={refreshData}
			/>
		</div>
	);
}
