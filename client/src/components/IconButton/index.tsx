import React from 'react';
import {theme} from '../../consts'
import {Container, Icon} from './atoms';

export type IconButtonProps = {
    icon: string,
    color?: string,
    onPress: () => void,
};

export const IconButton: React.FC<IconButtonProps> = ({icon, color, onPress}) =>
    <Container onPress={onPress}>
        <Icon name={icon} color={color} />
    </Container>

IconButton.defaultProps = {
    color: theme.darkGrey,
};
