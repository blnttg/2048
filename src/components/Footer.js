import React from 'react'

export const Footer = () => {
    return (
        <div className='flex flex-col'>
            {/* <div className='flex'>
                <span className='text-xl font-semibold text-gray-700 mx-1'>your name is</span>
                <input type='text' className='w-auto text-xl font-bold text-pink-800 mx-1 bg-transparent' value='asdasd' />
            </div> */}
            <span className='cursor-pointer text-xs font-semibold text-gray-700' onClick={() => {
                localStorage.clear()
                location.reload()
                }}>reset your highscores</span>
        </div>
    )
}
