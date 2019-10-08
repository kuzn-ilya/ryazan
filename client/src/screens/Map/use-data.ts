import {useQuery} from 'react-apollo-hooks';
import {gql, ApolloError} from 'apollo-boost';
import _ from 'lodash';
import {Filter} from '../../components';
import * as Types from '../../types/graphql';

const POI_INFO = `
    id
    name
    description
    latitude
    longitude
    building
    street {
        name
    }
    photos {
        content {
            url
        }
    }
`

const GET_POIS = gql`
    query($search: String!) {
        pois(
            where: {
                name_contains: $search
            }
        ) {
            ${POI_INFO}
        }
    }
`;

const GET_ROUTE = gql`
    query($id: ID!) {
        route(id: $id) {
            id
            name
            routeitems(sort: "order") {
                poi {
                    ${POI_INFO}
                }
            }
        }
    }
`

type UseDataArgs = {
    routeId: Types.Route['id'],
    filter: Filter,
}

type UseDataResult = {
    loading: boolean,
    isRoute: boolean,
    error?: ApolloError,
    pois: Types.Poi[],
}

export const useData = ({routeId, filter}: UseDataArgs): UseDataResult => {
    if (routeId) {
        const {data, loading, error} = useQuery<Types.Query>(GET_ROUTE, {variables: {id: routeId}});

        const routeitems = _.get(data, 'route.routeitems', []) as Types.Routeitem[];
        const pois = _.map(routeitems, 'poi') as Types.Poi[];

        return {
            loading,
            error,
            isRoute: true,
            pois,
        };
    } else {
        const {data, loading, error} = useQuery<Types.Query>(GET_POIS, {variables: filter});

        return {
            loading,
            error,
            isRoute: false,
            pois: _.get(data, 'pois', []) as Types.Poi[],
        }
    }
}
