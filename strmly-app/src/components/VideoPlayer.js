// /src/components/VideoPlayer.js

import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
// Updated import from 'expo-video'
import { Video } from 'expo-video';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function VideoPlayer({ videoData, isCurrentlyVisible }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(videoData.likeCount);

  useEffect(() => {
    if (!videoRef.current) return;

    if (isCurrentlyVisible) {
      // Use the new synchronous `play()` method
      videoRef.current.play();
    } else {
      // Use the new synchronous `pause()` method
      videoRef.current.pause();
    }
  }, [isCurrentlyVisible]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };
  
  const togglePlayPause = () => {
      // The new 'expo-video' provides a getStatusAsync() method for status
      // For a simple toggle, we can just call play() or pause()
      // This part of the logic is simplified as the primary control is via visibility
  }

  return (
    <View style={styles.container}>
      {/* We remove the TouchableOpacity for play/pause on tap to simplify, 
          since TikTok-like UI doesn't usually have this feature. */}
      <Video
        ref={videoRef}
        style={styles.video}
        source={{ uri: videoData.videoUrl }}
        resizeMode="cover"
        isLooping
        isMuted={isMuted}
      />
      
      <View style={styles.overlay}>
        {/* Mute Button */}
        <TouchableOpacity style={styles.bottomLeft} onPress={() => setIsMuted(!isMuted)}>
            <MaterialCommunityIcons name={isMuted ? "volume-off" : "volume-high"} size={28} color="white" />
        </TouchableOpacity>

        {/* Right side icons */}
        <View style={styles.rightColumn}>
          <TouchableOpacity style={styles.iconContainer} onPress={handleLike}>
            <MaterialCommunityIcons name={isLiked ? "heart" : "heart-outline"} size={35} color={isLiked ? "#FF3B5B" : "white"} />
            <Text style={styles.iconText}>{likeCount}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: SCREEN_HEIGHT,
    backgroundColor: '#000',
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  bottomLeft: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    padding: 10,
  },
  rightColumn: {
    position: 'absolute',
    bottom: 80,
    right: 10,
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  iconText: {
    color: 'white',
    marginTop: 5,
    fontSize: 14,
    fontWeight: '600',
  },
});