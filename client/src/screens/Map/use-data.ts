import {useMemo} from 'react';
import {useQuery} from 'react-apollo-hooks';
import {gql, ApolloError} from 'apollo-boost';
import _ from 'lodash';
import {POI_INFO, ROUTE_INFO} from '../../consts';
import {Filter, formatPoiGqlFilter} from '../../utils';
import * as Types from '../../types/graphql';

const GET_POIS = gql`
    query($where: JSON!) {
        pois(where: $where) {
            ${POI_INFO}
        }
    }
`;

const GET_ROUTE = gql`
    query($id: ID!) {
        route(id: $id) {
            ${ROUTE_INFO}
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

        const pois = useMemo(() => {
            const routeitems = _.get(data, 'route.routeitems', []) as Types.Routeitem[];
            return _.map(routeitems, 'poi') as Types.Poi[];
        }, [data]);

        return {
            loading,
            error,
            isRoute: true,
            pois,
        };
    } else {
        const where = formatPoiGqlFilter(filter);
        const {data, loading, error} = useQuery<Types.Query>(GET_POIS, {variables: {where}});

        const pois = useMemo(
            () => _.get(data, 'pois', []) as Types.Poi[],
            [data],
        );

        return {
            loading,
            error,
            isRoute: false,
            pois,
        }
    }
}
