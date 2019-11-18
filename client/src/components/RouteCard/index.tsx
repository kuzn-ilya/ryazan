import React from 'react';
import {useNavigation} from 'react-navigation-hooks';
import _ from 'lodash';
import * as Types from '../../types/graphql';
import {Button, IconButton} from '../buttons';
import {Card} from '../Card';
import {H2} from '../Text';
import {shareRoute} from '../../services';
import {useFavorites} from '../../providers';
import {getPrimaryPhotoUri, getShortDescription} from '../../utils';
import {Routes, theme} from '../../consts';

import {
    Subtitle,
    ActionBar,
    FlatIcons,
} from './atoms';

export type RouteCardProps = {
    route: Types.Route,
};

export const RouteCard: React.FC<RouteCardProps> = React.memo(({route}) => {
    const {id, name, description, photos} = route;
    const {navigate} = useNavigation();
    const {isFavorite, addFavorite, removeFavorite} = useFavorites();
    const photoUri = getPrimaryPhotoUri(photos);
    const shortDescription = getShortDescription(description);

    const handleShowDetails = () => navigate(Routes.ROUTE_DETAILS, {routeId: id});
    const handleShowOnMap = () => navigate(Routes.ROUTE_MAP, {routeId: id});
    const handleAddFavorite = () => addFavorite(route);
    const handleRemoveFavorite = () => removeFavorite(route);

    return (
        <Card imageUri={photoUri} onPress={handleShowDetails}>
            <H2>{name}</H2>
            <Subtitle>{shortDescription}</Subtitle>

            <ActionBar>
                <Button label="На карте" onPress={handleShowOnMap} />

                <FlatIcons>
                    <IconButton icon="share" onPress={() => shareRoute(route)} />

                    {isFavorite(route)
                        ? <IconButton icon="star-active" color={theme.red}  onPress={handleRemoveFavorite} />
                        : <IconButton icon="star" onPress={handleAddFavorite} />}
                </FlatIcons>
            </ActionBar>
        </Card>
    );
});
