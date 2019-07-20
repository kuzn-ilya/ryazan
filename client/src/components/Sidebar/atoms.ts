import styled from 'styled-components/native';
import SafeAreaView from 'react-native-safe-area-view';
import {Button} from '../../components/Button';
import {theme} from '../../consts';

export const Container = styled(SafeAreaView).attrs({
    forceInset: {
        top: 'always',
        bottom: 'never',
        horizontal: 'always',
    },
})`
    flex: 1;
`;

export const Header = styled.View`
    flex-direction: row;
    padding: ${theme.screenIndent};
    align-items: flex-end;
`;

export const Logo = styled.Image.attrs({
    source: require('../../../assets/images/logo.png'),
})`
    height: 63;
    width: 51;
`;

export const Title = styled.Text`
    font-family: RobotoBold;
    font-size: 16;
    color: ${theme.red};
    text-transform: uppercase;
    margin-left: -16;
`;

export const ItemList = styled.View`
    flex: 1;
    justify-content: flex-start;
    padding-top: 16;
`;
