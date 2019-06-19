import {createStackNavigator, createAppContainer} from 'react-navigation';
import {HomeScreen, MapScreen} from './screens';
import {HOME, MAP} from './screens/consts';

const MainNavigator = createStackNavigator({
    [HOME]: {screen: HomeScreen},
    [MAP]: {screen: MapScreen},
});

export const AppNavigator = createAppContainer(MainNavigator);
