import TitleBar from 'components/TitleBar/TitleBar';
import { Tile } from '@carbon/react';

const Card = ({ className, title, children }) => {
	return (
		<Tile className={className ? `card ${className}` : `card`}>
			<TitleBar>{title}</TitleBar>
			<div className='content-slot'>{children}</div>
		</Tile>
	);
};

export default Card;
