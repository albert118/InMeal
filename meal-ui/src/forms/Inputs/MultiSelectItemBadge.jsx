import { Badge } from 'components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

export default function MultiSelectItemBadge({ item, attrName, onChange }) {
	return (
		<div className='e-multi-select-badge'>
			<Badge
				id={item.id}
				name={attrName}
				text={item.hasOwnProperty('label') ? item.label : item}
				labelText={item.hasOwnProperty('subLabel') ? item.subLabel : ''}
			/>
			<div
				className='badge--remove'
				onClick={() => onChange(item.id, item.label)}
			>
				<FontAwesomeIcon
					icon={faX}
					size='xs'
				/>
			</div>
		</div>
	);
}
