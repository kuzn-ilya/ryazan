import React from 'react';
import {ViewStyle} from 'react-native';
import {Icon} from '../../Icon';
import {theme} from '../../../consts'
import {Container} from './atoms';

export type IconButtonProps = {
    style?: ViewStyle,
    icon: string,
    color?: string,
    size?: number,
    onPress?: () => void,
};

export const IconButton: React.FC<IconButtonProps> = ({style, icon, color, size, onPress}) =>
    <Container style={style} onPress={onPress}>
        <Icon name={icon} size={size || theme.iconSize} color={color} />
    </Container>

IconButton.defaultProps = {
    color: theme.red,
};
