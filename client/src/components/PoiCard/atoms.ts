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
    padding-bottom: ${theme.screenIndent};
`;

export const ActionBar = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const FlatIcons = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 90;
    margin-right: 5;
`;
