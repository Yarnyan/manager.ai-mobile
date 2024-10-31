import { Image, StyleSheet, Platform } from 'react-native';
import { useState } from 'react';
import { View } from 'react-native';
import UserProfile from '@/module/profile/Profile';
import Modal from "react-native-modal";
import ProfileModal from '@/components/modal/profile/profileModal';
import EditBotModal from '@/components/modal/profile/editBotModal';
import TelegramBotModal from '@/components/modal/profile/telegramBotModal';
export default function ProfileScreen() {
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [visibleTelegramModal, setVisibleTelegramModal] = useState(false);

  const showTelegramModal = () => setVisibleTelegramModal(true);
  const hideTelegramModal = () => setVisibleTelegramModal(false);
  
  const showEditModal = () => setVisibleEditModal(true);
  const hideEditModal = () => setVisibleEditModal(false);

  const showModal = () => setVisibleModal(true);
  const hideModal = () => setVisibleModal(false);
  
  return (
    <View style={styles.container}>
      <Modal isVisible={visibleModal}>
        <ProfileModal hideModal={hideModal} />
      </Modal>
      <Modal isVisible={visibleEditModal}>
        <EditBotModal hideModal={hideEditModal} />
      </Modal>
      <Modal isVisible={visibleTelegramModal}>
        <TelegramBotModal hideTelegramModal={hideTelegramModal} />
      </Modal>
      <UserProfile showModal={showModal} showEditModal={showEditModal} showTelegramModal={showTelegramModal}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
  },
});
