import _ from 'lodash';
import {useEffect} from 'react';
import {NavigationContainerComponent, NavigationActions} from 'react-navigation';
import {Notifications} from 'expo';
import {useFavorites} from '../providers';
import {Routes, nearPoiNotifications} from '../consts';
import {messageBox, nearPoi as nearPoiService} from '../services';
import * as Types from '../types/graphql';

export const useNearPoiNotifications = (navigator: React.RefObject<NavigationContainerComponent>) => {
    if (!nearPoiNotifications.enable) {
        return;
    }

    const {favorites} = useFavorites();

    useEffect(() => {
        const pois = _.flatMap(favorites, fav => {
            if (fav.__typename === 'Route') {
                return fav.routeitems!.map(item => item!.poi!);
            }

            return fav as Types.Poi;
        });

        nearPoiService.watchPois(pois).catch(messageBox.error);
    }, [favorites]);

    useEffect(() => {
        const sub = Notifications.addListener(({origin, data}) => {
            if (origin === 'selected' && navigator.current) {
                navigator.current.dispatch(
                    NavigationActions.navigate({
                        routeName: Routes.POI_DETAILS,
                        params: {poiId: data.id},
                    })
                );
            }
        });

        return () => sub.remove();
    }, []);
};
