import React, {useEffect} from 'react';
import {NavigationStackScreenComponent} from 'react-navigation-stack';
import {useQuery} from 'react-apollo-hooks';
import {gql} from 'apollo-boost';
import _ from 'lodash';
import * as Types from '../../types/graphql';
import {FooterButton, LoadingScreen, PhotoSwiper} from '../../components';
import {messageBox} from '../../services';
import {Routes} from '../../consts';
import {formatAddress} from '../../utils';

import {
    Container,
    Scroll,
    Content,
    Title,
    Subtitle,
    Description,
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
        const {name, description, photos, street, building} = data.poi;

        return (
            <Container>
                <Scroll bounces={false}>
                    <PhotoSwiper photos={photos} />

                    <Content>
                        <Title>{name}</Title>
                        <Subtitle>{formatAddress({street, building})}</Subtitle>
                        <Description>{description}</Description>
                    </Content>
                </Scroll>

                <FooterButton
                    label="На карте"
                    onPress={() => navigation.navigate(Routes.MAP, {poiId: id})}
                />
            </Container>
        );
    }

    return null;
};
