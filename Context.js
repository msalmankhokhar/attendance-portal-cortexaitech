import { createContext, useState } from "react";

export const ContextData = createContext()

export default function Context({ children }){

    const [theme, setTheme] = useState('Light')
    const [user, setUser] = useState({})
    const [admin, setAdmin] = useState({})
    const [sideMenuOpenEmployee, setSideMenuOpenEmployee] = useState(false)
    const value = { theme, setTheme, user, setUser, admin, setAdmin, sideMenuOpenEmployee, setSideMenuOpenEmployee }
    return (
        <ContextData.Provider value={value}>
            { children }
        </ContextData.Provider>
    )
}