import React from 'react';
import {Container, Label} from './atoms';
import {MaterialIcons} from '@expo/vector-icons';
import {theme} from '../../consts';

export type CheckBoxProps = {
    label: string,
    checked: boolean,
    onChange: (checked: boolean) => void,
};

export const CheckBox: React.FC<CheckBoxProps> = ({label, checked, onChange}) =>
    <Container onPress={() => onChange(!checked)}>
        <MaterialIcons
            name={checked ? 'check-box' : 'check-box-outline-blank'}
            color={checked ? theme.red : theme.lightGrey}
            size={theme.iconSize}
        />
        <Label>{label}</Label>
    </Container>
