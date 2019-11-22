import React, {useState} from 'react';
import {View, ListRenderItem} from 'react-native';
import {NavigationBottomTabScreenComponent} from 'react-navigation-tabs';
import _ from 'lodash';
import {windowHeaderConfig} from '../../components';
import {EmptyList} from './components';

import {
    createTabIcon,
    PoiCard,
    RouteCard,
    ScreenHeader,
    PoiCardAction,
} from '../../components';

import {Favorite, useFavorites, useFilter} from '../../providers';
import {List, Separator} from './atoms';
import {filterFavorites} from './utils';

export const FavoritesScreen: NavigationBottomTabScreenComponent = () => {
    const [filter, setFilter] = useFilter();
    const {favorites} = useFavorites();
    const data = _.sortBy(filterFavorites(favorites, filter), 'name');

    const reanderItem: ListRenderItem<Favorite> = ({item}) => {
        switch (item.__typename) {
            case 'Poi':
                return <PoiCard poi={item} action={PoiCardAction.ShowOnMap} />;
            case 'Route':
                return <RouteCard route={item} />;
            default:
                return <View />;
        }
    };

    return (
        <>
            <ScreenHeader
                title="Избранное"
                enableFilter
                filter={filter}
                onFilterChange={setFilter}
            />

            {data.length
                ? <List<Favorite>
                    keyExtractor={item => item.id}
                    renderItem={reanderItem}
                    ItemSeparatorComponent={Separator}
                    data={data}
                />
                : <EmptyList />
            }
        </>
    );
};

FavoritesScreen.navigationOptions = {
    tabBarIcon: createTabIcon('star'),
    ...windowHeaderConfig,
};
