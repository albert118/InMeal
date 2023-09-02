import { ManageRecipesTable } from './ManageRecipesTable';

export default function ViewRecipesContainer() {
	return (
		<div className='p-manage-recipes'>
			<h2>
				Recipes
				<label>Manage your various recipes</label>
			</h2>

			<ManageRecipesTable />
		</div>
	);
}
