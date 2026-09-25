import { useRegister } from "../features/auth/hooks/useRegister"

export const Register = () => {

    const { register, handleSubmit, submitForm, serverError, errors, isSubmitting } = useRegister()
    return(
        <>
            register
            <form onSubmit={handleSubmit(submitForm)}>
                <input {...register('name')} placeholder="name"/><br/>
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                <input {...register('email')} placeholder="email"/><br/>
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                <input {...register('password')} placeholder="password"/><br/>
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                <button disabled={isSubmitting}>register</button>
                {serverError && <p className="text-red-500">{serverError}</p> }
            </form>
        </>
    )
}