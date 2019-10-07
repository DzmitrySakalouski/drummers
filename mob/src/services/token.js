import AsyncStorage from '@react-native-community/async-storage';

export const setToken = async token => {
    try {
        await AsyncStorage.setItem('token', token);
    } catch (err) {
        return err;
    }
}

export const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        return token;
    } catch (err) {
        return err;
    }
}