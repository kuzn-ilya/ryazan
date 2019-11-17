import styled from 'styled-components/native';
import {theme} from '../../../../consts';

export const Circle = styled.View`
    width: 50;
    height: 50;
    border-radius: 25;
    justify-content: center;
    align-items: center;
    background-color: ${theme.red};
`

export const Label = styled.Text`
    font-family: "PT Sans";
    font-weight: bold;
    font-size: 12;
    color: white;
`
