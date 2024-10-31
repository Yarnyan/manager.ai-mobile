import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useFocusEffect } from 'expo-router';

function CustomTabBarIcon({ name, type, color }) {
  const IconComponent = type === 'Feather' ? Feather : type === 'AntDesign' ? AntDesign : Ionicons;
  return <IconComponent name={name} size={20} style={{ marginBottom: -3 }} color={color} />;
}

export default function TabLayout() {
  const router = useRouter();

  const checkAuth = async (routeName) => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      router.replace('/login');
    } else {
      router.replace(routeName);
    }
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="tarrifs"
        options={{
          title: 'Tarrifs',
          tabBarIcon: ({ color, focused }) => (
            <CustomTabBarIcon name="creditcard" type="AntDesign" color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            checkAuth('tarrifs');
          },
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <CustomTabBarIcon name={focused ? 'home' : 'home-outline'} type="Ionicons" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <CustomTabBarIcon name="user" type="AntDesign" color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            checkAuth('profile');
          },
        }}
      />
    </Tabs>
  );
}
