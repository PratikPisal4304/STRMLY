// /src/screens/DiscoverScreen.js
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function DiscoverScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Discover</Text>
      </View>
      <View style={styles.searchBar}>
        <MaterialCommunityIcons name="magnify" size={20} color="#888" />
        <TextInput style={styles.searchInput} placeholder="Search users or sounds" placeholderTextColor="#888" />
      </View>
      <View style={styles.content}>
        <MaterialCommunityIcons name="compass-outline" size={80} color="#555" />
        <Text style={styles.text}>Trending content will appear here.</Text>
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
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#222',
    borderRadius: 10,
    margin: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  searchInput: {
    color: '#fff',
    flex: 1,
    paddingVertical: 10,
    marginLeft: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  text: { 
    color: '#888', 
    fontSize: 16,
    marginTop: 20,
  },
});