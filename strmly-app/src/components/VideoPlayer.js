// /src/components/VideoPlayer.js

import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, Image } from 'react-native';
import { Video } from 'expo-av';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

export default function VideoPlayer({ videoData, isCurrentlyVisible }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(videoData.likeCount);

  useEffect(() => {
    // This logic is now handled by the shouldPlay prop
  }, [isCurrentlyVisible]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };
  
  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        style={styles.video}
        source={{ uri: videoData.videoUrl }}
        resizeMode="cover"
        isLooping
        isMuted={isMuted}
        shouldPlay={isCurrentlyVisible}
      />
      
      <View style={styles.overlay}>
        {/* Left Side: Video Info */}
        <View style={styles.leftColumn}>
          <View style={styles.bottomSection}>
            <Text style={styles.username}>{videoData.user.username}</Text>
            <Text style={styles.description}>{videoData.description}</Text>
          </View>
        </View>

        {/* Right Side: Action Buttons */}
        <View style={styles.rightColumn}>
          <Image source={{ uri: videoData.user.avatarUrl }} style={styles.avatar} />
          <TouchableOpacity style={styles.iconContainer} onPress={handleLike}>
            <MaterialCommunityIcons name={isLiked ? "heart" : "heart-outline"} size={35} color={isLiked ? "#FF3B5B" : "white"} />
            <Text style={styles.iconText}>{likeCount.toLocaleString()}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <MaterialCommunityIcons name="comment-processing-outline" size={35} color="white" />
            <Text style={styles.iconText}>{videoData.commentCount.toLocaleString()}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <MaterialCommunityIcons name="share" size={35} color="white" />
            <Text style={styles.iconText}>{videoData.shareCount.toLocaleString()}</Text>
          </TouchableOpacity>
        </View>

        {/* Mute Button in corner */}
        <TouchableOpacity style={styles.muteButton} onPress={() => setIsMuted(!isMuted)}>
            <MaterialCommunityIcons name={isMuted ? "volume-off" : "volume-high"} size={22} color="rgba(255, 255, 255, 0.8)" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: '#000',
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
  },
  leftColumn: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
  },
  rightColumn: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 60,
  },
  bottomSection: {
    paddingBottom: 60,
  },
  username: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    color: 'white',
    fontSize: 14,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'white',
    marginBottom: 30,
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
  muteButton: {
      position: 'absolute',
      bottom: 20,
      left: 20,
      padding: 10,
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderRadius: 20
  }
});