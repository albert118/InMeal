import { objectMap, stringifyType } from 'utils';

export default function mapToDropdownItems(items) {
	if (Array.isArray(items)) return mapArray(items);
	if (typeof items === 'object') return mapObjects(items);

	return [];
}

function mapArray(items) {
	return items.map(item => {
		return {
			id: item.id ?? 'default_dropdown_id',
			label: stringifyType(item.name),
			...item
		};
	});
}

function mapObjects(items) {
	return objectMap(items, (key, value) => {
		return { id: key, label: stringifyType(value), original: value };
	});
}
