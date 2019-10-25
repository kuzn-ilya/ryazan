import {Share} from 'react-native';
import _ from 'lodash';
import {env} from '../consts'
import * as Types from '../types/graphql';

export const sharePoi = ({id, name}: Types.Poi) =>
    Share.share({
        title: name,
        message: `${env.deeplinkUrl}/pois/${id}`,
    });
