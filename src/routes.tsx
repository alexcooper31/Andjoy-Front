import * as React from 'react';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator, createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';

import { blue1 } from './helpers/colors';
import GamePage from './routes/GamePage';
import Home from './routes/Home';
import FavoriteList from './routes/Lists/favorites';
import PlayedList from './routes/Lists/played';
import WantedList from './routes/Lists/wanted';
import Login from './routes/LoginPage';
import Settings from './routes/Settings';

const ListNavigation = createMaterialTopTabNavigator(
  {
    Wanted: WantedList,
    Played: PlayedList,
    Favorites: FavoriteList,
  },
  {
    lazy: true,
    tabBarOptions: {
      style: {
        paddingTop: StatusBar.currentHeight,
        backgroundColor: 'white',
      },
      indicatorStyle: {
        backgroundColor: `${blue1}`,
      },
      labelStyle: {
        fontWeight: 'bold',
      },
      inactiveTintColor: 'black',
      activeTintColor: 'black',
    },
  },
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: ({tintColor}: any) => {
          return <Icon name='home' size={25} color={tintColor} />;
        },
      },
    },
    Lists: {
      screen: ListNavigation,
      navigationOptions: {
        tabBarIcon: ({tintColor}: any) => {
          return <Icon name='view-list' size={25} color={tintColor} />;
        },
      },
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        tabBarIcon: ({tintColor}: any) => {
          return <Icon name='settings' size={25} color={tintColor} />;
        },
      },
    },
  },
  {
    lazy: true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showLabel: false,
      activeTintColor: `${blue1}`,
    },
  },
);

const AppNavigator = createStackNavigator(
  {
    Home: TabNavigator,
    Login,
    GamePage,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Login',
    mode: 'modal',
  },
);

export default AppNavigator;
