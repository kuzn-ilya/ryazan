import {Share} from 'react-native';
import _ from 'lodash';
import * as Types from '../types/graphql';
import {formatAddress} from '../utils';

export const sharePoi = ({name, street, building}: Types.Poi) =>
    Share.share({
        title: name,
        message: `Check out ${name} at ${formatAddress({street, building})}`,
    });
