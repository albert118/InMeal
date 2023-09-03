import { Badge } from 'components';

export default function ItemBadge({ item, subLabel, className }) {
	return (
		<div className={`e-multi-select-badge ${className ?? ''}`}>
			<Badge
				id={item.id}
				text={item.hasOwnProperty('label') ? item.label : item}
				labelText={subLabel ?? ''}
			/>
		</div>
	);
}
