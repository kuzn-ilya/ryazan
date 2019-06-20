import React from 'react';
import {Button, Text, View} from 'react-native';
import {NavigationScreenConfigProps, NavigationContainer} from 'react-navigation';
import {Query} from 'react-apollo';
import {gql} from 'apollo-boost';
import * as Types from '../typings/graphql';
import {Routes} from './consts';
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

export const HomeScreen: React.FC<HomeScreenProps> = ({navigation: {navigate}}) => (
    <Query<Types.Query> query={GetCategories}>
        {({data, loading, error}) => (
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
                    <Button title="Open map screen" onPress={() => navigate(Routes.MAP)} />
                </Container>
            </>
        )}
    </Query>
);

((HomeScreen as unknown) as NavigationContainer).navigationOptions = {
    title: 'Home',
};
