import styled from 'styled-components/native';
import {theme} from '../../../../consts';

export const Container = styled.TouchableOpacity.attrs({
    activeOpacity: 0.75,
})`
    height: 55;
    justify-content: center;
    align-items: flex-start;
`;

export const Label = styled.Text`
    font-family: Roboto;
    font-size: 16;
    color: black;
    opacity: 0.87;
    padding-horizontal: ${theme.screenIndent};
`;
