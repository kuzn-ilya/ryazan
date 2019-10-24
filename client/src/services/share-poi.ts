import {Linking} from 'expo';
import {Share} from 'react-native';
import _ from 'lodash';
import * as Types from '../types/graphql';

export const sharePoi = ({id, name}: Types.Poi) =>
    Share.share({
        title: name,
        message: Linking.makeUrl(`/pois/${id}`),
    });
