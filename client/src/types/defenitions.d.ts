declare module 'react-native-dotenv';

declare module 'react-navigation-hooks' {
  import {NavigationScreenProp, NavigationRoute} from 'react-navigation';

  declare function useNavigation(): NavigationScreenProp<NavigationRoute>;
}
