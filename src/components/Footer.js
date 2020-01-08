import React from 'react'

export const Footer = () => {
    return (
        <div className='flex flex-col px-3 py-5 select-none'>
            <div className='flex'>
                <span className='text-xl font-semibold text-gray-700 mx-1'>your name is</span>
                <input type='text' className='w-auto text-xl font-bold text-pink-800 mx-1 bg-transparent' value='asdasd' />
            </div>
        </div>
    )
}
