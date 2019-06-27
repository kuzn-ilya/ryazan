import React from 'react';
import {useNavigation} from 'react-navigation-hooks';
import {IconButton} from '../IconButton';
import {Container, Content, Title} from './atoms';
import {Routes} from '../../consts';

export type Filter = {
    search: string,
    categories: string[],
};

export type ScreenHeaderProps = {
    title?: string,
    filter: Filter,
    onFilterChange: (filter: Filter) => void,
};

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({title, filter, onFilterChange}) => {
    const navigation = useNavigation();

    const selectCategories = () =>
        navigation.navigate(Routes.CATEGORIES, {
            categories: filter.categories,
            onSubmit: (categories: string[]) =>
                onFilterChange({...filter, categories}),
        });

    return (
        <Container>
            <IconButton
                icon="menu"
                onPress={() => navigation.toggleDrawer()}
            />

            <Content>
                {title && <Title>{title}</Title>}
            </Content>

            <IconButton
                icon="filter-list"
                onPress={selectCategories}
            />
        </Container>
    );
};
