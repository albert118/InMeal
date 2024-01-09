import { ArrowRight } from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';

export default function GoToCTA({ location, ...additionalProps }) {
    const navigate = useNavigate();

    return (
        <label className='goto-cta' onClick={() => navigate(location)}>
            Go to {additionalProps.entityName ?? ''} <ArrowRight />
        </label>
    );
}
