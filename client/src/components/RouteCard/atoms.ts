import styled from 'styled-components/native';
import {theme} from '../../consts';

export const Title = styled.Text`
    font-size: 20;
`;

export const Subtitle = styled.Text.attrs({
    numberOfLines: 3,
    ellipsizeMode: 'tail',
})`
    flex: 1;
    margin-top: 10;
    font-size: 14;
    color: #999;
`;

export const Content = styled.View`
    flex: 1;
    flexDirection: row;
`;

export const LeftColumn = styled.View`
    flex: 1;
`;

export const RightColumn = styled.View`
    width: ${theme.iconSize};
    margin-left: ${theme.screenIndent};
    align-items: center;
`;

export const ActionBar = styled.View`
    margin-top: ${theme.screenIndent};
    flex-direction: row;
    justify-content: space-between;
`;
