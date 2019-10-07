import React, {useEffect, useState} from 'react';
import {NavigationScreenComponent} from 'react-navigation';
import {useQuery} from 'react-apollo-hooks';
import {gql} from 'apollo-boost';
import _ from 'lodash';
import {RouteCard, createTabIcon, ScreenHeader, Filter} from '../../components';
import {messageBox} from '../../services';
import * as Types from '../../types/graphql';
import {List, Separator} from './atoms';

const GET_ROUTES = gql`
    query {
        routes(sort: "name") {
            id
            name
            description
            photos {
                content {
                    provider
                    url
                }
            }
        }
    }
`;

export const RoutesScreen: NavigationScreenComponent = () => {
    const [filter, setFilter] = useState<Filter>({search: '', categories: []});

    const {data, loading, refetch, error} = useQuery<Types.Query>(GET_ROUTES, {variables: filter});
    useEffect(_.partial(messageBox.error, error), [error]);
    const routes = ((data && data.routes) || []) as Types.Route[];

    return (
        <>
            <ScreenHeader
                title="Routes"
                filter={filter}
                onFilterChange={setFilter}
            />

            <List<Types.Route>
                keyExtractor={item => item.id}
                renderItem={({item}) => <RouteCard route={item} />}
                ItemSeparatorComponent={Separator}
                data={routes}
                refreshing={loading}
                onRefresh={refetch}
            />
        </>
    );
};

RoutesScreen.navigationOptions = {
    tabBarIcon: createTabIcon('directions-walk'),
};
