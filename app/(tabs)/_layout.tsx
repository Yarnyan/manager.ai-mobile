import { Tabs } from 'expo-router';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

function CustomTabBarIcon({ name, type, color }) {
  const IconComponent = type === 'Feather' ? Feather :
                        type === 'AntDesign' ? AntDesign :
                        Ionicons; 

  return <IconComponent name={name} size={20} style={{ marginBottom: -3 }} color={color} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ color, focused }) => (
            <CustomTabBarIcon name={focused ? 'edit-2' : 'edit-2'} type="Feather" color={color} />
          ),
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
            <CustomTabBarIcon name={focused ? 'user' : 'user'} type="AntDesign" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
