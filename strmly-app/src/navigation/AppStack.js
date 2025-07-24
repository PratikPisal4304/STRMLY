// /src/navigation/AppStack.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'; // <-- FIX HERE
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TabNavigator} />
    </Stack.Navigator>
  );
}