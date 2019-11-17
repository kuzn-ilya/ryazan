import React from 'react';
import * as Types from '../../types/graphql';
import {getPhotoUri} from '../../utils';
import {Container, Swiper, Photo} from './atoms';

export type PhotoSwiperProps = {
    photos: Types.Poi['photos'],
};

export const PhotoSwiper: React.FC<PhotoSwiperProps> = ({photos}) => {
    const uris = (photos || []).map(getPhotoUri);

    return (
        <Container>
            <Swiper>
                {uris.map(uri => <Photo key={uri} source={{uri}} />)}
            </Swiper>
        </Container>
    );
};
