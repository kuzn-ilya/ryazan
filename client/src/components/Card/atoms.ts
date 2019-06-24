import styled from 'styled-components/native';
import {theme} from '../../consts';

const borderRadius = 2;

export const Container = styled.TouchableOpacity.attrs({
    activeOpacity: 1,
})`
    background-color: white;
    width: 100%;
    height: 360;
    border-radius: ${borderRadius};
    elevation: 5;
`;

export const Picture = styled.Image`
    width: 100%;
    height: 180;
    border-top-left-radius: ${borderRadius};
    border-top-right-radius: ${borderRadius};
`;

export const Content = styled.View`
  flex: 1;
  padding: ${theme.screenIndent};
`;
