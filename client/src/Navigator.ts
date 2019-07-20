import {windowHeaderConfig, Sidebar} from './components';

import {
    createBottomTabNavigator,
    createDrawerNavigator,
    createStackNavigator,
    createAppContainer,
} from 'react-navigation';

import {
    FilterScreen,
    AboutScreen,
    FavoritesScreen,
    MapScreen,
    PoiDetailsScreen,
    PoiScreen,
    RoutesScreen,
} from './screens';

import {Routes, theme} from './consts';

const Tabs = createBottomTabNavigator({
    [Routes.MAP]: MapScreen,
    [Routes.POI]: PoiScreen,
    [Routes.ROUTES]: RoutesScreen,
    [Routes.FAVORITES]: FavoritesScreen,
}, {
    tabBarOptions: {
        showLabel: false,
        activeTintColor: theme.red,
        inactiveTintColor: theme.darkGrey,
        style: {
            height: theme.footerHeight,
        },
    },
    navigationOptions: {
        header: null,
    },
});

const Stack = createStackNavigator({
    [Routes.TABS]: Tabs,
    [Routes.POI_DETAILS]: PoiDetailsScreen,
    [Routes.FILTER]: FilterScreen,
    [Routes.ABOUT]: AboutScreen,
}, {
    headerLayoutPreset: 'center',
    defaultNavigationOptions: windowHeaderConfig,
});

const Drawer = createDrawerNavigator({
    [Routes.STACK]: Stack,
}, {
    contentComponent: Sidebar,
});

export const AppNavigator = createAppContainer(Drawer);
