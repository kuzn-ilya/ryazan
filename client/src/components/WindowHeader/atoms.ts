import styled, {css} from 'styled-components/native';
import {StatusBar} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {theme} from '../../consts';

export const Container = styled.View`
    background-color: ${theme.windowHeaderColor};
    align-items: stretch;
    flex-direction: row;
    ${() => {
        const statusBarHeight = StatusBar.currentHeight || 0;

        return css`
            height: ${theme.headerHeight + statusBarHeight};
            padding-top: ${statusBarHeight};
        `;
    }}
`;

export const CloseButtonWrapper = styled.TouchableOpacity`
    width: 50;
    justify-content: center;
    align-items: center;
`;

export const CloseButton = styled(Ionicons).attrs({
    name: 'md-close',
    size: 28,
    color: 'white',
})``;
