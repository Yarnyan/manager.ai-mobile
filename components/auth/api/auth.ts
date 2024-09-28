import { api } from "../../../api/api"
import { ISignIn, ISignUp } from "../entity/entity"
const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        signUp: build.mutation<ISignUp, any>({
            query: (data) => ({
                url: '/Auth/signUp',
                method: 'POST',
                body: data,
            }),
        }),
        signIn: build.mutation<any, any>({
            query: (data) => ({
                url: '/Auth/signIn',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Auth']
        })
    }),
    overrideExisting: false,
})

export const { useSignUpMutation, useSignInMutation } = authApi