import styled from 'styled-components/native';
import {Header} from '../Header';
import {theme} from '../../consts';

export const Container = styled(Header).attrs({
    statusBarStyle: 'light-content',
})`
    background-color: ${theme.windowHeaderColor};
`;
