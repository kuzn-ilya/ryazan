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

export enum PoiCardAction {
    ShowOnMap,
    ShowDetails,
};

export type PoiCardProps = {
    poi: Types.Poi,
    action?: PoiCardAction,
};

export const PoiCard: React.FC<PoiCardProps> = ({
    poi: {id, name, description, photos},
    action = PoiCardAction.ShowOnMap,
}) => {
    const {navigate} = useNavigation();

    const handleShowDetails = () => navigate(Routes.POI_DETAILS, {poiId: id});
    const handleShowOnMap = () => navigate(Routes.MAP, {poiId: id});
    const handleShare = () => console.warn('Not yet implemented');
    const handleFavorite = () => console.warn('Not yet implemented');

    const photoUri = env.apiUrl + _.get(photos, '0.content.url');
    const descriptionLine = description!.split('\n')[0];

    return (
        <Card imageUri={photoUri} onPress={handleShowDetails}>
            <Title>{name}</Title>
            <Subtitle>{descriptionLine}</Subtitle>

            <ActionBar>
                {action === PoiCardAction.ShowOnMap &&
                    <Button label="Show on map" onPress={handleShowOnMap} />}
                {action === PoiCardAction.ShowDetails &&
                    <Button label="Show details" onPress={handleShowDetails} />}

                <FlatIcons>
                    <IconButton icon="share" onPress={handleShare} />
                    <IconButton icon="favorite-border" onPress={handleFavorite} />
                </FlatIcons>
            </ActionBar>
        </Card>
    );
};
