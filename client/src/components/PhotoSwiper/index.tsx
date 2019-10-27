import React from 'react';
import * as Types from '../../types/graphql';
import {getPhotoUri} from '../../utils';
import {Container, Photo} from './atoms';

export type PhotoSwiperProps = {
    photos: Types.Poi['photos'],
};

export const PhotoSwiper: React.FC<PhotoSwiperProps> = ({photos}) => {
    const uris = (photos || []).map(getPhotoUri);

    return (
        <Container>
            {uris.map(uri => <Photo key={uri} source={{uri}} />)}
        </Container>
    );
};
