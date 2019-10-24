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
    RoutesScreen,
} from './screens';

import {windowHeaderConfig, Sidebar} from './components';
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
    headerLayoutPreset: 'center',
    defaultNavigationOptions: windowHeaderConfig,
});

const Drawer = createDrawerNavigator({
    [Routes.STACK]: {
        screen: Stack,
        path: '',
    },
}, {
    contentComponent: Sidebar,
});

export const AppNavigator = createAppContainer(Drawer);
