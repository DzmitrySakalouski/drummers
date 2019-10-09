import AsyncStorage from '@react-native-community/async-storage';

export const setToken = async params => {
    try {
        await AsyncStorage.setItem('token', params.token);
        await AsyncStorage.setItem('userId', params.id);
    } catch (err) {
        return err;
    }
}

export const getUserToken = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        const id = await AsyncStorage.getItem('userId');
        return {token, id};
    } catch (err) {
        return err;
    }
}

export const getId = async () => {
    try {
        const id = await AsyncStorage.getItem('userId');
        return id;
    } catch (err) {
        return err;
    }
}