import styled, {css} from 'styled-components/native';
import {FlattenSimpleInterpolation} from 'styled-components';
import {StatusBar} from 'react-native';

export const headerHeight = 60;

export type ContainerStyleProps = {
    style?: FlattenSimpleInterpolation,
};

export const Container = styled.View<ContainerStyleProps>`
    align-items: stretch;
    flex-direction: row;
    ${() => {
        const statusBarHeight = StatusBar.currentHeight || 0;

        return css`
            height: ${headerHeight + statusBarHeight};
            padding-top: ${statusBarHeight};
        `;
    }}
    ${props => props.style}
`;
