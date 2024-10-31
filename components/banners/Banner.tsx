import { View, Image, Text, StyleSheet, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import { formatText } from '@/helpers/formatText'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
type Props = {
  id: number
  img: string
  author: string
  botname: string
  description: string
  prompt: string
  showBuilderModal: () => void
}

const styles = StyleSheet.create({
  container: {
    minHeight: 36,
    padding: 10,
    backgroundColor: '#202024',
    borderRadius: 8,
    flexDirection: 'row',
    width: '100%',
    height: 146,
  },
  image: {
    width: 114,
    height: 114,
    borderRadius: 8
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    lineHeight: 20,
    color: '#fff',
  },
  authorText: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 5
  },
  descriptionText: {
    fontSize: 12,
    lineHeight: 16,
    color: '#fff',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  }
})

export default function Banner({ id, img, author, botname, description, prompt, showBuilderModal }: Props) {

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
    };
    
    fetchToken();
  }, []);
  const ha = () => {
    AsyncStorage.setItem('activePublicBot', JSON.stringify({ id, botname, description, prompt }));
    showBuilderModal()
  };
  return (
    <View style={styles.container}>
      <Image source={{ uri: img }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{botname}</Text>
        <Text style={styles.authorText}>Автор: {author}</Text>
        <Text style={styles.descriptionText}>{formatText(description, 180)}</Text>
      </View>
      <View style={styles.btnContainer}>
        {token && (
          <Pressable onPress={ha}>
            <MaterialCommunityIcons name="connection" size={20} color="#ccc" />
          </Pressable>
        )}
      </View>
    </View>
  )
}