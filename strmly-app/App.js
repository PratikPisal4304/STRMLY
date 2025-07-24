// /App.js

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator, StyleSheet, StatusBar, Platform } from 'react-native';
import * as Application from 'expo-application';

import useAuth from './src/hooks/useAuth';
import AuthStack from './src/navigation/AuthStack';
import AppStack from './src/navigation/AppStack';

function RootNavigator() {
  const { user, initializing } = useAuth();

  if (initializing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {/* --- BYPASS LOGIC --- */}
      {/* To re-enable login, change this back to: {user ? <AppStack /> : <AuthStack />} */}
      <AppStack />
    </NavigationContainer>
  );
}

export default function App() {
  useEffect(() => {
    const getSha1 = async () => {
      if (Platform.OS === 'android') {
        // This will only work in a development build, not Expo Go.
        // const sha1 = await Application.getAndroidSigningCertificateSha1();
        // console.log("Your App's SHA-1 Key is:", sha1);
      }
    };
    getSha1();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <RootNavigator />
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  }
});