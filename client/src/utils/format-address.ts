import _ from 'lodash';
import * as Types from '../types/graphql';

export const formatAddress = ({street, building}: Pick<Types.Poi, 'street' | 'building'>) =>
    [_.get(street, 'name'), building]
        .filter(Boolean)
        .join(', ');
