import React, {useEffect, useState} from 'react';
import {NavigationBottomTabScreenComponent} from 'react-navigation-tabs';
import {useQuery} from 'react-apollo-hooks';
import {gql} from 'apollo-boost';
import _ from 'lodash';
import {PoiCard, createTabIcon, ScreenHeader} from '../../components';
import {messageBox} from '../../services';
import {useFilter} from '../../providers';
import * as Types from '../../types/graphql';
import {List, Separator} from './atoms';
import {formatPoiGqlFilter} from '../../utils';

const GET_POIS = gql`
    query($where: JSON!) {
        pois(where: $where, sort: "name") {
            id
            name
            description
            photos {
                content {
                    url
                }
            }
            category {
                id
                name
            }
        }
    }
`;

export const PoisScreen: NavigationBottomTabScreenComponent = () => {
    const [filter, setFilter] = useFilter();

    const where = formatPoiGqlFilter(filter);
    const {data, loading, refetch, error} = useQuery<Types.Query>(GET_POIS, {variables: {where}});
    useEffect(_.partial(messageBox.error, error), [error]);
    const pois = ((data && data.pois) || []) as Types.Poi[];

    return (
        <>
            <ScreenHeader
                title="Что посмотреть"
                enableFilter
                filter={filter}
                onFilterChange={setFilter}
            />

            <List<Types.Poi>
                keyExtractor={item => item.id}
                renderItem={({item}) => <PoiCard poi={item} />}
                ItemSeparatorComponent={Separator}
                data={pois}
                refreshing={loading}
                onRefresh={refetch}
            />
        </>
    );
};

PoisScreen.navigationOptions = {
    tabBarIcon: createTabIcon('pois'),
};
