import _ from 'lodash';
import * as Types from './types/graphql';

export const formatAddress = ({street, building}: Pick<Types.Poi, 'street' | 'building'>) => {
    const name = _.get(street, 'name');

    return `${name || ''}, ${building || ''}`;
}