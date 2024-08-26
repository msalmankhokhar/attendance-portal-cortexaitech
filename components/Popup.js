import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

export default function Popup({ content, hidden=true, id, onClose }) {
    let [ displayNone, setDisplayNone ] = useState(hidden)

    function closeBtnHandler(){
        setDisplayNone(true)
        onClose()
    }

    React.useEffect(() => {
        setDisplayNone(hidden);
      }, [hidden]);

    return (
        <div id={id} style={{minHeight: '450px'}} className={`${displayNone ? 'hidden' : 'block'} absolute rounded-md top-5 shadow-lg border dark:border-slate-600 w-full z-10 max-w-screen-md bg-white dark:bg-slate-800 p-5`}>
            <button onClick={closeBtnHandler} className='absolute top-5 right-5 rounded-full w-10 h-10 bg-slate-100 dark:bg-slate-700 flex items-center justify-center'>
                <FontAwesomeIcon className='text-sm text-black dark:text-white' icon={faXmark}/>
            </button>
            {content}
        </div>
    )
}
