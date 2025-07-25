// /src/navigation/AuthStack.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'; // <-- FIX HERE
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}