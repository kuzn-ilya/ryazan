import styled from 'styled-components/native';
import {theme} from '../../consts';

export const Container = styled.View`
    flex: 1;
    padding-vertical: ${theme.screenIndent};
    justify-content: center;
    align-items: center;
    background-color: #fff;
`;

export const ScrollContainer = styled.ScrollView`
    width: 100%;
`;

export const Title = styled.Text`
    font-size: 20;
    font-weight: bold;
    margin-bottom: 20px;
`;

export const Version = styled.Text`
    font-weight: bold;
`;

export const Group = styled.View`
    align-items: center;
    margin-bottom: 40px;
`;

export const TextItem = styled.Text`
    font-size: 20;
`;

export const PictureContainer = styled.TouchableOpacity.attrs({
    activeOpacity: 1,
})`
    width: 100%;
    align-items: center;
`;

export const Picture = styled.Image``;
