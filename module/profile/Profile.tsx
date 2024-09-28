import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import AvatarContainer from '@/components/ui/avatar/AvatarContainer';
import { View, Text, Pressable, Modal } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Snackbar, Portal, PaperProvider } from 'react-native-paper';
import BotProfile from './components/bot';
import { useLazyGetUserQuery, useLazyGetUserBotsQuery } from './api/user';
import { useAppDispatch } from '@/store/hooks';
import { addUser } from '@/store/features/user/userSlice';
import { Bot } from './entity/bot';
import { useFocusEffect } from 'expo-router';
import { styleModal } from '@/components/modal/modal';
import ProfileModal from '@/components/modal/profile/profileModal';

type Props = {
  showModal: () => void;
}

export default function UserProfile({showModal}) {
  const [visible, setVisible] = useState(false);

  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);
  const dispatch = useAppDispatch()
  const [getUser, user] = useLazyGetUserQuery()
  const [getBots, { data: bots, isLoading }] = useLazyGetUserBotsQuery()

 useFocusEffect(
    useCallback(() => {
      getUser(null).then((response) => {
        if (response.data) {
          dispatch(addUser(response.data?.detail));
        }
      });
      getBots(null);
      return () => {
      };
    }, [])
  );

  // const [visibleModal, setVisibleModal] = useState(false);

  // const showModal = () => setVisibleModal(true);
  // const hideModal = () => setVisibleModal(false);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.welcomeText}>Profile</Text>
          <View style={styles.items}>
            <View style={styles.avatar}>
              <AvatarContainer image='./assets/images/user.jpg' size={140} />
              <Text style={styles.userText}>{user.data?.detail?.username}</Text>
            </View>
            <View style={styles.containerBtn}>
              <Pressable style={styles.btn_1} onPress={showModal}>
                <AntDesign name="setting" size={20} color="black" />
                <Text style={styles.settingText}>Settings</Text>
              </Pressable>
              <Pressable onPress={onToggleSnackBar}>
                <AntDesign name="sharealt" size={20} color="#fff" style={styles.btn_2} />
              </Pressable>
            </View>
            <View>
              <Text style={styles.titleBots}>My assistants</Text>
            </View>
            <View style={styles.containerBot}>
              {bots && bots.length > 0 && bots.map((item: Bot) => {
                return (
                  <BotProfile
                    key={item.id}
                    image={''}
                    botname={item.botname}
                    description={item.description}
                    prompt={item.prompt}
                    id={item.id}
                    type={item.type}
                  />
                )
              })}
            </View>
          </View>
        </ScrollView>
        {/* <Portal>
            <Modal visible={visibleModal} onDismiss={hideModal} style={styleModal} contentContainerStyle={styleModal}>
              <ProfileModal hideModal={hideModal}/>
            </Modal>
          </Portal> */}
        <Portal>
          <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            duration={3000}
          >
            Hey there! I'm a Snackbar.
          </Snackbar>
        </Portal>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 30,
    flex: 1,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '300',
    color: '#fafafa',
    textAlign: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  items: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    marginTop: 20,
  },
  userText: {
    fontSize: 20,
    fontWeight: '400',
    color: '#fafafa',
    textAlign: 'center',
    marginTop: 6,
  },
  containerBtn: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_1: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 4,
  },
  btn_2: {
    borderColor: 'gray',
    padding: 8,
    borderRadius: 50,
    marginLeft: 10,
    borderWidth: 1,
  },
  containerBot: {
    marginTop: 20,
  },
  titleBots: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '300',
    color: 'gray',
    marginTop: 10,
  },
  settingText: {
    marginLeft: 4,
  }
});