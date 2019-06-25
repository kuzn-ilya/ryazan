import React, {useEffect} from 'react';
import {NavigationScreenComponent} from 'react-navigation';
import {useQuery} from 'react-apollo-hooks';
import {gql} from 'apollo-boost';
import {PoiCard, createTabIcon} from '../../components';
import {messageBox} from '../../services';
import * as Types from '../../types/graphql';
import {List, Separator} from './atoms';

const GET_POIS = gql`
    query {
        pois {
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
    const {data, loading, refetch, error} = useQuery<Types.Query>(GET_POIS);

    useEffect(() => {
        if (error) {
            messageBox.error(error);
        }
    }, [error]);

    if (!(data && data.pois)) {
        return null;
    }

    return (
        <List<Types.Poi>
            keyExtractor={item => item.id}
            renderItem={({item}) => <PoiCard poi={item} />}
            ItemSeparatorComponent={Separator}
            data={data.pois as Types.Poi[]}
            refreshing={loading}
            onRefresh={refetch}
        />
    );
};

PoiScreen.navigationOptions = {
    tabBarIcon: createTabIcon('format-list-bulleted'),
};
