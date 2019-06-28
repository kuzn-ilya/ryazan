import styled from 'styled-components/native';
import {MaterialIcons} from '@expo/vector-icons';
import {theme} from '../../consts';

export const Container = styled.TouchableOpacity`
    min-height: 40;
    aspect-ratio: 1;
    justify-content: center;
    align-items: center;
`;

export const Icon = styled(MaterialIcons).attrs({
    size: theme.iconSize,
})``;
