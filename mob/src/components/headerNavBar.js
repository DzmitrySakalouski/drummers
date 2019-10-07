import React from 'react';
import { ButtonGroup, Text } from 'react-native-elements';
import { View } from 'react-native';

const FollowBtn = () => <Text style={{ color: 'white' }}>Follow</Text>
const TopicsBtn = () => <Text style={{ color: 'white' }}>Topics</Text>
const MyPostsBtn = () => <Text style={{ color: 'white' }}>My Posts</Text>
const RecentBtn = () => <Text style={{ color: 'white' }}>Recent</Text>

const ROUTES = ['Following', 'Topics', 'MyPosts', 'Recent'];

export function HeaderNavBar(props) {
    const buttons = [
        {
            element: FollowBtn,
        }, {
            element: TopicsBtn,
        }, {
            element: MyPostsBtn,
        }, {
            element: RecentBtn,
        },
    ];

    const updateIndex = index => {
        props.selectId(index);        
    }

    return (
        <View style={{ backgroundColor: 'black' }}>
            <ButtonGroup
                onPress={updateIndex}
                selectedIndex={props.selectedId}
                containerBorderRadius={0}
                selectedButtonStyle={{
                    borderBottomColor: 'white',
                    borderBottomWidth: 3,
                    backgroundColor: 'black'
                }}
                buttons={buttons}
                buttonStyle={{
                    backgroundColor: 'black',
                    borderColor: 'black'
                }}
                innerBorderStyle={{ width: 0 }}
                containerStyle={{ borderWidth: 0, height: 35, borderRadius: 0 }}
            />
        </View>

    );
}