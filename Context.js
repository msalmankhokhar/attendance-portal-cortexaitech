import { createContext, useState } from "react";

export const ContextData = createContext()

export default function Context({ children }){

    const [theme, setTheme] = useState('Light')
    const [user, setUser] = useState({})
    const [admin, setAdmin] = useState({})
    const value = { theme, setTheme, user, setUser, admin, setAdmin}
    return (
        <ContextData.Provider value={value}>
            { children }
        </ContextData.Provider>
    )
}