import React, {useEffect} from 'react';
import {NavigationScreenComponent} from 'react-navigation';
import {useQuery} from 'react-apollo-hooks';
import {gql} from 'apollo-boost';
import _ from 'lodash';
import * as Types from '../../types/graphql';
import {FooterButton, LoadingScreen} from '../../components';
import {messageBox} from '../../services';
import {Routes} from '../../consts';
import {formatAddress, getPhotoUri} from '../../utils';

import {
    Container,
    Scroll,
    Picture,
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

export const PoiDetailsScreen: NavigationScreenComponent<PoiDetailsScreenParams> = ({navigation}) => {
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

        const photoUri = getPhotoUri(photos);
        const descriptionLines = (description || '').split('\n');

        return (
            <Container>
                <Scroll bounces={false}>
                    <Picture source={{uri: photoUri}} />

                    <Content>
                        <Title>{name}</Title>
                        <Subtitle>{formatAddress({street, building})}</Subtitle>
                        {descriptionLines.map(line => <Description key={line}>{line}</Description>)}
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
