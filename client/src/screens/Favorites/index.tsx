import React, {useState} from 'react';
import {View, ListRenderItem} from 'react-native';
import {NavigationScreenComponent} from 'react-navigation';
import _ from 'lodash';

import {
    createTabIcon,
    PoiCard,
    RouteCard,
    ScreenHeader,
    Filter,
    PoiCardAction,
} from '../../components';

import {Favorite, useFavorites} from '../../providers';
import {List, Separator} from './atoms';

export const FavoritesScreen: NavigationScreenComponent = () => {
    const [filter, setFilter] = useState<Filter>({search: '', categories: []});
    const {favorites} = useFavorites();

    const data = _(favorites)
        .filter(item => item.name.includes(filter.search))
        .sortBy('name')
        .value();

    const reanderItem: ListRenderItem<Favorite> = ({item}) => {
        switch (item.__typename) {
            case 'Poi':
                return <PoiCard poi={item} action={PoiCardAction.ShowDetails} />;
            case 'Route':
                return <RouteCard route={item} />;
            default:
                return <View />;
        }
    };

    return (
        <>
            <ScreenHeader
                title="Favorites"
                filter={filter}
                onFilterChange={setFilter}
            />

            <List<Favorite>
                keyExtractor={item => item.id}
                renderItem={reanderItem}
                ItemSeparatorComponent={Separator}
                data={data}
            />
        </>
    );
};

FavoritesScreen.navigationOptions = {
    tabBarIcon: createTabIcon('stars'),
};
