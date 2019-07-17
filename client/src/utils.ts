import _ from 'lodash';
import {env} from './consts';
import * as Types from './types/graphql';

export const formatAddress = ({street, building}: Pick<Types.Poi, 'street' | 'building'>) =>
    [_.get(street, 'name'), building]
        .filter(Boolean)
        .join(', ');

export const getPhotoUri = (photos: Types.Maybe<Types.Photo>[] | null | undefined): string => {
    const provider = _.get(photos, '0.content.provider');
    const url = _.get(photos, '0.content.url');
    const baseUrl = provider === 'local' ? env.apiUrl : '';
    return baseUrl + url;
};
