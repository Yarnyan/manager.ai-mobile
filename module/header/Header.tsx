import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AvatarContainer from '@/components/ui/avatar/AvatarContainer';
import * as SplashScreen from 'expo-splash-screen';

type Props = {
  openRegModal?: () => void,
  openLogModal?: () => void,
};

export default function Header({ openRegModal, openLogModal }: Props) {
  const [token, setToken] = useState<boolean | null>(null);

  useEffect(() => {
    const getToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setToken(true);
      } else {
        setToken(false);
      }
    };

    getToken();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (token !== null) {
      await SplashScreen.hideAsync();
    }
  }, [token]);

  if (token === null) {
    return null; 
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View>
        <Text style={styles.welcomeText}>Manager AI</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 40,
    width: '100%',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '400',
    color: '#fafafa',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 10,
  },
  authButtons: {
    flexDirection: 'row',
  },
  regButton: {
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    marginRight: 10,
  },
  buttonText: {
    color: '#000',
  },
  logButton: {
    padding: 10,
  },
  logText: {
    color: '#000',
  },
});
