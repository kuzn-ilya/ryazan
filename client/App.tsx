import { createStackNavigator, createAppContainer } from 'react-navigation';
import { HomeScreen, MapScreen, HOME, MAP } from './screens';

const MainNavigator = createStackNavigator({
  [HOME]: { screen: HomeScreen },
  [MAP]: { screen: MapScreen },
});

const App = createAppContainer(MainNavigator);
export default App;
