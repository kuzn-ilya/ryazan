import styled from 'styled-components/native';
import {IconButton} from '../buttons';
import {Header} from '../Header';
import {theme} from '../../consts';

export const Container = styled(Header)`
    background-color: white;
    ${theme.defaultShadow}
`;

export const Content = styled.View`
    flex: 1;
    justify-content: center;
    align-items: flex-start;
`;

export const Title = styled.Text`
    font-family: "PT Sans";
    font-size: 17;
    text-transform: uppercase;
    padding-left: 10;
`;

export const SearchInput = styled.TextInput`
    width: 100%;
    border-bottom-width: 2;
    border-bottom-color: ${theme.lightGrey}
`;

export const Button = styled(IconButton).attrs({
    size: 26,
})`
    aspect-ratio: 1;
`
