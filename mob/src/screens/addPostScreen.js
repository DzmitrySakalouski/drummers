import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Dimensions, Image } from 'react-native';
import { Text, Input, Button, CheckBox, Icon } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { ReactNativeFile } from 'apollo-upload-client';

import { gql } from "apollo-boost";
import { useMutation } from '@apollo/react-hooks';

const ADD_POST = gql`
mutation addPost($name: String!, $description: String!, $topicId: String!, $userId: String!, $files: [Upload!], $price: String, $isChaffer: Boolean){
    createPost(name: $name, description: $description, topicId: $topicId, userId: $userId, files: $files, price: $price, isChaffer: $isChaffer) {
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
    const [addPost, { data: addPostData }] = useMutation(ADD_POST);
    const { topicId, userId, isAd } = props.navigation.getParam('data');

    const renderImages = (img, i) => {
        return (
            <Image key={i.toString()} style={{ height: 150, width: 150, marginRight: 10 }} source={{ uri: img.source.uri }} />
        )
    };

    const submitPost = () => {
        const files = images.map(item => item.file);
        addPost({ variables: {
            name,
            description,
            topicId,
            userId,
            files,
            price,
            isChaffer: chaffer
        } }).then(() => props.navigation.navigate('Home', {foo: 'bar'})).catch(err => console.log({ err }));
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
        ImagePicker.showImagePicker(options, async (response) => {
            if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const file = new ReactNativeFile({
                    uri: response.uri,
                    name: response.fileName,
                    type: response.type
                });
                const source = { uri: 'data:image/jpeg;base64,' + response.data };

                setImages([...images, {
                    source,
                    file
                }]);
            }
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ScrollView horizontal contentContainerStyle={{ minWidth: '100%', height: images && images.length ? 200 : 50, flex: 0, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
                {
                    images && images.length ? images.map((img, i) => renderImages(img, i)) : <Text>Фотографий нет</Text>
                }
            </ScrollView>
            <Input placeholder="Заголовок" containerStyle={styles.formItem} value={name} onChangeText={text => setName(text)} />
            <Input placeholder="Описание" containerStyle={styles.formItem} multiline numberOfLines={4} value={description} onChangeText={text => setDescription(text)} />
            {
                isAd && 
                <>
                    <Input placeholder="Цена" containerStyle={styles.formItem} value={price} onChangeText={text => setPrice(text)} />
                    <CheckBox
                        title='Торг'
                        containerStyle={styles.formItem}
                        checked={chaffer}
                        onPress={() => setChaffer(!chaffer)}
                    />
                </>
            }

            <Button onPress={togglePopup} title="Добавить ссылки на фото" type="outline" containerStyle={styles.formItem} />
            <Button title="Опубликовать" containerStyle={styles.formItem} onPress={submitPost} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
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