import styled from 'styled-components/native';
import {theme} from '../../consts';

const borderRadius = 3;
const pictureBorderRadius = 2;

export const Container = styled.TouchableOpacity.attrs({
    activeOpacity: 1,
})`
    background-color: white;
    width: 100%;
    height: 399;
    padding: 24px;
    border-radius: ${borderRadius};
    ${theme.defaultShadow}
`;

export const Picture = styled.Image`
    width: 100%;
    height: 177;
    border-radius: ${pictureBorderRadius};
`;

export const Content = styled.View`
  flex: 1;
  padding-top: 24px;
`;
