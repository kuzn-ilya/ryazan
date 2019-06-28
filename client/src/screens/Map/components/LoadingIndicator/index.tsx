import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Container} from './atoms';

export const LoadingIndicator = () =>
    <Container>
        <ActivityIndicator size="large" />
    </Container>
