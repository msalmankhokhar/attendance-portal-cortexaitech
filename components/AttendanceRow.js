import React from 'react'

export default function AttendanceRow({ attendance }) {
    return (
        <tr className='border-b dark:border-b-slate-600'>
            <td className='text-left pl-4 py-2 text-xs font-semibold rounded-l-md dark:text-white'>{new Date(attendance.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
            <td className='text-left py-2 text-sm rounded-l-md dark:text-white'>
                {
                    attendance.status === 'Present' ? <span className='px-5 font-semibold py-2 border dark:border-slate-700 bg-green-50 text-green-600 dark:text-green-400 dark:bg-slate-800 text-xs rounded-md'>{attendance.status}</span> :
                    <span className='font-semibold px-5 py-2 border dark:border-slate-700 bg-red-50 text-red-600 dark:text-red-400 dark:bg-slate-800 text-xs rounded-md'>{attendance.status}</span>
                }
            </td>
            <td className='text-left py-2 text-sm rounded-l-md dark:text-white'>
                <span className={`px-5 font-semibold py-2 border dark:border-slate-700 ${attendance.checkIn ? 'bg-green-50 text-green-600 dark:text-green-400' : 'bg-red-50 text-red-600 dark:text-red-400'} dark:bg-slate-800 text-xs rounded-md`}>{attendance.checkIn ? new Date(attendance.checkIn).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) : 'null'}</span>
            </td>
            <td className='text-left py-2 text-sm rounded-l-md dark:text-white'>
                <span className={`px-5 font-semibold py-2 border dark:border-slate-700 ${attendance.checkOut ? 'bg-green-50 text-green-600 dark:text-green-400' : 'bg-red-50 text-red-600 dark:text-red-400'} dark:bg-slate-800 text-xs rounded-md`}>{attendance.checkOut ? new Date(attendance.checkOut).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) : 'null'}</span>
            </td>
            <td className='text-left py-2 text-sm rounded-l-md dark:text-white'>
                <span className='px-5 font-semibold py-2 border dark:border-slate-700 bg-red-50 text-red-600 dark:text-red-400 dark:bg-slate-800 text-xs rounded-md'>{attendance.workLogs ? attendance.workLogs : 'null'}</span>
            </td>
            <td className='text-left py-2 text-sm rounded-l-md dark:text-white'>
                <button className='inline-block px-5 py-2 bg-blue-600 text-white text-xs font-semibold rounded-md'>Edit Record</button>
            </td>
        </tr>
    )
}
