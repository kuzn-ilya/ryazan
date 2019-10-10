import React, {useState} from 'react';
import {View, ListRenderItem} from 'react-native';
import {NavigationBottomTabScreenComponent} from 'react-navigation-tabs';
import _ from 'lodash';
import {EmptyList} from './components';

import {
    createTabIcon,
    PoiCard,
    RouteCard,
    ScreenHeader,
    PoiCardAction,
} from '../../components';

import {Favorite, useFavorites} from '../../providers';
import {Filter} from '../../utils';
import {List, Separator} from './atoms';
import {filterFavorites} from './utils';

export const FavoritesScreen: NavigationBottomTabScreenComponent = () => {
    const [filter, setFilter] = useState<Filter>({search: '', categories: null});
    const {favorites} = useFavorites();
    const data = _.sortBy(filterFavorites(favorites, filter), 'name');

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
                title="Избранное"
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
    tabBarIcon: createTabIcon('stars'),
};
