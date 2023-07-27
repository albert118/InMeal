import { Badge } from 'components';

export default function ItemBadge({ item, subLabel }) {
	return (
		<div className='e-multi-select-badge ingredient-form-row--ingredient-badge'>
			<Badge
				id={item.id}
				text={item.hasOwnProperty('label') ? item.label : item}
				labelText={subLabel ?? ''}
			/>
		</div>
	);
}
