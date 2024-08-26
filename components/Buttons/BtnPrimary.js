import React from 'react'
import Image from 'next/image'

export default function BtnPrimary({ text, loader = false }) {
    return (
        <button disabled={loader} className="relative flex gap-2 items-center justify-center bg-amber-500 text-white hover:bg-yellow-500 transition-colors duration-300 font-semibold py-4 px-5 rounded-full text-sm leading-none">
            <span>{ text }</span>
            {
                loader && <Image src={'/loaders/btnloader.svg'} width={30} height={30} alt='loader' className='absolute right-5' />
            }
        </button>
    )
}
