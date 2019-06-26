import styled from 'styled-components/native';

export const Backdrop = styled.TouchableOpacity.attrs({
    activeOpacity: 0,
})`
    flex: 1;
    padding: 10px;
    justify-content: center;
    align-items: center;
`;
