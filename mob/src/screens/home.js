import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { HeaderNavBar } from '../components/headerNavBar';
import { FollowingScreen, MyPostsScreen, TopicsScreen, RecentScreen } from './'
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { gql } from "apollo-boost";
import { useQuery } from '@apollo/react-hooks';
import { getUserToken } from '../services/token';

const GET_USER = gql`
query CurrentUser($id: String!){
    user(id: $id) {
        username
    }
}
`;

export function HomeScreen(props) {
    const [selectedId, setSelectedId] = useState(1);
    const [userData, setUserData] = useState({});

    useEffect(async () => {
        const userData = await getUserToken();
        setUserData(userData);
    }, []);

    const TABS = [
        <FollowingScreen {...props} />,
        <TopicsScreen {...props} userId={userData.id}/>,
        <MyPostsScreen {...props} />,
        <RecentScreen {...props} />
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