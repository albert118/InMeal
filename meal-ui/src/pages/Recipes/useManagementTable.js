import { useState } from 'react';
import AppRoutes from 'navigation/AppRoutes';
import { demoImage } from 'DemoImage';
import { useNavigate } from 'react-router-dom';
import { useAllRecipes } from 'hooks/data';

export default function useManagementTable() {
	const [selectedItems, setSelectedItems] = useState([]);

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

	const addSelectedItem = newItem => {
		setSelectedItems([...selectedItems, newItem]);
	};

	const removeSelectedItem = oldItem => {
		const idx = selectedItems.indexOf(oldItem);

		if (idx > -1) {
			const tempItems = [...selectedItems];
			tempItems.splice(idx, 1);
			setSelectedItems(tempItems);
		} else {
			console.warn('cannot remove unknown item from grid');
		}
	};

	const addOrRemoveSelectedItem = (item, toggle) => {
		toggle ? addSelectedItem(item) : removeSelectedItem(item);
	};

	const onArchive = async () => {
		await archiveRecipes(selectedItems);
		refreshData();
	};

	const onViewArchived = event => {
		refreshData({ includeArchived: event.target.checked });
	};

	return {
		recipes,
		addOrRemoveSelectedItem,
		onArchive,
		onViewArchived
	};
}
