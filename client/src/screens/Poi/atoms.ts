import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import * as Types from '../../types/graphql';
import {theme} from '../../consts';

export const List = styled(FlatList).attrs({
    contentContainerStyle: {
        padding: 16,
    },
})`
    flex: 1;
    background-color: ${theme.windowHeaderColor};
` as unknown as typeof FlatList;

export const Separator = styled.View`
    height: ${theme.screenIndent};
`;
