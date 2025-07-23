// /src/screens/HomeScreen.js

import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import VideoPlayer from '../components/VideoPlayer';

const videoData = [
  { id: '1', videoUrl: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4', likeCount: 1234 },
  { id: '2', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', likeCount: 5678 },
  { id: '3', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', likeCount: 9101 },
  { id: '4', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', likeCount: 1121 },
  { id: '5', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', likeCount: 3141 },
];

const { height } = Dimensions.get('window');

export default function HomeScreen() {
  const [currentlyVisibleId, setCurrentlyVisibleId] = useState(null);

  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 90, // Item is considered visible when 90% of it is visible
  };

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentlyVisibleId(viewableItems[0].item.id);
    }
  }, []);

  const renderItem = ({ item }) => (
    <VideoPlayer
      videoData={item}
      isCurrentlyVisible={currentlyVisibleId === item.id}
    />
  );
  
  if (!videoData) {
      return <ActivityIndicator style={{flex: 1}} size="large" color="#FFF" />
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={videoData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        windowSize={3}
        getItemLayout={(data, index) => ({
          length: height,
          offset: height * index,
          index,
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});