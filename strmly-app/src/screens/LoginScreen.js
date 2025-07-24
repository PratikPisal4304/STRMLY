// /src/screens/LoginScreen.js

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    webClientId: '552484623783-aamguglqrnf38g89gjf06ujrtk61cu7d.apps.googleusercontent.com',
    androidClientId: '552484623783-7mjcllio1bl9lesjtkv5ieuqhc5kk6ai.apps.googleusercontent.com',
    iosClientId: '552484623783-iji21h76nvm7ip6uilt34monjj7nd7it.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      
      signInWithCredential(auth, credential)
        .then(async (userCredential) => {
          const userRef = doc(db, 'users', userCredential.user.uid);
          const docSnap = await getDoc(userRef);

          if (!docSnap.exists()) {
            await setDoc(userRef, {
              uid: userCredential.user.uid,
              displayName: userCredential.user.displayName,
              email: userCredential.user.email,
              photoURL: userCredential.user.photoURL,
              createdAt: new Date(),
            });
          }
        })
        .catch((error) => {
          console.error("Firebase Sign-In Error:", error);
          Alert.alert("Sign-in Failed", "Could not sign in with Firebase. Please try again.");
        });
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/adaptive-icon.png')} style={styles.logo} />
        <Text style={styles.title}>Welcome to STRMLY</Text>
        <Text style={styles.subtitle}>Sign in to discover your next favorite clip.</Text>
      </View>
      
      <TouchableOpacity
        style={styles.googleButton}
        onPress={() => promptAsync()}
        disabled={!request}
      >
        {!request ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <>
            <MaterialCommunityIcons name="google" size={24} color="#FFF" />
            <Text style={styles.buttonText}>Sign in with Google</Text>
          </>
        )}
      </TouchableOpacity>

      <Text style={styles.footerText}>
        By signing in, you agree to our Terms of Service and Privacy Policy.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 80,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#AAA',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF3B5B', // A more vibrant color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30, // Rounded button
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 15,
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 40,
  }
});