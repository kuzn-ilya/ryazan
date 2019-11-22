import React, {useState, useEffect, useRef, useCallback} from 'react';
import {TextInput, Keyboard, BackHandler, Platform, StatusBar, NativeEventSubscription} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import {useNavigation} from 'react-navigation-hooks';
import {Container, Content, Title, SearchInput, Button} from './atoms';
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
    const isSearchEmpty = !filter.search;

    const hideSearchBar = useCallback(() => {
        setSearchBarShown(false);
        onFilterChange({...filter, search: ''});
    }, [onFilterChange, filter]);

    useEffect(() => {
        const keyboardHideEvent = Platform.OS === 'ios'
            ? 'keyboardWillHide'
            : 'keyboardDidHide';

        const sub = Keyboard.addListener(keyboardHideEvent, () => {
            if (searchInputRef.current) {
                searchInputRef.current.blur();
            }

            if (isSearchEmpty) {
                hideSearchBar();
            }
        });

        return () => sub.remove();
    }, [hideSearchBar, isSearchEmpty]);

    useEffect(() => {
        const sub = BackHandler.addEventListener('hardwareBackPress', () => {
            if (navigation.isFocused()) {
                hideSearchBar();
                return searchBarShown;
            }

            return false;
        });

        return () => sub.remove();
    }, [hideSearchBar, searchBarShown]);

    const selectCategories = () =>
        navigation.navigate(Routes.FILTER, {
            initialValue: filter,
            onSubmit: (value: {}) =>
                onFilterChange({...filter, ...value}),
        });

    const filterIcon = (filter.search || filter.categories) ? 'filter-active' : 'filter';

    const handleMenuToggle = () => navigation.toggleDrawer();

    const handleScreenWillFocus = () => setSearchBarShown(!isSearchEmpty);

    const handleSearchChange = (search: string) => onFilterChange({...filter, search});

    const handleSearchBlur = () => {
        if (isSearchEmpty) {
            hideSearchBar();
        }
    };

    const renderSearchBar = () =>
        <>
            <Button
                icon="close"
                onPress={hideSearchBar}
            />

            <Content>
                <SearchInput
                    ref={searchInputRef}
                    autoFocus={isSearchEmpty}
                    value={filter.search}
                    onChangeText={handleSearchChange}
                    onBlur={handleSearchBlur}
                />
            </Content>

            <Button
                icon={filterIcon}
                onPress={selectCategories}
            />
        </>

    const renderTitleWithFilter = () =>
        <>
            <Button
                icon="menu"
                onPress={handleMenuToggle}
            />

            <Content>
                <Title>{title}</Title>
            </Content>

            <Button
                icon="search"
                onPress={() => setSearchBarShown(true)}
            />

            <Button
                icon={filterIcon}
                onPress={selectCategories}
            />
        </>

    const renderTitle = () =>
        <>
            <Button
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
            <NavigationEvents onWillFocus={handleScreenWillFocus} />

            {!enableFilter
                ? renderTitle()
                : searchBarShown
                    ? renderSearchBar()
                    : renderTitleWithFilter()}
        </Container>
    );
};
