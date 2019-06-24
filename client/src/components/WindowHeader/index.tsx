import React from 'react';
import {StatusBar} from 'react-native';
import {HeaderProps} from 'react-navigation';
import {Container, CloseButtonWrapper, CloseButton} from './atoms';

export const WindowHeader: React.FC<HeaderProps> = ({navigation}) =>
    <Container>
        <StatusBar barStyle="light-content" />

        <CloseButtonWrapper onPress={() => navigation.goBack(null)}>
            <CloseButton />
        </CloseButtonWrapper>
    </Container>
