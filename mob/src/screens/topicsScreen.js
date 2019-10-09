import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { gql } from "apollo-boost";
import { useQuery } from '@apollo/react-hooks';
import { TopicCard } from '../components/topicCard';

const GET_TOPICS = gql`
{
    topics {
        id
        name
        description
        postsForCard {
            name
            createdAt
            user {
                username
            }
        }
    }
}
`;

export function TopicsScreen(props) {
    const { loading, error, data = [] } = useQuery(GET_TOPICS);
    
    const openAddPostForm = id => {
        props.navigation.navigate('AddPostForm', { topicId: id, userId: props.userId });
    }

    return (
        <View>
            {
                data && data.topics && data.topics.map((item, i) => <TopicCard openAddPostForm={openAddPostForm} key={i.toString()} {...item} />)
            }
        </View>
    );
}