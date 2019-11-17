import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import {theme} from '../../consts';

export const List = styled(FlatList).attrs({
    contentContainerStyle: {
        padding: 16,
    },
})`
    flex: 1;
` as unknown as typeof FlatList;

export const Separator = styled.View`
    height: ${theme.screenIndent};
`;
