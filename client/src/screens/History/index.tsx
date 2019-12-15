import React from 'react';
import {Container, Title} from './atoms';

export const HistoryScreen = () =>
    <Container>
        <Title>История</Title>
    </Container>

HistoryScreen.navigationOptions = {
    title: 'История',
    headerShown: true,
};
