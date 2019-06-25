import React from 'react';
import {TabBarIconProps} from 'react-navigation';
import {MaterialIcons} from '@expo/vector-icons';
import {theme} from '../consts';

export const createTabIcon = (iconName: string) =>
  ({tintColor}: TabBarIconProps) =>
      <MaterialIcons name={iconName} size={theme.iconSize} color={tintColor} />
