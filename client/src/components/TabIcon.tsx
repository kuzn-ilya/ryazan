import React from 'react';
import {MaterialIcons} from '@expo/vector-icons';
import {theme} from '../consts';

type TabBarIconProps = {
    focused: boolean,
    tintColor?: string,
    horizontal?: boolean,
};

export const createTabIcon = (iconName: string) =>
  ({tintColor}: TabBarIconProps) =>
      <MaterialIcons name={iconName} size={theme.iconSize} color={tintColor} />
