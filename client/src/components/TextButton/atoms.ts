import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity.attrs({
    activeOpacity: 0.75,
})`
    padding-bottom: 14;
    justify-content: center;
`;

export const Label = styled.Text`
    color: black;
    font-size: 14;
`;
