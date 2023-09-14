import { Button, ToggleInline } from 'components';
import AppRoutes from 'navigation/AppRoutes';
import { useNavigate } from 'react-router-dom';
import { objectMap } from 'utils';
import ManageRecipesRow from './ManageRecipesRow';
import useManagementTable from './useManagementTable';

export function ManageRecipesTable() {
	const { recipes, selectedItems, onAddOrRemove, ...hookProps } = useManagementTable();

	const recipesCount = Object.values(recipes)
		.map(category => category.length)
		.reduce((partialSum, a) => partialSum + a, 0);

	return (
		<div>
			<Actions
				recipesCount={recipesCount}
				selectedItems={selectedItems}
				{...hookProps}
			/>
			{objectMap(recipes, (group, recipes) => {
				return (
					<ManageRecipesRow
						label={group}
						onAddOrRemove={onAddOrRemove}
						key={group}
						recipes={recipes}
						className='index-row'
						selectedItems={selectedItems}
					/>
				);
			})}
		</div>
	);
}

function Actions({
	recipesCount,
	onViewArchived,
	onArchive,
	selectedItems,
	onRestore,
	onSelectAll
}) {
	const navigate = useNavigate();

	return (
		<div className='action-container'>
			<div className='action-container__card'>
				{
					<div className='filter-info'>
						<label>
							selected: {selectedItems.length}/{recipesCount}
						</label>
					</div>
				}
				<div className='filters'>
					<ToggleInline
						id='select_all'
						labelText='select all'
						onClick={onSelectAll}
					/>
					<ToggleInline
						id='view_archived'
						labelText='view archived'
						onClick={onViewArchived}
					/>
				</div>
				<div className='actions'>
					<Button
						onClick={() => navigate(`${AppRoutes.recipe}/add`)}
						kind='primary'
					>
						add
					</Button>
					<Button
						onClick={onArchive}
						kind='secondary'
						disabled={selectedItems.length < 1}
					>
						archive
					</Button>
					<Button
						onClick={onRestore}
						kind='secondary'
						disabled={selectedItems.length < 1}
					>
						restore
					</Button>
				</div>
			</div>
		</div>
	);
}
