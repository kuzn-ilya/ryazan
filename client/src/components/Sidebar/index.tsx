import React from 'react';
import {useNavigation} from 'react-navigation-hooks';
import {Routes} from '../../consts';
import {Item} from './components';

import {
    Container,
    Header,
    Logo,
    Title,
    ItemList,
} from './atoms';

export const Sidebar = () => {
    const {navigate} = useNavigation();

    return (
        <Container>
            <Header>
                <Logo />
                <Title>Туризм</Title>
            </Header>

            <ItemList>
                <Item label="История" onPress={() => navigate(Routes.HISTORY)} />
                <Item label="О приложении" onPress={() => navigate(Routes.ABOUT)} />
            </ItemList>
        </Container>
    );
};
