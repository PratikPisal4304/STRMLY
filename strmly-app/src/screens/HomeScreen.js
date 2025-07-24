// /src/screens/HomeScreen.js

import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import VideoPlayer from '../components/VideoPlayer';

// Expanded data to include user info, description, etc.
const videoData = [
  { 
    id: '1', 
    videoUrl: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4', 
    likeCount: 1234, 
    commentCount: 152,
    shareCount: 289,
    user: {
      username: '@naturelover',
      avatarUrl: 'https://i.pravatar.cc/150?u=naturelover',
    },
    description: 'Enjoying the beautiful scenery with Big Buck Bunny! 🐰 #nature #animation'
  },
  { 
    id: '2', 
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', 
    likeCount: 5678,
    commentCount: 890,
    shareCount: 120,
    user: {
      username: '@funtimes',
      avatarUrl: 'https://i.pravatar.cc/150?u=funtimes',
    },
    description: 'Having a blast with the crew! 🎉 #fun #friends'
  },
  { 
    id: '3', 
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', 
    likeCount: 9101,
    commentCount: 453,
    shareCount: 302,
    user: {
      username: '@adventureseeker',
      avatarUrl: 'https://i.pravatar.cc/150?u=adventureseeker',
    },
    description: 'Epic escapes and wild adventures. #travel #explore'
  },
];

const { height } = Dimensions.get('window');

export default function HomeScreen() {
  const [currentlyVisibleId, setCurrentlyVisibleId] = useState(videoData.length > 0 ? videoData[0].id : null);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 90,
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