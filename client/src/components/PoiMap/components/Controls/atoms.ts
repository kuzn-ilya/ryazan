import styled from 'styled-components/native';
import {IconButton} from '../../../buttons';
import {theme} from '../../../../consts';

export const Container = styled.View`
    position: absolute;
    top: 0;
    right: 8;
    bottom: 0;
    justify-content: center;
`;

export const Panel = styled.View`
    width: 32;
    border-radius: 16;
    backgroundColor: white;
    elevation: 2;
    shadow-color: black;
    shadow-offset: 0 1px;
    shadow-opacity: 0.20;
    shadow-radius: 1.41;
`;

export const Button = styled(IconButton).attrs({
    size: 18,
    color: theme.darkGrey,
})`
    height: 53;
    width: 32;
`
