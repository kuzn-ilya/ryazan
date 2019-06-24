import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Container} from './atoms';

export const LoadingScreen: React.FC = () =>
    <Container>
        <ActivityIndicator size="large" />
    </Container>
