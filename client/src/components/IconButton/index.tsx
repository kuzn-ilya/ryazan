import React from 'react';
import {Container, Icon} from './atoms';

export type IconButtonProps = {
    icon: string,
    onPress: () => void,
};

export const IconButton: React.FC<IconButtonProps> = ({icon, onPress}) =>
    <Container onPress={onPress}>
        <Icon name={icon} />
    </Container>
