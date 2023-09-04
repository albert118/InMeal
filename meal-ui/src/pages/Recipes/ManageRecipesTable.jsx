import { useState } from 'react';
import { Button } from 'components';
import { Checkbox } from 'forms/Inputs';
import AppRoutes from 'navigation/AppRoutes';
import { useNavigate } from 'react-router-dom';
import { objectMap } from 'utils';
import ManageRecipesRow from './ManageRecipesRow';
import useManagementTable from './useManagementTable';

export function ManageRecipesTable() {
	const { recipes, onAddOrRemove, onArchive, onViewArchived } = useManagementTable();
	const [scroll, setScroll] = useState(false);

	return (
		// need to hack around this
		<div onWheel={() => setScroll(!scroll)}>
			<Actions
				onArchive={onArchive}
				onViewArchived={onViewArchived}
				scroll={scroll}
			/>
			{objectMap(recipes, (group, recipes) => {
				return (
					<ManageRecipesRow
						label={group}
						key={group}
						recipes={recipes}
						className='index-row'
					/>
				);
			})}
		</div>
	);
}

function Actions({ onViewArchived, onArchive, scroll }) {
	const navigate = useNavigate();

	return (
		<div className='action-container'>
			{scroll && (
				<div
					className={`action-container__invisible-gutter ${
						scroll ? 'action-container__invisible-gutter_active' : ''
					}`}
				/>
			)}
			<div className='action-container__actions'>
				<Checkbox
					className='font-white'
					label='view archived'
					onClick={onViewArchived}
				/>
				<Button
					onClick={() => navigate(`${AppRoutes.recipe}/add`)}
					kind='secondary'
					className='add-recipes-btn'
				>
					add
				</Button>
				<Button
					onClick={onArchive}
					kind='secondary'
					className='delete-recipes-btn'
				>
					archive
				</Button>
			</div>
		</div>
	);
}
