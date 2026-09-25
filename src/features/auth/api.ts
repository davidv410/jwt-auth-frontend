import { publicApi } from "../../lib/axios";
import type { LoginSchemaBody, RegisterSchemaBody } from "./schema";

export const loginUser = async (body: LoginSchemaBody) => {
    const { data } = await publicApi.post('/auth/login', body)
    return data.user
}

export const registerUser = async (body: RegisterSchemaBody) => {
    const { data } = await publicApi.post('/auth/register', body)
    return data.user
}

export const getUser = async () => {
    const { data } = await publicApi.get('/auth/user')
    return data
}

export const logoutUser = async () => {
    await publicApi.post('/auth/logout')
}