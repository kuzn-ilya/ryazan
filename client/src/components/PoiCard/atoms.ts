import styled from 'styled-components/native';
import {Subheading} from '../Text';
import {theme} from '../../consts';

export const Subtitle = styled(Subheading).attrs({
    numberOfLines: 3,
    ellipsizeMode: 'tail',
})`
    flex: 1;
    margin-top: 10;
    color: #999;
    padding-bottom: ${theme.screenIndent}px;
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
