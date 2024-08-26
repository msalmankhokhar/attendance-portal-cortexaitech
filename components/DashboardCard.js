import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons'

export default function DashboardCard({ title='Total Workforce', num=150, percent=10, icon=faPeopleGroup }) {
    return (
        <div className='border dark:border-slate-700 shadow-md rounded-md flex flex-col gap-5 p-5 bg-white dark:bg-gray-800'>
            <div className="flex justify-between items-start gap-12">
                <div className='border border-neutral-300 dark:border-slate-500 p-2 rounded w-8 h-8 flex items-center justify-center'>
                    <FontAwesomeIcon className='text-xs text-slate-700 dark:text-white' icon={icon} />
                </div>
                {
                    percent && <div className='text-xs text-neutral-500 dark:text-white font-medium'>
                        <span className='text-green-600 dark:text-green-500'>{percent}%</span> vs last month
                    </div>
                }
            </div>
            <h2 className='text-xs font-medium text-neutral-600 dark:text-white'>{title}</h2>
            <span className='text-2xl font-bold leading-none text-slate-800 dark:text-white'>{num}</span>
        </div>
    )
}
