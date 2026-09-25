import { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "./api";
import { publicApi } from "../../lib/axios";

type User = {
    id: string;
    name: string;
    role: string
}

type AuthContextType = {
    user: User | null
    login: (user: User) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const getUserInfo = async () => {
            try{
                const fetchedUser = await getUser()
                setUser(fetchedUser)
            }catch{
                try{
                    await publicApi.post('/auth/refresh')
                    const fetchedUser = await getUser()
                    setUser(fetchedUser)
                    console.log('initial refresh successful')
                }catch{
                    setUser(null)
                }
            }finally{
                setLoading(false)
            }
        }
        getUserInfo()
    }, [])

    if(loading) return <p>Loading...</p>
    const login = (user: User) => setUser(user)
    const logout = () => setUser(null)

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) throw new Error('useAuth is being used outside the AuthProvider')
    return context
}