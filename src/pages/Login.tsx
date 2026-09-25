import { useLogin } from "../features/auth/hooks/useLogin"

export const Login = () => {

    const { register, handleSubmit, submitForm, serverError, errors, isSubmitting } = useLogin()

    return(
        <>
            login
            <form onSubmit={handleSubmit(submitForm)}>
                <input {...register('name')} placeholder="name"/><br/>
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                <input {...register('password')} placeholder="password"/><br/>
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                <button disabled={isSubmitting}>LOGIN</button>
                { serverError && <p className="text-red-500">{serverError}</p> }
            </form>
        </>
    )
}