import { useState, useEffect } from 'react';
import { ApiConfig } from '../../config';
import { useFetch } from '../../hooks/fetch';

export default function useMeasurements() {
    const [measurementOptions, setMeasurementOptions] = useState([]);
    const { getApi } = useFetch();

    function getMeasurementOptions() {
        const url = `${ApiConfig.API_URL}/ingredients/measurements`;
        getApi(url).then(data => setMeasurementOptions(data));
    }

    useEffect(() => {
        getMeasurementOptions();
    }, []);

    return { measurementOptions };
}
