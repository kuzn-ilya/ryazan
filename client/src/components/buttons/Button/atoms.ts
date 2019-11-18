import styled from 'styled-components/native';
import {theme} from '../../../consts';

export const Container = styled.TouchableOpacity.attrs({
    activeOpacity: 0.75,
})`
    background-color: ${theme.red};
    height: 41;
    border-radius: 20.5;
    justify-content: center;
    align-items: center;
    elevation: 5;
    shadow-color: black;
    shadow-offset: 0 2px;
    shadow-opacity: 0.25;
    shadow-radius: 3.84;
`;

export const Label = styled.Text`
    color: white;
    padding-horizontal: 22;
    font-family: "PT Sans";
    font-size: 16;
    text-transform: uppercase;
`;
