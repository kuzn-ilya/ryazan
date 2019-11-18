import styled from 'styled-components/native';
import {theme} from '../../consts';

export const Container = styled.TouchableOpacity.attrs({
    activeOpacity: 0.75,
})`
    flex-direction: row;
    height: 40;
    align-items: center;
`;

export const Label = styled.Text`
    color: black;
    padding-left: ${theme.screenIndent}px;
`;
