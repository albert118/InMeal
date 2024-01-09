import TitleBar from '../../components/TitleBar/TitleBar';
import { Tile } from '@carbon/react';

const Card = ({ className, title, children }) => {
    return (
        <Tile style={{ padding: 0 }} className={`card ${className ?? ''}`}>
            <TitleBar>{title}</TitleBar>
            <div className='content-slot'>{children}</div>
        </Tile>
    );
};

export default Card;
