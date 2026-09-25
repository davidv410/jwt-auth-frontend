import { useForm } from "react-hook-form"
import { registerSchema, type RegisterSchemaBody } from "../schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { registerUser } from "../api"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const useRegister = () => {
    const navigate = useNavigate()
    const [serverError, setServerError] = useState<string | null>(null)
    
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterSchemaBody>({resolver: zodResolver(registerSchema)})

    const { mutateAsync, isPending } = useMutation({
        mutationFn: registerUser
    })

    const submitForm = async (data: RegisterSchemaBody) => {
        setServerError(null)
        try{
            await mutateAsync(data)
            navigate('/login')
        }catch(err: any){
            setServerError(err.response?.data?.message)
        }
    }

    return { register, handleSubmit, submitForm, serverError, errors, isSubmitting: isPending }
}