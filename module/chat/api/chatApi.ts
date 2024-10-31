import { api } from "../../../api/api"
import { IMessage } from "../entity/entity"
import { chatApi } from "../../../api/chatApi"

const socketApi = chatApi.injectEndpoints({
    endpoints: (build) => ({
        getAllMessage: build.query<any, unknown>({
            query: (id) => (
                {
                    url: `/chat/getMessages?chatId=${id}`,
                }),
        }),
        sendMessage: build.mutation<IMessage, any>({
            query: (data) => ({
                url: '/chat/sendMessage',
                method: 'POST',
                body: data
            }),
        }),
        getChats: build.query<any, any>({
            query: () => ({
                url: '/chat/getChats',
            }),
        })
    }),
    overrideExisting: false,
})

export const { useLazyGetAllMessageQuery, useSendMessageMutation, useLazyGetChatsQuery } = socketApi