import React from 'react';
import { View, Text, Image, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { formatText } from '@/helpers/formatText';
import { useAppDispatch } from '@/store/hooks';
import { addActiveBot } from '@/store/features/bots/botsSlice';
import { setActivePublicBot } from '@/store/features/bots/botsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useRemoveBotMutation } from '../api/bot';
type Props = {
  image: string
  botname: string
  description: string
  id: number
  prompt: string
  type: any
  showEditModal: () => void
  showTelegramModal: () => void
};

export default function BotProfile({ image, botname, description, id, prompt, type, showEditModal, showTelegramModal }: Props) {

  const dispatch = useAppDispatch();

  const [deleteBot] = useRemoveBotMutation();

  const ha = () => {
    dispatch(setActivePublicBot({ id, botname, description }));
    router.push('/chat')
    AsyncStorage.setItem('activePublicBot', JSON.stringify({ id, botname, description }));
  };

  const handleClick = () => {
    dispatch(addActiveBot({ botname, description, id, prompt, type }));
    AsyncStorage.setItem('activePublicBot', JSON.stringify({ id, botname, description, prompt }));
    showEditModal()
  };

  const handleTelegram = () => {
    AsyncStorage.setItem('activePublicBot', JSON.stringify({ id, botname, description }));
    showTelegramModal()
    console.log('1')
  };

  const removeBot = () => {
    const formdata = new FormData();
    formdata.append('BotId', String(id));
    try {
      deleteBot(formdata).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'}} style={styles.image} />
        <TouchableOpacity onPress={ha} style={styles.textContainer}>
          <Text style={styles.name}>{botname}</Text>
          <Text style={styles.description}>
            {formatText(description, 50)}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.iconContainer}>
        <Pressable onPress={handleClick} style={styles.icon}> 
          <MaterialIcons name="edit" size={20} color="#ccc" />
        </Pressable>
        <Pressable onPress={handleTelegram} style={styles.icon}>
          <FontAwesome5 name="telegram-plane" size={20} color="#ccc" />
        </Pressable>
        <Pressable onPress={removeBot} style={styles.icon}>
          <MaterialIcons name="delete" size={20} color="#ccc" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    flexDirection: 'row',
    // padding: 16,
    borderRadius: 8,
    width: '100%',
    position: 'relative',
    alignItems: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  textContainer: {
    marginLeft: 16,
    flex: 1,
  },
  name: {
    color: '#fafafa',
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    color: '#b0b0b0',
    fontSize: 14,
    marginTop: 4,
  },
  iconContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginTop: 4,
    padding: 4,
  },
});