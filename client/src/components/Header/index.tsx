import React from 'react';
import {StatusBar, StatusBarProps} from 'react-native';
import {FlattenSimpleInterpolation} from 'styled-components';
import {Container} from './atoms';

export type HeaderProps = {
    style?: FlattenSimpleInterpolation,
    statusBarStyle?: StatusBarProps['barStyle'],
    children: React.ReactNode,
};

export const Header: React.FC<HeaderProps> = ({style, statusBarStyle, children}) =>
    <Container style={style}>
        <StatusBar barStyle={statusBarStyle} />
        {children}
    </Container>
