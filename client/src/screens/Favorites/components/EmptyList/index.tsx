import React from 'react';
import {Container, Message} from './atoms';

export const EmptyList = () =>
    <Container>
        <Message>List of your favorites is empty.</Message>
        <Message>Go ahead and add some.</Message>
    </Container>
