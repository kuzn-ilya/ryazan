import RNSwiper from 'react-native-swiper';
import styled from 'styled-components/native';

export const Container = styled.View`
    height: 250;
    width: 100%;
`

export const Swiper = styled(RNSwiper).attrs({
    activeDotColor: 'white',
    paginationStyle: {
        marginBottom: 5,
    },
    dotStyle: {
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: 1,
    },
})``;

export const Photo = styled.Image`
    height: 250;
`;
