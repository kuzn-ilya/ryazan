import React, {useEffect} from 'react';
import {NavigationStackScreenComponent} from 'react-navigation-stack';
import {useQuery} from 'react-apollo-hooks';
import {gql} from 'apollo-boost';
import _ from 'lodash';
import * as Types from '../../types/graphql';
import {H1, Button, LoadingScreen, PhotoSwiper} from '../../components';
import {messageBox} from '../../services';
import {Routes} from '../../consts';

import {
    SafeArea,
    Container,
    Scroll,
    Footer,
    Description,
    CloseButton,
} from './atoms';

const GET_ROUTE = gql`
    query Route($id: ID!) {
        route(id: $id) {
            name
            description
            photos {
                content {
                    url
                }
            }
            routeitems(sort: "order") {
                poi {
                    name
                }
            }
        }
    }
`;

export type RouteDetailsScreenParams = {
    routeId: Types.Route['id'],
};

export const RouteDetailsScreen: NavigationStackScreenComponent<RouteDetailsScreenParams> = ({navigation}) => {
    const id = navigation.getParam('routeId');

    const {loading, data, error} = useQuery<Types.Query>(GET_ROUTE, {
        variables: {id},
    });

    useEffect(() => {
        if (error) {
            messageBox.error(error);
            navigation.goBack(null);
        }
    }, [error]);

    if (loading) {
        return <LoadingScreen />;
    }

    if (data && data.route) {
        const {name, routeitems, photos} = data.route;

        const description = routeitems!
            .map(item => `* ${item!.poi!.name}`)
            .join('\n');

        return (
            <SafeArea>
                <Container>
                    <PhotoSwiper photos={photos} />
                    <CloseButton onPress={() => navigation.goBack(null)} />

                    <Scroll bounces={false}>
                        <H1>{name}</H1>
                        <Description>{description}</Description>

                        <Footer>
                            <Button
                                label="На карте"
                                onPress={() => navigation.navigate(Routes.MAP, {poiId: id})}
                            />
                        </Footer>
                    </Scroll>
                </Container>
            </SafeArea>
        );
    }

    return null;
};
