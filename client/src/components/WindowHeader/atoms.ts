import styled from 'styled-components/native';
import {MaterialIcons} from '@expo/vector-icons';
import {Platform} from 'react-native';

export const CloseIcon = styled(MaterialIcons)`
    padding-left: ${Platform.OS === 'ios' ? 14 : 0}
`;
