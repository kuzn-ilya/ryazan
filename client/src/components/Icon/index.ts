import { createIconSetFromIcoMoon } from '@expo/vector-icons';

export const Icon = createIconSetFromIcoMoon(
    require('./selection.json'),
    'IcoMoon',
    require('../../../assets/fonts/icomoon.ttf'),
);
