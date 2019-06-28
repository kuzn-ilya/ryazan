import styled from 'styled-components/native';
import {Header} from '../Header';

export const Container = styled(Header).attrs({
    statusBarStyle: 'dark-content',
})`
    background-color: white;
    elevation: 3;
`;

export const Content = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const Title = styled.Text`
    font-family: Roboto;
    font-size: 14;
    font-weight: 500;
    text-transform: uppercase;
`;
