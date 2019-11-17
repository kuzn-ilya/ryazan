import styled from 'styled-components/native';
import SafeAreaView from 'react-native-safe-area-view';

export const Container = styled(SafeAreaView).attrs({
    forceInset: {
        top: 'always',
        bottom: 'never',
        horizontal: 'always',
    },
})`
    flex: 1;
    background-color: white
    border-top-right-radius: 40;
    border-bottom-right-radius: 40;
`;

export const Background = styled.ImageBackground.attrs({
    source: require('../../../assets/images/sidebar.png'),
    imageStyle: {
        resizeMode: 'contain',
    },
})`
    flex: 1;
`

export const Header = styled.View`
    flex-direction: row;
    padding-top: 22;
    padding-left: 22;
    align-items: flex-end;
`;

export const Logo = styled.Image.attrs({
    source: require('../../../assets/images/logo.png'),
})`
    height: 100;
    width: 83.59375;
`;

export const ItemList = styled.View`
    flex: 1;
    justify-content: flex-start;
    padding-top: 16;
`;
