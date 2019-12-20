import {Region} from 'react-native-maps';

export const initialMapRegion: Region = {
  latitude: 54.629216,
  longitude: 39.736375,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export const participants: string[] = [
  'Александр Буробин',
  'Александр Засименко',
  'Александр Милованов',
  'Даниил Пономарев',
  'Дмитрий Ауст',
  'Дмитрий Фоломкин',
  'Евгений Родин',
  'Илья Кузнецов',
  'Кирилл Леушкин',
  'Лада Ильина',
  'Ярослав Перегуда'
];

export type CommunityLogoProps = {
  title: string;
  image: any;
  homeUri: string;
};

export const communities: CommunityLogoProps[] = [
  {
    title: 'Web Purple',
    image: require('../../assets/images/communities/webpurple.png'),
    homeUri: 'https://www.webpurple.net/',
  },
  {
    title: '.NUTS',
    image: require('../../assets/images/communities/nuts.png'),
    homeUri: 'https://vk.com/dot_nuts',
  },
  {
    title: 'JJoy',
    image: require('../../assets/images/communities/jjoy.png'),
    homeUri: 'https://vk.com/javaenjoy',
  },
  {
    title: 'BAR Talks',
    image: require('../../assets/images/communities/bartalks.png'),
    homeUri: 'https://vk.com/bar_talks_rzn',
  },
  {
    title: 'QA Room',
    image: require('../../assets/images/communities/qaroom.png'),
    homeUri: 'https://vk.com/qaroom',
  },
];
