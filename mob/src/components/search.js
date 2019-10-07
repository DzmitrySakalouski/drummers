import React, { useState } from 'react';
import { SearchBar } from 'react-native-elements';

export function Search() {
    const [search, setSearch] = useState('')

    return (
        <SearchBar
            placeholder="Search..."
            onChangeText={(value => setSearch(value))}
            value={search}
            containerStyle={{
                backgroundColor: 'transparent',
                width: 300
            }} />

    );
}