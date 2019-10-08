import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    ImageBackground,
} from 'react-native';
import { Button, Text } from 'react-native-elements';
import { gql } from "apollo-boost";
import { useQuery, useMutation } from '@apollo/react-hooks';
import { setToken } from '../services/token';

const SIGN_IN = gql`
mutation signInApp($login: String!, $password: String!){
    signIn(login: $login, password: $password) {
        token
    }
}
`;

const GET_MESSAGES = gql`
{
    messages {
      id,
      text
    }
  }
`;

export default function LoginScreen(props) {
    console.log(props);
    const [login, setLogin] = useState('admin123');
    const [signIn] = useMutation(SIGN_IN);
    const [password, setPassword] = useState('admin123');
    const { loading, error, data: messages } = useQuery(GET_MESSAGES);

    const submitLoginCredentials = async () => {
        const { data } = await signIn({ variables: { login, password } });
        console.log(data);
        
        setToken(data.signIn.token).then(() => props.navigation.navigate('Home'));
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={{ uri: 'https://marshalldotcom.blob.core.windows.net/assets/content/uploads/f555628b-f431-466b-9ca0-5d1e8a3a1ffc.jpg?20181012135627' }} style={styles.bgImage}>
                <Text h3 style={styles.title}>Drummers.BY</Text>
                <View style={styles.loginContainer}>
                    <TextInput value={login} placeholder="Login" style={styles.input} placeholderTextColor="white" onChangeText={ (login) => setLogin(login) }/>
                    <TextInput value={password} placeholder="Password" style={styles.input} secureTextEntry={true} placeholderTextColor="white" onChangeText={ (password) => setPassword(password) }/>
                </View>
                <Button onPress={submitLoginCredentials} disabled={!login || !password} type="outline" title="LOGIN" buttonStyle={{ borderColor: 'white', borderWidth: 3, height: 55, width: 180}} titleStyle={{ color: 'white', fontWeight: '700' }}/>
            </ImageBackground>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bgImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontWeight: '900'
    },
    loginContainer: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 90,
        marginBottom: 90,
    },
    input: {
        width: 250,
        borderColor: 'white',
        borderBottomWidth: 3,
        marginTop: 15,
        marginBottom: 15,
        fontSize: 20,
        color: 'white',
    }
});