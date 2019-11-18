import Markdown from 'react-native-easy-markdown';
import SafeAreaView from 'react-native-safe-area-view';
import styled from 'styled-components/native';
import {IconButton} from '../../components';
import {theme} from '../../consts';

const contentRadius = 27;

export const SafeArea = styled(SafeAreaView).attrs({
    forceInset: {
        top: 'always',
        bottom: 'never',
        horizontal: 'always',
    },
})`
    flex: 1;
`;

export const Container = styled.View`
    flex: 1;
`;

export const Scroll = styled.ScrollView.attrs({
    contentContainerStyle: {
        borderTopLeftRadius: contentRadius,
        borderTopRightRadius: contentRadius,
        paddingTop: 38,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
})`
    flex: 1;
    background-color: white;
    margin-top: ${-contentRadius};
    border-top-left-radius: ${contentRadius};
    border-top-right-radius: ${contentRadius};
`;

export const Description = styled(Markdown).attrs({
    markdownStyles: theme.markdownStyle,
})`
    margin-top: ${theme.screenIndent};
`;

export const CloseButton = styled(IconButton).attrs({
    icon: 'close',
    size: 16,
    color: theme.darkGrey,
})`
    position: absolute;
    top: 15;
    left: 15;
    width: 30;
    height: 30;
    border-radius: 15;
    background-color: white;
    elevation: 2;
    min-height: 30;
`;

export const Footer = styled.View`
    justify-content: center;
    align-items: center;
`
