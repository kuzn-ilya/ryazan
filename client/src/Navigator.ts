import {windowHeaderConfig, Sidebar} from './components';

import {
    createBottomTabNavigator,
    createDrawerNavigator,
    createStackNavigator,
    createAppContainer,
} from 'react-navigation';

import {
    FilterScreen,
    HistoryScreen,
    AboutScreen,
    FavoritesScreen,
    MapScreen,
    PoiDetailsScreen,
    PoisScreen,
    RouteDetailsScreen,
    RoutesScreen,
} from './screens';

import {Routes, theme} from './consts';

const Tabs = createBottomTabNavigator({
    [Routes.MAP]: MapScreen,
    [Routes.POIS]: PoisScreen,
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
    [Routes.ROUTE_DETAILS]: RouteDetailsScreen,
    [Routes.FILTER]: FilterScreen,
    [Routes.HISTORY]: HistoryScreen,
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
