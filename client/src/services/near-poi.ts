import _ from 'lodash';
import {Notifications} from 'expo';
import {defineTask} from 'expo-task-manager';

import {
    LocationData,
    hasStartedLocationUpdatesAsync,
    startLocationUpdatesAsync,
    stopLocationUpdatesAsync
} from 'expo-location';

import * as messageBox from '../services/message-box';
import {nearPoiNotifications} from '../consts';
import * as Types from '../types/graphql';

type NearPoiTaskData = {
    locations: LocationData[],
}

type ObservedPois = {
    current: {
        poi: Types.Poi,
        inside: boolean,
    }[],
}

const observedPois: ObservedPois = {
    current: [],
}

const createAreaBounds = ({latitude, longitude}: LocationData["coords"], radius: number) => {
    const metersPerDegree = 40000000 / 360;
    const dlat = radius / metersPerDegree;
    const dlon = radius / Math.abs(metersPerDegree * Math.cos(latitude));

    const minLat = latitude - dlat;
    const maxLat = latitude + dlat;
    const minLon = longitude - dlon;
    const maxLon = longitude + dlon;

    return (poi: Types.Poi) =>
        minLat <= poi.latitude && poi.latitude <= maxLat &&
        minLon <= poi.longitude && poi.longitude <= maxLon;
}

defineTask(nearPoiNotifications.taskName, ({data, error}) => {
    if (error) {
        messageBox.error(new Error(error.message));
        return;
    }

    const {locations} = data as NearPoiTaskData;
    const location = _.maxBy(locations, 'timestamp');

    if (!location) {
        return;
    }

    const checkDistance = createAreaBounds(location.coords, nearPoiNotifications.radius);

    observedPois.current = observedPois.current.map(({poi, inside}) => {
        const currentlyInside = checkDistance(poi);

        if (!inside && currentlyInside) {
            Notifications.presentLocalNotificationAsync({
                title: 'Рязань',
                body: `Вы рядом с ${poi.name}`,
                data: poi,
                ios: {
                    sound: true,
                    _displayInForeground: true,
                },
            });
        }

        return {
            poi,
            inside: currentlyInside
        };
    });
});

export const watchPois = async (pois: Types.Poi[]) => {
    observedPois.current = _.uniqBy(pois, 'id').map(poi => ({poi, inside: false}));

    const started = await hasStartedLocationUpdatesAsync(nearPoiNotifications.taskName);

    if (observedPois.current.length && !started) {
        await startLocationUpdatesAsync(nearPoiNotifications.taskName, {
            accuracy: nearPoiNotifications.accuracy,
        });
    }

    if (!observedPois.current.length && started) {
        await stopLocationUpdatesAsync(nearPoiNotifications.taskName);
    }
}
