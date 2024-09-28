
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
      baseUrl: 'http://192.168.1.72:8444/api',
      prepareHeaders: async (headers) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          headers.set('authorization', `Bearer ${token}`);
        }
        headers.set("ngrok-skip-browser-warning", "*");
        return headers;
      },
    }),
    tagTypes: ['Update', 'BotUpdate', 'Auth'],
    endpoints: () => ({}),
  });

export const { } = api