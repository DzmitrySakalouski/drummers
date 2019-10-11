import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Dimensions, Image } from 'react-native';
import { Text, Input, Button, CheckBox, Overlay, Icon } from 'react-native-elements';
import { AddImgPopup } from '../components/addImgPopup';

import { gql } from "apollo-boost";
import { useMutation } from '@apollo/react-hooks';

const ADD_POST = gql`
mutation addPost($name: String!, $description: String!, $topicId: String!, $userId: String!, $urls: [String!]!){
    createPost(name: $name, description: $description, topicId: $topicId, userId: $userId, urls: $urls) {
        msg
    }
}
`;

export function AddPostScreen(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [chaffer, setChaffer] = useState(false);
    const [price, setPrice] = useState('');
    const [images, setImages] = useState([]);
    const [popupOpen, setPopupOpen] = useState(false);
    const [addPost, { data }] = useMutation(ADD_POST);

    console.log('data => ', data);    

    const renderImages = img => {
        return (
            <Text>{img}</Text>
        )
    };

    const submitPost = () => {
        const { topicId, userId } = props.navigation.getParam('data');;
        console.log({ name, description, topicId, userId, urls: images })
        addPost({ variables: { name: name, description: description, topicId: topicId, userId: userId, urls: images }}).then(() => props.navigation.goBack()).catch(err => console.log({err}));
    }

    const togglePopup = () => {
        setPopupOpen(!popupOpen);
    }

    const handleLinksSave = link => {
        setImages([...images, link]);
        togglePopup();
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text>Добавить новый пост</Text>
            {
                popupOpen && (
                    <Overlay
                        isVisible
                        width={350}
                        height="auto">
                        <View>
                            <Text>Hello from Overlay!</Text>
                            <Icon name="close" onPress={togglePopup} />
                            <AddImgPopup onLinksSave={handleLinksSave} />
                        </View>
                    </Overlay>
                )
            }
            <View style={styles.formItem}>
                {
                    images && images.length ? images.map(uri => renderImages(uri)) : <Text>Фотографий нет</Text>
                }
            </View>
            <Input placeholder="Заголовок" containerStyle={styles.formItem} value={name} onChangeText={text => setName(text)} />
            <Input placeholder="Описание" containerStyle={styles.formItem} multiline numberOfLines={4} value={description} onChangeText={text => setDescription(text)} />
            <Input placeholder="Цена" containerStyle={styles.formItem} value={price} onChangeText={text => setPrice(text)} />
            <CheckBox
                title='Торг'
                containerStyle={styles.formItem}
                checked={chaffer}
                onPress={() => setChaffer(!chaffer)}
            />
            <Button onPress={togglePopup} title="Добавить ссылки на фото" type="outline" containerStyle={styles.formItem} />
            <Button title="Опубликовать" containerStyle={styles.formItem} onPress={submitPost} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    formItem: {
        width: '90%',
        marginVertical: 10
    },
    emptyImgContainer: {
        height: 80,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center'
    }
});