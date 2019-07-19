import React from 'react';
import Constants from 'expo-constants';
import {Container, Title, Version} from './atoms';

export const AboutScreen = () =>
    <Container>
        <Title>{Constants.manifest.name}</Title>
        <Version>{Constants.manifest.version}</Version>
    </Container>
