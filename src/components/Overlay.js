import React from 'react'

export const Overlay = (props) => {
    return (
        <div id='overlay' className='absolute top-0 left-0 h-full w-full z-10 rounded bg-gray-400 animated fadeIn'>
            <h2 className='text-4xl font-bold text-center'>Game Over!</h2>
        </div>
    )
}
