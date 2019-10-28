import Swiper from 'react-native-swiper';
import styled from 'styled-components/native';
import { theme } from '../../consts';

export const Container = styled(Swiper).attrs({
    activeDotColor: theme.red,
})`
    width: 100%;
    height: 230;
`;

export const Photo = styled.Image`
    width: 100%;
    height: 230;
`;
