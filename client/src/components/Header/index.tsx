import React from 'react';
import {FlattenSimpleInterpolation} from 'styled-components';
import {Container} from './atoms';

export type HeaderProps = {
    style?: FlattenSimpleInterpolation,
    children: React.ReactNode,
};

export const Header: React.FC<HeaderProps> = ({style, children}) =>
    <Container style={style}>
        {children}
    </Container>
