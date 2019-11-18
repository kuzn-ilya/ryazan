import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity.attrs({
    activeOpacity: 0.75,
})`
    height: 40;
    justify-content: center;
    align-items: flex-start;
`;

export const Label = styled.Text`
    font-family: PT Sans;
    font-size: 17;
    color: #1a1a1a;
    opacity: 0.87;
    padding-horizontal: 22;
`;
