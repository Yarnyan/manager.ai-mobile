import { Image, StyleSheet, Platform, ScrollView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';

import Header from '@/module/header/Header';
import { Dimensions } from 'react-native';
import Banners from '@/module/banners/Banners';
import BannersRec from '@/module/banners/BannersRec';
import Create from '@/module/create/create';
import BannersTry from '@/module/banners/BannersTry';
export default function HomeScreen() {

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <Header />
        <Banners />
        <BannersRec />
        <BannersTry />
        <Create />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    paddingTop: Platform.OS === 'ios' ? 0 : 0,
  },
})