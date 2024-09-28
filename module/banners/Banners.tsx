import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Banner from '@/components/banners/Banner';
import { banners } from './data/data';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Banners() {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const screenWidth = Dimensions.get('window').width;
  console.log(screenWidth);
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
      <Text style={styles.text}>For you</Text>
      <Carousel
        ref={carouselRef}
        data={banners}
        renderItem={({ item }) => (
          <Banner 
            img={item.img} 
            author={item.author} 
            name={item.name} 
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
    marginTop: 10,
    padding: 10,
    flex: 1,
    width: '100%',
    height: 190,
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
