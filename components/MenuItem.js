import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

export default function MenuItem({ text="MenuItem", icon=null, route="#", selected=false, onClick=null}) {
    return (
        <li onClick={onClick} className={`px-4 py-3 w-full rounded-md flex gap-3 text-sm font-semibold border border-transparent transition-colors duration-300 ${selected ? 'bg-blue-600 text-white border-amber-50' : 'text-gray-600 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-800'}`}>
            <FontAwesomeIcon icon={icon} className='leading-none self-center' />
            <Link className='pt-0.5' href={route}>{text}</Link>
        </li>
    )
}
