import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';

import {
    FilterScreen,
    HistoryScreen,
    AboutScreen,
    FavoritesScreen,
    MapScreen,
    PoiDetailsScreen,
    PoisScreen,
    RouteDetailsScreen,
    RouteMapScreen,
    RoutesScreen,
} from './screens';

import {Sidebar} from './components';
import {Routes, theme} from './consts';

const Tabs = createBottomTabNavigator({
    [Routes.MAP]: MapScreen,
    [Routes.POIS]: PoisScreen,
    [Routes.ROUTES]: RoutesScreen,
    [Routes.FAVORITES]: FavoritesScreen,
    [Routes.ROUTE_MAP]: RouteMapScreen,
}, {
    tabBarOptions: {
        showLabel: false,
        activeTintColor: theme.red,
        inactiveTintColor: theme.red,
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
    [Routes.POI_DETAILS]: {
        screen: PoiDetailsScreen,
        path: 'pois/:poiId',
    },
    [Routes.ROUTE_DETAILS]: {
        screen: RouteDetailsScreen,
        path: 'routes/:routeId',
    },
    [Routes.FILTER]: FilterScreen,
    [Routes.HISTORY]: HistoryScreen,
    [Routes.ABOUT]: AboutScreen,
}, {
    headerMode: 'none',
    headerLayoutPreset: 'center',
});

const Drawer = createDrawerNavigator({
    [Routes.STACK]: {
        screen: Stack,
        path: '',
    },
}, {
    drawerWidth: 261,
    drawerBackgroundColor: 'transparent',
    contentComponent: Sidebar,
});

export const AppNavigator = createAppContainer(Drawer);
