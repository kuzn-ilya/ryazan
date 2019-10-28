import React, {useEffect} from 'react';
import {NavigationStackScreenComponent} from 'react-navigation-stack';
import {useQuery} from 'react-apollo-hooks';
import {gql} from 'apollo-boost';
import _ from 'lodash';
import * as Types from '../../types/graphql';
import {FooterButton, LoadingScreen, PhotoSwiper} from '../../components';
import {messageBox} from '../../services';
import {Routes} from '../../consts';

import {
    Container,
    Scroll,
    Content,
    Title,
    Description,
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
        const {name, description, photos} = data.route;

        return (
            <Container>
                <Scroll bounces={false}>
                    <PhotoSwiper photos={photos} />

                    <Content>
                        <Title>{name}</Title>
                        <Description>{description}</Description>
                    </Content>
                </Scroll>

                <FooterButton
                    label="На карте"
                    onPress={() => navigation.navigate(Routes.MAP, {routeId: id})}
                />
            </Container>
        );
    }

    return null;
};
