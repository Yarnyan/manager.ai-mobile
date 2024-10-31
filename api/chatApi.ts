import { createApi } from '@reduxjs/toolkit/query/react';
import { chatApiUrl } from './routes/routes';
import { baseQueryWithReauth } from './customBaseQuery/customBaseQuery';

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: baseQueryWithReauth(chatApiUrl),
  tagTypes: ['Update', 'BotUpdate', 'Auth', 'Create'],
  endpoints: () => ({}),
});

export const { } = chatApi;
