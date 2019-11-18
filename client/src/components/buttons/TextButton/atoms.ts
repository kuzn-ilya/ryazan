import styled from 'styled-components/native';
import {theme} from '../../../consts';

export const Container = styled.TouchableOpacity.attrs({
    activeOpacity: 0.75,
})`
    padding-bottom: 14;
    justify-content: center;
`;

export const Label = styled.Text`
    color: ${theme.blue};
    font-size: 14;
    text-decoration-line: underline;
`;
