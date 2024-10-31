import { createApi } from '@reduxjs/toolkit/query/react';
import { telegramApiUrl } from './routes/routes';
import { baseQueryWithReauth } from './customBaseQuery/customBaseQuery';

export const telegramApi = createApi({
  reducerPath: 'telegramApi',
  baseQuery: baseQueryWithReauth(telegramApiUrl),
  tagTypes: ['Update', 'BotUpdate', 'Auth', 'Create'],
  endpoints: () => ({}),
});

export const { } = telegramApi;
