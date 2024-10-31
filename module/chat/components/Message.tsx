import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  text: string;
  name: string;
  isFromUser: boolean;
};

export default function Message({ text, name, isFromUser }: Props) {
  
  const [bot, setBot] = useState<{ botname: string } | null>(null);

  useEffect(() => {
    const fetchBot = async () => {
      try {
        const botData = await AsyncStorage.getItem('activePublicBot');
        if (botData) {
          setBot(JSON.parse(botData));
        }
      } catch (error) {
        console.error('Error fetching bot from AsyncStorage:', error);
      }
    };

    fetchBot();
  }, []);

  const alter = isFromUser ? 'You' : bot?.botname;

  return (
    <View style={styles.container}>
      <View style={isFromUser ? styles.userContainer : styles.botContainer}>
        <Image source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'}} style={styles.image} />
        <Text style={styles.nameText}>{name ? name : alter}</Text>
      </View>
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: '70%',
    marginTop: 16,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: '#303136',
  },
  userContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  botContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  nameText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 8,
    marginRight: 8,
    fontWeight: 'normal',
  },
  messageContainer: {
    width: '100%',
    marginTop: 8,
    backgroundColor: '#303136',
    padding: 16,
    borderRadius: 10,
  },
  messageText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '400',
  },
});
