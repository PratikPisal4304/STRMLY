// /src/screens/ProfileScreen.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import useAuth from '../hooks/useAuth';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Mock data for the video grid
const userVideos = Array.from({ length: 21 }, (_, i) => ({ id: `${i}` }));

const Stat = ({ label, value }) => (
  <View style={styles.stat}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

export default function ProfileScreen() {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.displayName}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{user.displayName || 'Profile'}</Text>
        <TouchableOpacity onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={28} color="#FFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileInfo}>
        <Image source={{ uri: user.photoURL || 'https://via.placeholder.com/100' }} style={styles.avatar} />
        <Text style={styles.email}>@{user.email.split('@')[0]}</Text>
      </View>

      <View style={styles.statsContainer}>
        <Stat value="123" label="Following" />
        <Stat value="45.6K" label="Followers" />
        <Stat value="87.1M" label="Likes" />
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <MaterialCommunityIcons name="grid" size={24} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
            <MaterialCommunityIcons name="heart-outline" size={24} color="#888" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={userVideos}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <View style={styles.videoThumbnail} />
        )}
        style={styles.videoGrid}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: '#AAA',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#AAA',
    fontSize: 14,
  },
  tabs: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      borderBottomWidth: 1,
      borderBottomColor: '#222',
  },
  tab: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 10,
  },
  activeTab: {
      borderBottomWidth: 2,
      borderBottomColor: '#FFF',
  },
  videoGrid: {
      flex: 1,
  },
  videoThumbnail: {
      flex: 1,
      aspectRatio: 1,
      backgroundColor: '#222',
      margin: 1,
  }
});