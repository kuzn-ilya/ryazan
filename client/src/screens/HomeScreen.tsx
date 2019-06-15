import React from 'react';
import {Button, Text, View} from 'react-native';
import {NavigationScreenConfigProps, NavigationContainer} from 'react-navigation';
import {gql} from 'apollo-boost';
import {useQuery} from 'react-apollo-hooks';
import {Query} from '../typings/graphql';
import {MAP} from './consts';
import {Container} from './styles';

const GetCategories = gql`
    query {
        categories {
            id
            name
        }
    }
`;

export type HomeScreenProps = {} & NavigationScreenConfigProps;

export const HomeScreen: React.FC<HomeScreenProps> = ({navigation: {navigate}}) => {
    const {data, loading, error} = useQuery<Query>(GetCategories);

    return (
        <>
            <Container>
                {loading && <Text>Loading...</Text>}
                {error && <Text>Error! {error.message}</Text>}
                {data && data.categories && (
                    <View>
                        {data.categories.map(
                            category =>
                                category && (
                                    <Text key={category.id}>
                                        {category.id} - {category.name}
                                    </Text>
                                ),
                        )}
                    </View>
                )}
            </Container>
            <Container>
                <Text>Ryazan Mobile Application</Text>
                <Button title="Open map screen" onPress={() => navigate(MAP)} />
            </Container>
        </>
    );
};

((HomeScreen as unknown) as NavigationContainer).navigationOptions = {
    title: 'Home',
};
