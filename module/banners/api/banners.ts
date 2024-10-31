import { api } from "@/api/api"

const bannersApi = api.injectEndpoints({
    endpoints: (build) => ({
        getPublicBots: build.query<any, any>({
            query: () => ({
                url: '/Bot/getPublicBots',
            }),
            providesTags: ['Auth']
        }),
        createBot: build.mutation<any, any>({
            query: (data) => ({
                url: '/Bot/createBot',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Create']
        }),
    }),
    overrideExisting: false,
})

export const { useLazyGetPublicBotsQuery, useCreateBotMutation } = bannersApi