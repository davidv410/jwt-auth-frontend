import { Route, Routes } from "react-router-dom"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { Home } from "./pages/Home"
import { Admin } from "./pages/Admin"
import { AdminRoute } from "./pages/AdminRoute"

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/admin" element={
            <AdminRoute>
              <Admin/>
            </AdminRoute>
            }/>
        </Routes>
      </main>
    </>
  )
}

export default App
