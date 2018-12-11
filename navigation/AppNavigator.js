import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import MainScreen from "../screens/MainScreen";
import MapScreen from "../screens/MapScreen";

export default createStackNavigator({
    home: {screen: HomeScreen},
    main: { screen: MainScreen},
    map: {screen: MapScreen}
})
