import React, {useEffect} from 'react';
import {NavigationScreenComponent} from 'react-navigation';
import {useQuery} from 'react-apollo-hooks';
import {gql} from 'apollo-boost';
import _ from 'lodash';
import * as Types from '../../types/graphql';
import {FooterButton, LoadingScreen} from '../../components';
import {messageBox} from '../../services';
import {Routes} from '../../consts';
import {getPhotoUri} from '../../utils';

import {
    Container,
    Scroll,
    Picture,
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

export const RouteDetailsScreen: NavigationScreenComponent<RouteDetailsScreenParams> = ({navigation}) => {
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
        const photoUri = getPhotoUri(photos);

        return (
            <Container>
                <Scroll bounces={false}>
                    <Picture source={{uri: photoUri}} />

                    <Content>
                        <Title>{name}</Title>
                        <Description>{description}</Description>)}
                    </Content>
                </Scroll>

                <FooterButton
                    label="Show on map"
                    onPress={() => navigation.navigate(Routes.MAP, {routeId: id})}
                />
            </Container>
        );
    }

    return null;
};
