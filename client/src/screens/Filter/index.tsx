import React, {useState, useEffect} from 'react';
import {NavigationScreenComponent} from 'react-navigation';
import {useQuery} from 'react-apollo-hooks';
import {gql} from 'apollo-boost';
import _ from 'lodash';
import * as Types from '../../types/graphql';
import {CheckBox, FooterButton, WindowHeader, Filter} from '../../components';
import {messageBox} from '../../services';
import {Content} from './atoms';

const GET_CATEGORIES = gql`
    query {
        categories {
            id
            name
        }
    }
`;

export type FilterScreenParams = {
    initialValue: Filter,
    onSubmit: (value: Filter) => void,
};

export const FilterScreen: NavigationScreenComponent<FilterScreenParams> = ({navigation}) => {
    const onSubmit = navigation.getParam('onSubmit');
    const initialValue = navigation.getParam('initialValue');
    const [filter, setFilter] = useState(initialValue);

    const {data, error} = useQuery<Types.Query>(GET_CATEGORIES);
    const availableCategories = (data && data.categories) || [];
    useEffect(_.partial(messageBox.error, error), [error]);

    const handleCategoryChange = (categoryId: string, checked: boolean) => {
        const categories = checked
            ? _.union(filter.categories, [categoryId])
            : _.without(filter.categories, categoryId);
        setFilter({ ...filter, categories});
    };

    const handleApply = () => {
        onSubmit(filter);
        navigation.goBack(null);
    };

    return (
        <>
            <Content>
                {availableCategories.map(category => (
                    <CheckBox
                        key={category!.id}
                        label={category!.name}
                        checked={filter.categories.includes(category!.id)}
                        onChange={checked => handleCategoryChange(category!.id, checked)}
                    />
                ))}
            </Content>

            <FooterButton label="Apply" onPress={handleApply} />
        </>
    );
};

FilterScreen.navigationOptions = {
    title: 'Filter',
    header: WindowHeader,
};
