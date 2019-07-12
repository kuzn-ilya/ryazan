import styled from 'styled-components/native';
import {Header} from '../Header';
import {theme} from '../../consts';

export const Container = styled(Header)`
    background-color: white;
    ${theme.defaultShadow}
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

export const SearchInput = styled.TextInput`
    width: 100%;
    border-bottom-width: 2;
    border-bottom-color: ${theme.lightGrey}
`;
