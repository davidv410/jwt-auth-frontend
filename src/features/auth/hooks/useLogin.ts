import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { loginSchema } from "../schema"
import type { LoginSchemaBody } from "../schema"
import { useMutation } from "@tanstack/react-query"
import { loginUser } from "../api"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../Context"

export const useLogin = () => {
    const navigate = useNavigate()
    const { login } = useAuth()
    const [serverError, setServerError] = useState<string | null>(null)

    const { register, handleSubmit, formState: { errors } } = useForm<LoginSchemaBody>({ resolver: zodResolver(loginSchema)})

    const { mutateAsync, isPending } = useMutation({
        mutationFn: loginUser
    })

    const submitForm = async(data: LoginSchemaBody) => {
        setServerError(null)
        try{
            const response = await mutateAsync(data)
            login(response)
            navigate('/')
        }catch(err: any){
            setServerError(err.response?.data?.message)
        }
    }

    return { register, handleSubmit, submitForm, serverError, errors, isSubmitting: isPending }
}