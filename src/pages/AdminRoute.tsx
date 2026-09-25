import { Navigate } from "react-router-dom"
import { useAuth } from "../features/auth/Context"

export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth()
    return (user && user!.role === "admin") ? children : <Navigate to="/blogs" />
}