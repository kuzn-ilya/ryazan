import styled from 'styled-components/native';
import {MaterialIcons} from '@expo/vector-icons';
import {theme} from '../../consts';

export const Container = styled.TouchableOpacity`
    height: 40;
    justify-content: center;
    align-items: center;
`;

export const Icon = styled(MaterialIcons).attrs({
    color: theme.darkGrey,
    size: theme.iconSize,
})``;
