import { telegramApi } from "../../../api/telegramApi"

const botApi = telegramApi.injectEndpoints({
    endpoints: (build) => ({
        getStatus: build.query<any, any>({
            query: (id) => ({
                url: `api/telegram/getStatus?botId=${id}`,
            }),
        }),
        addTelegtamBot: build.mutation<any, any>({
            query: (data) => ({
                url: 'api/telegram/addBot',
                method: 'POST',
                body: data,
            }),
        }),
        authBot: build.mutation<any, any>({
            query: (data) => ({
                url: 'api/telegram/authBot',
                method: 'POST',
                body: data,
            }),
        }),
        removeBot: build.mutation<any, any>({
            query: (data) => ({
                url: 'api/telegram/removeBot',
                method: 'DELETE',
                body: data,
            }),
            invalidatesTags: ['BotUpdate'],
        })
    }),
    overrideExisting: false,
})

export const { useLazyGetStatusQuery, useAddTelegtamBotMutation, useAuthBotMutation, useRemoveBotMutation } = botApi