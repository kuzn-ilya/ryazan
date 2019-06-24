import styled from 'styled-components/native';
import {theme} from '../../consts';

export const Container = styled.TouchableOpacity.attrs({
    activeOpacity: 1,
})`
    background-color: white;
    width: 100%;
    height: 50;
    justify-content: center;
    align-items: center;
    ${theme.footerShadow}
`;

export const Label = styled.Text`
    color: ${theme.red};
    font-weight: bold;
    text-transform: uppercase;
`;
