import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, TextInput, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AvatarContainer from '@/components/ui/avatar/AvatarContainer';
import Message from './components/Message';
import { Ionicons } from '@expo/vector-icons';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useLazyGetChatsQuery, useSendMessageMutation, useLazyGetAllMessageQuery } from './api/chatApi';
import { isApiError } from '@/helpers/auth/apiError';
import { useNavigation } from '@react-navigation/native';

const ChatContainer = () => {
  const chatRef = useRef<ScrollView | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const connectionRef = useRef<HubConnection | null>(null);

  const [m, setM] = useState('');

  const [getChats] = useLazyGetChatsQuery();
  const [getMessages, { isLoading }] = useLazyGetAllMessageQuery();
  const [sendMessage] = useSendMessageMutation();

  const navigation = useNavigation();

  const [bot, setBot] = useState<{ botname: string, id: number } | null>(null);

  const [user, setUser] = useState(null);

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchStorageData = async () => {
      const storedBot = await AsyncStorage.getItem('activePublicBot');
      const storedUser = await AsyncStorage.getItem('user');
      const storedToken = await AsyncStorage.getItem('token');
      setBot(storedBot ? JSON.parse(storedBot) : null);
      setUser(storedUser ? JSON.parse(storedUser) : null);
      setToken(storedToken);
    };

    fetchStorageData();
  }, []);

  useEffect(() => {
    try {
      getChats(null).then((res) => {
        const chatsData = res?.data || [];
        const matchedChat = chatsData.find((chat: any) => chat.botId === bot?.id);
        if (matchedChat) {
          getMessages(matchedChat.id).then((data) => {
            setMessages(data?.data?.detail || []);
          }).catch((error) => {
            console.error(error);
          });
        }
      });
    } catch (error) {
      console.log(isApiError(error));
    }
  }, [navigation, bot]);

  useEffect(() => {
    const fetchStorageData = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        const connection = new HubConnectionBuilder()
          .withUrl('http://82.115.223.149:9999/chat/hub', {
            accessTokenFactory: () => Promise.resolve(storedToken),
          })
          .configureLogging(LogLevel.Information)
          .build();
  
          connection.on('ReceiveMessage', (message: string, chatId: number, isFromUser: boolean) => {
            setMessages((prevMessages: any) => [
              ...prevMessages,
              {
                text: message,
                chatId: chatId,
                isFromUser: isFromUser,
                name: isFromUser ? 'You' : bot?.botname,
              }
            ]);
          });
  
        connection.start()
          .then(() => console.log('Соединение установлено'))
          .catch((error) => console.error('Ошибка при установлении соединения:', error));
      } else {
        console.log('Токен доступа не найден, соединение не может быть установлено');
      }
    };
  
    fetchStorageData();
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSendMessage = (message: string) => {
    const formData = new FormData();
    formData.append('message', message);
    formData.append('botId', String(bot?.id));

    const newMessage = {
      text: message,
      name: 'You',
      isFromUser: true,
    };

    try {
      if (m) {
        sendMessage(formData).unwrap();
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setM('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} ref={chatRef}>
        <View style={styles.avatarContainer}>
          <Image source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'}} style={styles.image} />
          <Text style={styles.botName}>{bot?.botname}</Text>
          <Text style={styles.author}>Author: @Root</Text>
        </View>
        <View style={styles.messagesContainer}>
          {messages.length > 0 && messages.map((item, index) => (
            <View key={index} style={item.isFromUser ? styles.messageUser : styles.messageBot}>
              <Message isFromUser={item.isFromUser} name={item.name} text={item.text} />
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Message"
          onChangeText={setM}
          value={m}
          placeholderTextColor="#bfbfbf"
          onSubmitEditing={() => handleSendMessage(m)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={() => handleSendMessage(m)}>
          <Ionicons name="send" size={20} color="#F5F5F5" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#303136',
  },
  scrollView: {
    width: '100%',
  },
  avatarContainer: {
    alignItems: 'center',
    padding: 16,
    marginTop: 30,
  },
  botName: {
    marginTop: 16,
    color: '#888',
  },
  author: {
    color: '#888',
    fontSize: 14,
  },
  messagesContainer: {
    padding: 16,
    marginTop: 16,
    maxWidth: '100%',
  },
  messageUser: {
    alignItems: 'flex-start',
    width: '100%',
  },
  messageBot: {
    alignItems: 'flex-end',
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 10,
    backgroundColor: '#303136',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#303136',
    borderRadius: 5,
    color: '#F5F5F5',
    paddingHorizontal: 10,
  },
  sendButton: {
    width: 40,
    height: 40,
    backgroundColor: '#303136',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  footerText: {
    color: '#888',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default ChatContainer;
