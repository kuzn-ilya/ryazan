import {Alert} from 'react-native';

export const info = (message: string) =>
    Alert.alert('', message);

export const warn = (message: string) =>
    Alert.alert('Warning', message);

export const error = (err: Error) =>
    Alert.alert('Error', err.message);
