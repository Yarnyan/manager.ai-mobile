import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const customBaseQuery = (baseUrl) => fetchBaseQuery({
  baseUrl,
  prepareHeaders: async (headers) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    headers.set("ngrok-skip-browser-warning", "*");
    headers.set('Accept', '*/*');
    headers.set('Access-Control-Allow-Origin', '*');
    return headers;
  },
});

export const baseQueryWithReauth = (baseUrl) => async (args, api, extraOptions) => {
  const result = await customBaseQuery(baseUrl)(args, api, extraOptions);

  if (result.error && result.error.status === 401) {

    await AsyncStorage.clear();
    router.replace('/login');
  }

  return result;
};
