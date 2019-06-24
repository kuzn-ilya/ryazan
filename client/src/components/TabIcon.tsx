import React from 'react';
import {TabBarIconProps} from 'react-navigation';
import {MaterialIcons} from '@expo/vector-icons';

export const createTabIcon = (iconName: string) =>
  ({tintColor}: TabBarIconProps) =>
      <MaterialIcons name={iconName} size={28} color={tintColor} />
