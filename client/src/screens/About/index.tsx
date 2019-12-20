import React from 'react';
import { Linking } from 'react-native';
import Constants from 'expo-constants';
import { participants, communities, CommunityLogoProps } from '../../consts'
import { Container, ScrollContainer, Title, Version, Group, TextItem, PictureContainer, Picture } from './atoms';

const participantsList = participants.map(item => <TextItem key={item}>{item}</TextItem>);

const Logo: React.FC<Partial<CommunityLogoProps>> = ({ image, homeUri }) => (
    <PictureContainer onPress={() => Linking.openURL(homeUri as string)}>
        <Picture source={image} style={{ width: 300, height: 200 }} resizeMode='contain' />
    </PictureContainer>
);

const logoList = communities.map(item => (
    <Logo key={item.title} image={item.image} homeUri={item.homeUri} />
));

export const AboutScreen = () =>
    <Container>
        <ScrollContainer>
            <Group>
                <Title>{Constants.manifest.name}</Title>
                <Version>{Constants.manifest.version}</Version>
            </Group>
            <Group>
                <Title>Участники:</Title>
                {participantsList}
            </Group>
            <Group>
                <Title>IT сообщества:</Title>
                {logoList}
            </Group>
        </ScrollContainer>
    </Container>

AboutScreen.navigationOptions = {
    title: 'О приложении',
    headerShown: true,
};
