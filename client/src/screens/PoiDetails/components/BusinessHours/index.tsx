import _ from 'lodash';
import React from 'react';
import moment from 'moment';
import * as Types from '../../../../types/graphql';
import {Container, Text} from './atoms';
import {dayOfWeekByNumber} from '../../../../utils';

type BusinessHoursProps = {
    businesshours: Types.Maybe<Types.Businesshours>[],
};

const findHoursByDay = (businessHours: Types.Maybe<Types.Businesshours>[], dayNumber: number) => {
    const day = dayOfWeekByNumber(dayNumber) as Types.Enum_Businesshours_Day;
    return _.find(businessHours, { day });
};

const isOpen = (todayHours: Types.Businesshours): boolean => {
    const now = moment();
    const opening = moment(todayHours.opening, 'H:mm');
    const closing = moment(todayHours.closing, 'H:mm');

    // in case closing time are before opening,
    // we consider that poi works through midnight
    // and actually closes the next day
    if (closing.isBefore(opening)) {
      closing.add(1, 'd');
    }

    return now.isAfter(opening) && now.isBefore(closing);
};

export const BusinessHours: React.FC<BusinessHoursProps> = ({businesshours}) => {
    const now = moment();
    const todayHours = findHoursByDay(businesshours, now.day());
    if (!todayHours) return null;

    const tomorrowHours = findHoursByDay(businesshours, now.day() + 1) || todayHours;
    const open = isOpen(todayHours);

    const text = open
        ? `Открыто: ${todayHours.opening}-${todayHours.closing}`
        : `Закрыто. Откроется в ${tomorrowHours.opening}`;

    return (
        <Container>
          <Text open={open}>{text}</Text>
        </Container>
    );
};
