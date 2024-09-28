import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { formatText } from '@/helpers/formatText';
import { useAppDispatch } from '@/store/hooks';
type Props = {
  image: string
  botname: string
  description: string
  id: number
  prompt: string
  type: string
};

export default function BotProfile({ image, botname, description }: Props) {
  const dispatch = useAppDispatch()
  console.log(botname)
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={require('../../../assets/images/favicon.png')} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{botname}</Text>
          <Text style={styles.description}>
            {formatText(description, 50)}
          </Text>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <Pressable onPress={() => console.log('Edit pressed')}>
          <MaterialIcons name="edit" size={20} color="#ccc" />
        </Pressable>
        <Pressable onPress={() => console.log('Telegram pressed')} style={styles.telegramButton}>
          <AntDesign name="sharealt" size={20} color="#ccc" />
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
  telegramButton: {
    marginTop: 16,
  },
});
