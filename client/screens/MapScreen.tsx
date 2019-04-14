import React from 'react';
import { View, Button } from 'react-native';
import { NavigationScreenConfigProps } from 'react-navigation'
import { HOME } from './consts';
import { styles } from './styles';

export type MapScreenProps = {} & NavigationScreenConfigProps

export class MapScreen extends React.Component<MapScreenProps> {
    static navigationOptions = {
      title: 'Map',
    };
    render() {
      const {navigate} = this.props.navigation;
      return (
        <View style={styles.container}>
          <Button
            title="Open list screen"
            onPress={() => navigate(HOME)}
          />
        </View>
      );
    }
  }