import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Dimensions, Image } from 'react-native';
import { Text, Input, Button, CheckBox, Overlay, Icon } from 'react-native-elements';
import { AddImgPopup } from '../components/addImgPopup';
import ImagePicker from 'react-native-image-picker';

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
    const [source, setSource] = useState(null);

    console.log('data => ', data);

    const renderImages = img => {
        return (
            <Text>{img}</Text>
        )
    };

    const submitPost = () => {
        const { topicId, userId } = props.navigation.getParam('data');;
        console.log({ name, description, topicId, userId, urls: images })
        addPost({ variables: { name: name, description: description, topicId: topicId, userId: userId, urls: images } }).then(() => props.navigation.goBack()).catch(err => console.log({ err }));
    }

    const togglePopup = () => {
        const options = {
            title: 'Select Avatar',
            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log(response);
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                console.log(source);
                setSource(source)
            }
        });
    }

    const handleLinksSave = link => {
        setImages([...images, link]);
        togglePopup();
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {
                popupOpen && (
                    <Overlay
                        isVisible
                        width={350}
                        height="auto">
                        <View>
                            <View style={{ flex: 0, justifyContent: 'flex-end', alignItems: 'center' }}>
                                <Icon name="close" onPress={togglePopup} />
                            </View>
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