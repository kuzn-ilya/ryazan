import styled from 'styled-components/native';
import {theme} from '../../consts';

export const Content = styled.View`
    flex: 1;
    padding-horizontal: ${theme.screenIndent};
    padding-vertical: 32;
`;

export const SelectAllWrapper = styled.View`
    width: 100%;
    align-items: flex-end;
`;
