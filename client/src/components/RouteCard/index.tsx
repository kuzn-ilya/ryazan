import React from 'react';
import {useNavigation} from 'react-navigation-hooks';
import _ from 'lodash';
import * as Types from '../../types/graphql';
import {Button} from '../Button';
import {IconButton} from '../IconButton';
import {Card} from '../Card';
import {useFavorites} from '../../providers';
import {getPrimaryPhotoUri} from '../../utils';
import {Routes, theme} from '../../consts';

import {
    Title,
    Subtitle,
    ActionBar,
    Content,
    LeftColumn,
    RightColumn,
} from './atoms';

export type RouteCardProps = {
    route: Types.Route,
};

export const RouteCard: React.FC<RouteCardProps> = React.memo(({route}) => {
    const {id, name, description, photos} = route;
    const {navigate} = useNavigation();
    const {isFavorite, addFavorite, removeFavorite} = useFavorites();
    const photoUri = getPrimaryPhotoUri(photos);

    const handleShowDetails = () => navigate(Routes.ROUTE_DETAILS, {routeId: id});
    const handleShowOnMap = () => navigate(Routes.MAP, {routeId: id});
    const handleAddFavorite = () => addFavorite(route);
    const handleRemoveFavorite = () => removeFavorite(route);

    return (
        <Card imageUri={photoUri} onPress={handleShowDetails}>
            <Content>
                <LeftColumn>
                    <Title>{name}</Title>
                    <Subtitle>{description}</Subtitle>
                </LeftColumn>
                <RightColumn>
                    {isFavorite(route)
                        ? <IconButton icon="favorite" color={theme.red}  onPress={handleRemoveFavorite} />
                        : <IconButton icon="favorite-border" onPress={handleAddFavorite} />}
                </RightColumn>
            </Content>

            <ActionBar>
                <Button label="На карте" onPress={handleShowOnMap} />
                <Button label="Подробнее" onPress={handleShowDetails} />
            </ActionBar>
        </Card>
    );
});
