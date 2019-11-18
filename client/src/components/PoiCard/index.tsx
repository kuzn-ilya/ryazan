import React from 'react';
import {useNavigation} from 'react-navigation-hooks';
import _ from 'lodash';
import * as Types from '../../types/graphql';
import {Button, IconButton} from '../buttons';
import {Card} from '../Card';
import {H2} from '../Text';
import {sharePoi} from '../../services';
import {useFavorites} from '../../providers';
import {getPrimaryPhotoUri, getShortDescription} from '../../utils';
import {Routes, theme} from '../../consts';

import {
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

export const PoiCard: React.FC<PoiCardProps> = React.memo(({poi, action}) => {
    const {id, name, description, photos} = poi;
    const {navigate} = useNavigation();
    const {isFavorite, addFavorite, removeFavorite} = useFavorites();
    const photoUri = getPrimaryPhotoUri(photos);
    const shortDescription = getShortDescription(description);

    const handleShowDetails = () => navigate(Routes.POI_DETAILS, {poiId: id});
    const handleShowOnMap = () => navigate(Routes.MAP, {poiId: id});
    const handleAddFavorite = () => addFavorite(poi);
    const handleRemoveFavorite = () => removeFavorite(poi);

    return (
        <Card imageUri={photoUri} onPress={handleShowDetails}>
            <H2>{name}</H2>
            <Subtitle>{shortDescription}</Subtitle>

            <ActionBar>
                {action === PoiCardAction.ShowOnMap &&
                    <Button label="На карте" onPress={handleShowOnMap} />}
                {action === PoiCardAction.ShowDetails &&
                    <Button label="Подробнее" onPress={handleShowDetails} />}

                <FlatIcons>
                    <IconButton icon="share" onPress={() => sharePoi(poi)} />
                    {isFavorite(poi)
                        ? <IconButton icon="star-active" color={theme.red}  onPress={handleRemoveFavorite} />
                        : <IconButton icon="star" onPress={handleAddFavorite} />}
                </FlatIcons>
            </ActionBar>
        </Card>
    );
});

PoiCard.defaultProps = {
    action: PoiCardAction.ShowOnMap,
};
