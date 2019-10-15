import React from 'react';
import { View } from 'react-native';
import { Text, Image } from 'react-native-elements';
import { gql } from "apollo-boost";
import { useQuery } from '@apollo/react-hooks';

const GET_POST = gql`
query getPost($id: ID!) {
    post(id: $id) {
        description
        name
        
    }
}
`;

const GET_IMG = gql`
{
    images {
        file        
    }
}
`;

export function PostScreen(props) {
    const postId = props.navigation.getParam('postId');
    const { loading, error, data } = useQuery(GET_POST, { variables: { id: postId }});
    // const bf = new Buffer()
    // var base64data = bf.from(JSON.parse(data.post.imageData && data.post.imageData[0].data), 'binary').toString('base64'); Buffer
    // console.log(base64data);
    

    return (
        <View>
            <Text>Post</Text>
            <Text>{postId}</Text>
            {
                data && data.post && data.post.imageData && data.post.imageData.map(item => <Image style={{ height: 200, width: 200}} source={{ uri: `data:image/jpeg;base64,${item.data}`}}/>)
            }
        </View>
    )
}
