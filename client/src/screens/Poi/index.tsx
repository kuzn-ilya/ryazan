import React, {useEffect, useState} from 'react';
import {NavigationScreenComponent} from 'react-navigation';
import {useQuery} from 'react-apollo-hooks';
import {gql} from 'apollo-boost';
import _ from 'lodash';
import {PoiCard, createTabIcon, ScreenHeader, Filter} from '../../components';
import {messageBox} from '../../services';
import * as Types from '../../types/graphql';
import {List, Separator} from './atoms';

const GET_POIS = gql`
    query {
        pois(sort: "name") {
            id
            name
            description
            photos {
                content {
                    url
                }
            }
        }
    }
`;

export const PoiScreen: NavigationScreenComponent = () => {
    const [filter, setFilter] = useState<Filter>({search: '', categories: []});

    const {data, loading, refetch, error} = useQuery<Types.Query>(GET_POIS, {variables: filter});
    useEffect(_.partial(messageBox.error, error), [error]);

    if (!(data && data.pois)) {
        return null;
    }

    return (
        <>
            <ScreenHeader
                title="What to see"
                filter={filter}
                onFilterChange={setFilter}
            />

            <List<Types.Poi>
                keyExtractor={item => item.id}
                renderItem={({item}) => <PoiCard poi={item} />}
                ItemSeparatorComponent={Separator}
                data={data.pois as Types.Poi[]}
                refreshing={loading}
                onRefresh={refetch}
            />
        </>
    );
};

PoiScreen.navigationOptions = {
    tabBarIcon: createTabIcon('format-list-bulleted'),
};
