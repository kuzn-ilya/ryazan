import _ from 'lodash';
import {env} from '../consts';
import * as Types from '../types/graphql';

export const getPhotoUri = (photo: Types.Photo | null): string => {
    const provider = _.get(photo, 'content.provider');
    const url = _.get(photo, 'content.url');
    const baseUrl = provider === 'local' ? env.apiUrl : '';
    return baseUrl + url;
};

export const getPrimaryPhotoUri = (photos: Types.Maybe<Types.Photo>[] | null | undefined): string =>
    (photos && photos.length) ? getPhotoUri(photos[0]!) : '';
