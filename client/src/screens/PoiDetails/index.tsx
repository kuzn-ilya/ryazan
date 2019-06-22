import React, {useEffect} from 'react';
import {NavigationScreenComponent} from 'react-navigation';
import {useQuery} from 'react-apollo-hooks';
import {gql} from 'apollo-boost';
import _ from 'lodash';
import * as Types from '../../types/graphql';
import {FooterButton, LoadingScreen, WindowHeader} from '../../components';
import {Routes, env} from '../../consts';

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
            console.error(error); // TODO: show error via error service
            navigation.goBack(null);
        }
    }, [error]);

    if (loading) {
        return <LoadingScreen />;
    }

    if (data && data.poi) {
        const {name, description, photos} = data.poi;
        const photoUri = env.apiUrl + _.get(photos, '0.content.url');
        const descriptionLines = (description || '').split('\n');

        return (
            <Container>
                <Scroll bounces={false}>
                    <Picture source={{uri: photoUri}} />

                    <Content>
                        <Title>{name}</Title>
                        <Subtitle>Here goes the address</Subtitle>
                        {descriptionLines.map(line => <Description key={line}>{line}</Description>)}
                    </Content>
                </Scroll>

                <FooterButton
                    label="Show on map"
                    onPress={() => navigation.navigate(Routes.MAP)}
                />
            </Container>
        );
    }

    return null;
};

PoiDetailsScreen.navigationOptions = {
    header: WindowHeader,
};
