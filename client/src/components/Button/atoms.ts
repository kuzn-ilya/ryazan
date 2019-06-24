import styled from 'styled-components/native';
import {theme} from '../../consts';

export const Container = styled.TouchableOpacity.attrs({
    activeOpacity: 0.75,
})`
    background-color: ${theme.red};
    height: 40;
    border-radius: 2;
    elevation: 5;
    justify-content: center;
    align-items: center;
`;

export const Label = styled.Text`
    color: white;
    padding-horizontal: ${theme.screenIndent};
    font-weight: bold;
    font-size: 14;
    text-transform: uppercase;
`;
