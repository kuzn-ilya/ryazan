import React from 'react';
import {Container, Picture, Content} from './atoms';

export type CardProps = {
    imageUri: string,
    children: React.ReactNode,
    onPress: () => void,
};

export const Card: React.FC<CardProps> = ({imageUri, children, onPress}) =>
    <Container onPress={onPress}>
        <Picture source={{uri: imageUri}} />
        <Content>{children}</Content>
    </Container>
