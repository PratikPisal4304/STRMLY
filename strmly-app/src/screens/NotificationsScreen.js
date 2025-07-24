// /src/screens/NotificationsScreen.js
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function NotificationsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Notifications</Text>
      </View>
      <View style={styles.content}>
        <MaterialCommunityIcons name="bell-outline" size={80} color="#555" />
        <Text style={styles.text}>Your notifications will appear here.</Text>
        <Text style={styles.subtext}>Likes, comments, and new followers will be shown here.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
    alignItems: 'center',
  },
  headerText: { 
    color: '#fff', 
    fontSize: 20, 
    fontWeight: 'bold' 
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: { 
    color: '#888', 
    fontSize: 16,
    marginTop: 20,
  },
  subtext: {
    color: '#555',
    fontSize: 14,
    marginTop: 5,
  }
});