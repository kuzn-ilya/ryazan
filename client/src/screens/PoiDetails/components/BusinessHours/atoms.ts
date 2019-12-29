import styled from 'styled-components/native';

export type TextProps = {
    open: boolean,
};

export const Container = styled.View`
    margin: 20px 0;
`;

export const Text = styled.Text<TextProps>`
    font-family: "PT Sans Bold";
    font-size: 14px;
    text-transform: uppercase;
    color: ${({open}) => open ? '#60ac45' : '#db4242'};
`;
