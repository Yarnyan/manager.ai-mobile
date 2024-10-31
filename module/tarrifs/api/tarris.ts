import { api } from "@/api/api"

const subsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getSubs: build.query<any, any>({
            query: () => ({
                url: '/Subscription/getSubs',
                method: 'GET',
            }),
        }),
        buySubs: build.mutation<any, any>({
            query: (data) => ({
                url: '/Subscription/subscribe_test',
                method: 'POST',
                body: data,
            }),
        }), 
    }),
    overrideExisting: false,
})

export const { useLazyGetSubsQuery, useBuySubsMutation } = subsApi