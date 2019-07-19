import styled from 'styled-components/native';
import {theme} from '../../../../consts';

export const Container = styled.View`
    flex: 1;
    background-color: ${theme.windowHeaderColor};
    justify-content: center;
    align-items: center;
`;

export const Message = styled.Text`
    font-size: 16;
    line-height: 28;
    color: white;
`;
