import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Banner from '@/components/banners/Banner';
import { banners } from './data/data';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useAppSelector } from '@/store/hooks';

export default function BannersTry() {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const screenWidth = Dimensions.get('window').width;


  const banners = useAppSelector((state) => state.bots.allBots);
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

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Try these</Text>
      <Carousel
        ref={carouselRef}
        data={banners?.slice(1,3)}
        renderItem={({ item }: any) => (
          <Banner 
            img={'https://img.freepik.com/premium-photo/funny-little-avatar-helpful-bot-assistant_969393-1429.jpg'} 
            author={'@Root'} 
            name={item.botname} 
            description={item.description} 
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
    marginTop: 20,
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
