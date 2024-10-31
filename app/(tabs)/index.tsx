import { useState } from 'react'
import { StyleSheet, Platform, ScrollView } from 'react-native';
import { View } from 'react-native';
import Header from '@/module/header/Header';
import Banners from '@/module/banners/Banners';
import BannersRec from '@/module/banners/BannersRec';
import Create from '@/module/create/create';
import BannersTry from '@/module/banners/BannersTry';
import Modal from 'react-native-modal';
import { BuilderModal } from '@/components/modal/builder/builderModal';
export default function HomeScreen() {

  const [visibleModal, setVisibleModal] = useState(false);

  const showModal = () => setVisibleModal(true);
  const hideModal = () => setVisibleModal(false);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Header />
        <Banners showBuilderModal={showModal} />
        {/* <BannersRec />
        <BannersTry /> */}
        <Create />
        <Modal isVisible={visibleModal}>
          <BuilderModal onCloseBuilderModal={hideModal} />
        </Modal>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
})