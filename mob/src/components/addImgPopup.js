import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { Input, Button } from 'react-native-elements';
export function AddImgPopup(props) {
    const [img, setImg] = useState('');

    const handleLinksSave = () => {
        props.onLinksSave(img);
    }

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image source={img && {uri: img}} height={200} width={200}/>
            <View style={{ marginVertical: 20 }}>
                <Input label="Скопируйте ссылку" value={img} onChangeText={text => setImg(text)} />
            </View>
            <Button title="Добавить ссылки" onPress={handleLinksSave}/>
        </View>
    );
}