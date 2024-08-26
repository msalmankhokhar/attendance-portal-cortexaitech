import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import Context, { ContextData } from '@/Context'
import { useContext } from 'react'


export default function ThemeButton({ absolute = false }) {
    const { theme, setTheme } = useContext(ContextData)

    const toggleTheme = ()=>{
        const html = document.documentElement
        const mode = html.getAttribute("data-mode")
        if (mode === "dark") {
            html.setAttribute("data-mode", "light")
            setTheme("Light")
        }else{
            html.setAttribute("data-mode", "dark")
            setTheme("Dark")
        }
    }

    return (
        <button type='button' className={`flex ${absolute && 'absolute top-10 right-10 z-1'}`} id='themeBtn' onClick={toggleTheme}>
            <FontAwesomeIcon icon={faMoon} className='text-lg dark:text-white leading-none'/>
        </button>
    )
}
