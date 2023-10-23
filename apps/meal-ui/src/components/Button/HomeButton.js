import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import AppRoutes from 'navigation/AppRoutes';

export default function HomeButton({ ...additionalProps }) {
    const navigate = useNavigate();

    return (
        <Button
            {...additionalProps}
            className='btn labelled-icon-btn'
            kind='primary'
            onClick={() => navigate(AppRoutes.root)}
        >
            <FontAwesomeIcon icon={faHome} />
            <span>Home</span>
        </Button>
    );
}
