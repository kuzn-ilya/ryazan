import styled from 'styled-components/native';
import {FlattenSimpleInterpolation} from 'styled-components';
import SafeAreaView from 'react-native-safe-area-view';
import {theme} from '../../consts';

export type ContainerStyleProps = {
    style?: FlattenSimpleInterpolation,
};

export const Container = styled(SafeAreaView).attrs({
    forceInset: {
        top: 'always',
        bottom: 'never',
        horizontal: 'always',
    },
})<ContainerStyleProps>`
    align-items: stretch;
    flex-direction: row;
    height: ${theme.headerHeight};
    ${props => props.style}
`;
