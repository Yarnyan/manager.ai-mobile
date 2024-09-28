import { Image, StyleSheet, Platform } from 'react-native';
import { useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import UserProfile from '@/module/profile/Profile';
import Modal from "react-native-modal";
import ProfileModal from '@/components/modal/profile/profileModal';
export default function ProfileScreen() {
  const [visibleModal, setVisibleModal] = useState(false);

  const showModal = () => setVisibleModal(true);
  const hideModal = () => setVisibleModal(false);
  return (
    <ThemedView style={styles.container}>
      <Modal isVisible={visibleModal}>
        <ProfileModal hideModal={hideModal} />
      </Modal>
      <UserProfile showModal={showModal} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
  },
});
