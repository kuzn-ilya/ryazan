import styled from 'styled-components/native';
import SafeAreaView from 'react-native-safe-area-view';
import {theme} from '../../../consts';

export const Container = styled(SafeAreaView).attrs({
    forceInset: {
        top: 'never',
        bottom: 'always',
        horizontal: 'always',
    },
})`
    background-color: white;
    width: 100%;
    height: ${theme.footerHeight};
    ${theme.footerShadow}
`;

export const TouchableWrapper = styled.TouchableOpacity.attrs({
    activeOpacity: 1,
})`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const Label = styled.Text`
    color: ${theme.red};
    font-weight: bold;
    text-transform: uppercase;
`;
