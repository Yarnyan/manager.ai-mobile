import React, { useRef, useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Button } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Banner from '@/components/banners/Banner';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLazyGetPublicBotsQuery } from './api/banners';
import { useFocusEffect } from 'expo-router';
import { useAppDispatch } from '@/store/hooks';
import { setAllBots } from '@/store/features/bots/botsSlice';

type Props = {
  showBuilderModal: () => void;
};

export default function Banners({showBuilderModal}: Props) {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const screenWidth = Dimensions.get('window').width;
  const dispatch = useAppDispatch();
  const [getPublicBots, { data: banners }] = useLazyGetPublicBotsQuery();

  const handleNext = () => {
    if (currentIndex < banners.length - 1) {
      carouselRef.current?.next();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      carouselRef.current?.prev();
    }
  };

  useFocusEffect(
    useCallback(() => {
      getPublicBots(null).then((res) => {
        dispatch(setAllBots(res.data || []));
      });
      return () => {
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>For you</Text>
      <Carousel
        ref={carouselRef}
        data={banners?.slice(0, 1)}
        renderItem={({ item }: any) => (
          <Banner
            img={'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'}
            id={item.id}
            author={'@Root'}
            botname={item.botname}
            description={item.description}
            prompt={item.prompt}
            showBuilderModal={showBuilderModal}
          />
        )}
        width={screenWidth - 20}
        height={200}
        onSnapToItem={(index) => setCurrentIndex(index)}
        style={styles.carousel}
      />
      <View style={styles.navigation}>
        <TouchableOpacity onPress={handlePrev} style={styles.button}>
          <Text style={styles.buttonText}>
            <MaterialIcons name="keyboard-arrow-left" size={30} color="gray" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext} style={styles.button}>
          <Text style={styles.buttonText}>
            <MaterialIcons name="keyboard-arrow-right" size={30} color="gray" />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 10,
    padding: 10,
    flex: 1,
    width: '100%',
    height: 240,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '400',
  },
  carousel: {
    marginVertical: 20,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: {
    padding: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
