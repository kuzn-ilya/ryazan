import React from 'react';
import {useNavigation} from 'react-navigation-hooks';
import _ from 'lodash';
import * as Types from '../../types/graphql';
import {Button} from '../Button';
import {IconButton} from '../IconButton';
import {Card} from '../Card';
import {Routes, env} from '../../consts';

import {
    Title,
    Subtitle,
    ActionBar,
    FlatIcons,
} from './atoms';

export type PoiCardProps = {
    poi: Types.Poi,
};

export const PoiCard: React.FC<PoiCardProps> = ({
    poi: {id, name, description, photos},
}) => {
    const {navigate} = useNavigation();

    const handlePress = () => navigate(Routes.POI_DETAILS, {poiId: id});
    const handleShowOnMap = () => navigate(Routes.MAP, {poiId: id});
    const handleShare = () => console.warn('Not yet implemented');
    const handleFavorite = () => console.warn('Not yet implemented');

    const photoUri = env.apiUrl + _.get(photos, '0.content.url');
    const descriptionLine = description!.split('\n')[0];

    return (
        <Card imageUri={photoUri} onPress={handlePress}>
            <Title>{name}</Title>
            <Subtitle>{descriptionLine}</Subtitle>

            <ActionBar>
                <Button label="Show on map" onPress={handleShowOnMap} />
                <FlatIcons>
                    <IconButton icon="share" onPress={handleShare} />
                    <IconButton icon="favorite-border" onPress={handleFavorite} />
                </FlatIcons>
            </ActionBar>
        </Card>
    );
};
