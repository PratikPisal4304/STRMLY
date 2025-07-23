import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

// This keeps the auth session active in the browser to complete the flow.
WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  // This hook manages the Google authentication flow with your specific keys.
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '552484623783-aamguglqrnf38g89gjf06ujrtk61cu7d.apps.googleusercontent.com',
    androidClientId: '552484623783-7mjcllio1bl9lesjtkv5ieuqhc5kk6ai.apps.googleusercontent.com',
    iosClientId: '552484623783-iji21h76nvm7ip6uilt34monjj7nd7it.apps.googleusercontent.com',
  });

  // This effect hook handles the response from Google after the user signs in.
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      
      signInWithCredential(auth, credential)
        .then(async (userCredential) => {
          // After signing in to Firebase, check if the user is new.
          const userRef = doc(db, 'users', userCredential.user.uid);
          const docSnap = await getDoc(userRef);

          // If the user document doesn't exist, it's their first time signing in.
          if (!docSnap.exists()) {
            // Create a new document for the user in the 'users' collection in Firestore.
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
      <Text style={styles.title}>STRMLY</Text>
      <Text style={styles.subtitle}>Your Next Favorite Clip Awaits</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#AAA',
    marginBottom: 50,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4285F4',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
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
});