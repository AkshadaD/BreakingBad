import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CharacterDetails, Favourites, Home, SearchCharacter} from '../screens';

const Stack = createNativeStackNavigator();

const MainStackNavigator = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={props.initialRoute}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SearchCharacter" component={SearchCharacter} />
        <Stack.Screen name="Favourites" component={Favourites} />
        <Stack.Screen name="CharacterDetails" component={CharacterDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;
