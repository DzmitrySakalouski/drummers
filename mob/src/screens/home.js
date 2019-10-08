import React, { useState } from 'react';
import { View } from 'react-native';
import { HeaderNavBar } from '../components/headerNavBar';
import { FollowingScreen, MyPostsScreen, TopicsScreen, RecentScreen } from './'
import { ScrollView } from 'react-native-gesture-handler';

export function HomeScreen(props) {
    const [selectedId, setSelectedId] = useState(1);

    const TABS = [
        <FollowingScreen />,
        <TopicsScreen/>,
        <MyPostsScreen />,
        <RecentScreen/>
    ];

    const getSelectedTab = selectedIndex => {
        setSelectedId(selectedIndex);
    };

    const renderTab = id => {
        return TABS[id]
    };

    return (
        <ScrollView>
            <HeaderNavBar {...props} selectedId={selectedId} selectId={getSelectedTab} />
            { renderTab(selectedId) }
        </ScrollView>
    );
}