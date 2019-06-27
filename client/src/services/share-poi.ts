import {Share} from 'react-native';
import * as Types from '../types/graphql';

export const sharePoi = ({name}: Types.Poi) =>
    Share.share({
        title: name,
        message: `Check out ${name} at <address>`, // TODO: add poi address
    });
