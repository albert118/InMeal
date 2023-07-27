import { Badge } from 'components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

export default function ItemBadge({ item, subLabel }) {
	return (
		<div className='e-multi-select-badge ingredient-form-row--ingredient-badge'>
			<Badge
				id={item.id}
				text={item.hasOwnProperty('label') ? item.label : item}
				labelText={subLabel ?? ''}
			/>
			<div className='badge--remove'>
				<FontAwesomeIcon
					icon={faX}
					size='xs'
				/>
			</div>
		</div>
	);
}
