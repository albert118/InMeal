import { useDebounce } from '@uidotdev/usehooks';
import { TextInput } from 'forms/Inputs';
import { useEffect, useState } from 'react';

export default function SearchInput({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    useEffect(() => {
        onSearch(debouncedSearchTerm);
    }, [debouncedSearchTerm]);

    return (
        <TextInput
            label='search...'
            value={searchTerm}
            onChange={event => setSearchTerm(event.target.value)}
        />
    );
}
