import { Button, SearchInput, ToggleInline } from 'components';
import AppRoutes from 'navigation/AppRoutes';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { objectMap } from 'utils';
import ManageRecipesRow from './ManageRecipesRow';
import useManagementTable from './useManagementTable';

export function ManageRecipesTable() {
	const { items, ...hookProps } = useManagementTable();

	return (
		<div>
			<Actions {...hookProps} />
			{objectMap(items, (idx, recipes) => {
				return (
					<ManageRecipesRow
						key={idx}
						label={idx}
						recipes={recipes}
						{...hookProps}
					/>
				);
			})}
		</div>
	);
}

function Actions({
	totalCount,
	selectedItems,
	onArchive,
	onSelectAll,
	onViewArchived,
	onRestore,
	useSearch
}) {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState('');

	return (
		<div className='action-container'>
			<div className='action-container__card'>
				{
					<div className='filter-info'>
						<label>
							selected: {selectedItems.length}/{totalCount}
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
				<div className='search'>
					<SearchInput
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
						onSearch={useSearch}
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
