import React from 'react';
import {HeaderProps} from 'react-navigation';
import {IconButton} from '../IconButton';
import {Container} from './atoms';

export const WindowHeader: React.FC<HeaderProps> = ({navigation}) =>
    <Container>
        <IconButton
            icon="close"
            color="white"
            onPress={() => navigation.goBack(null)}
        />
    </Container>
