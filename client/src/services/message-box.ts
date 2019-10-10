import {Alert} from 'react-native';

export const info = (msg?: string) =>
    msg && Alert.alert('', msg);

export const warn = (msg?: string) =>
    msg && Alert.alert('Предупреждение', msg);

export const error = (err?: Error) =>
    err && Alert.alert('Ошибка', err.message);
