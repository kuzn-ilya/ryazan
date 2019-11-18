import React from 'react';
import {Icon} from './Icon';
import {theme} from '../consts';

type TabBarIconProps = {
    focused: boolean,
    tintColor?: string,
    horizontal?: boolean,
};

export const createTabIcon = (iconName: string) =>
    ({tintColor, focused}: TabBarIconProps) =>
        <Icon
            name={focused ? `${iconName}-active` : iconName}
            size={theme.iconSize}
            color={tintColor}
        />
