import React from 'react';
import {HeaderProps} from 'react-navigation';
import {IconButton} from '../IconButton';
import {Container, Content, Title} from './atoms';

export const WindowHeader: React.FC<HeaderProps> = ({navigation, scene}) =>
    <Container>
        <IconButton
            icon="close"
            color="white"
            onPress={() => navigation.goBack(null)}
        />

        <Content>
            <Title>{scene.descriptor.options.title}</Title>
        </Content>
    </Container>
