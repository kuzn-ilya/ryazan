import styled from 'styled-components/native';
import {theme} from '../../consts';

export const Container = styled.View`
    flex: 1;
    padding-vertical: ${theme.screenIndent};
    justify-content: center;
    align-items: center;
    background-color: #fff;
`;

export const Title = styled.Text`
    font-size: 20;
    font-weight: bold;
`;

export const Version = styled.Text`
    font-weight: bold;
`;
