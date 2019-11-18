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
    Description,
    CloseButton,
    Footer,
} from './atoms';

const GET_POI = gql`
    query Poi($id: ID!) {
        poi(id: $id) {
            name
            description
            building
            street {
                name
            }
            photos {
                content {
                    url
                }
            }
        }
    }
`;

export type PoiDetailsScreenParams = {
    poiId: Types.Poi['id'],
};

export const PoiDetailsScreen: NavigationStackScreenComponent<PoiDetailsScreenParams> = ({navigation}) => {
    const id = navigation.getParam('poiId');

    const {loading, data, error} = useQuery<Types.Query>(GET_POI, {
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

    if (data && data.poi) {
        const {name, description, photos} = data.poi;

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
