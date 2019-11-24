import React, {useState, useEffect} from 'react';
import {NavigationStackScreenComponent} from 'react-navigation-stack';
import {useQuery} from 'react-apollo-hooks';
import {gql} from 'apollo-boost';
import _ from 'lodash';
import * as Types from '../../types/graphql';
import {CheckBox, FooterButton, LoadingScreen, TextButton} from '../../components';
import {messageBox} from '../../services';
import {Filter} from '../../utils';
import {Content, SelectAllWrapper} from './atoms';

const GET_CATEGORIES = gql`
    query {
        categories(sort: "name") {
            id
            name
        }
    }
`;

export type FilterScreenParams = {
    initialValue: Filter,
    onSubmit: (value: Filter) => void,
};

export const FilterScreen: NavigationStackScreenComponent<FilterScreenParams> = ({navigation}) => {
    const onSubmit = navigation.getParam('onSubmit');
    const initialValue = navigation.getParam('initialValue');
    const [filter, setFilter] = useState(initialValue);

    const {data, error, loading} = useQuery<Types.Query>(GET_CATEGORIES);
    const availableCategories = (data && data.categories) || [];
    useEffect(_.partial(messageBox.error, error), [error]);

    const checkedCategoryIds: string[] = (filter.categories && filter.categories.length)
        ? filter.categories : _.map(availableCategories, 'id');

    const handleSelectAll = () => setFilter({...filter, categories: null});

    const handleCategoryChange = (categoryId: string, checked: boolean) => {
        /* do not uncheck the last checked category */
        if (checkedCategoryIds.length <= 1 && !checked) {
            return;
        }

        let categories: Filter['categories'] = checked
            ? _.union(checkedCategoryIds, [categoryId])
            : _.without(checkedCategoryIds, categoryId);

        /* do not filter if all the categories are checked */
        if (categories.length === availableCategories.length) {
            categories = null;
        }

        setFilter({...filter, categories});
    };

    const handleApply = () => {
        onSubmit(filter);
        navigation.goBack(null);
    };

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <>
            <Content>
                <SelectAllWrapper>
                    <TextButton label="Выбрать все" onPress={handleSelectAll} />
                </SelectAllWrapper>

                {availableCategories.map(category => (
                    <CheckBox
                        key={category!.id}
                        label={category!.name}
                        checked={checkedCategoryIds.includes(category!.id)}
                        onChange={checked => handleCategoryChange(category!.id, checked)}
                    />
                ))}
            </Content>

            <FooterButton label="Применить" onPress={handleApply} />
        </>
    );
};

FilterScreen.navigationOptions = {
    title: 'Фильтр',
};
