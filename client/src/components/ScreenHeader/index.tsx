import React, {useState, useEffect, useRef} from 'react';
import {TextInput, Keyboard, BackHandler, Platform, StatusBar} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import {IconButton} from '../IconButton';
import {Container, Content, Title, SearchInput} from './atoms';
import {Routes} from '../../consts';
import {Filter} from '../../utils';

export type ScreenHeaderProps = {
    title: string,
    enableFilter: boolean,
    filter: Filter,
    onFilterChange: (filter: Filter) => void,
};

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({title, enableFilter, filter, onFilterChange}) => {
    const navigation = useNavigation();
    const [searchBarShown, setSearchBarShown] = useState(false);
    const searchInputRef = useRef<TextInput>(null);

    const hideSearchBar = () => {
        setSearchBarShown(false);
        onFilterChange({...filter, search: ''});
    };

    useEffect(() => {
        const keyboardHideEvent = Platform.OS === 'ios'
            ? 'keyboardWillHide'
            : 'keyboardDidHide';

        const handlers = [
            BackHandler.addEventListener('hardwareBackPress', () => {
                hideSearchBar();
                return searchBarShown;
            }),
            Keyboard.addListener(keyboardHideEvent, () => {
                if (searchInputRef.current) {
                    searchInputRef.current.blur();
                }

                if (!filter.search) {
                    hideSearchBar();
                }
            }),
        ];

        return () => handlers.forEach(handler => handler.remove());
    });

    const selectCategories = () =>
        navigation.navigate(Routes.FILTER, {
            initialValue: filter,
            onSubmit: (value: {}) =>
                onFilterChange({...filter, ...value}),
        });

    const handleMenuToggle = () => navigation.toggleDrawer();

    const handleSearchChange = (search: string) =>
        onFilterChange({...filter, search});

    const renderSearchBar = () =>
        <>
            <IconButton
                icon="close"
                onPress={hideSearchBar}
            />

            <Content>
                <SearchInput
                    ref={searchInputRef}
                    autoFocus
                    value={filter.search}
                    onChangeText={handleSearchChange}
                />
            </Content>

            <IconButton
                icon="filter-list"
                onPress={selectCategories}
            />
        </>

    const renderTitleWithFilter = () =>
        <>
            <IconButton
                icon="menu"
                onPress={handleMenuToggle}
            />

            <Content>
                <Title>{title}</Title>
            </Content>

            <IconButton
                icon="search"
                onPress={() => setSearchBarShown(true)}
            />

            <IconButton
                icon="filter-list"
                onPress={selectCategories}
            />
        </>

    const renderTitle = () =>
        <>
            <IconButton
                icon="menu"
                onPress={handleMenuToggle}
            />

            <Content>
                <Title>{title}</Title>
            </Content>
        </>

    return (
        <Container>
            <StatusBar barStyle="dark-content" />

            {!enableFilter
                ? renderTitle()
                : searchBarShown
                    ? renderSearchBar()
                    : renderTitleWithFilter()}
        </Container>
    );
};
