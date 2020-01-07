import React from 'react'

export const Overlay = (props) => {
    return (
        <div id='overlay' className='flex flex-col items-center justify-center absolute top-0 left-0 h-full w-full z-10 rounded bg-gray-300 animated fadeIn'>
            <span className='text-4xl font-bold tracking-tighter text-gray-800'>game over!</span>
            <span className='text-xl font-bold tracking-tighter text-gray-800'>your score: { props.score }</span>
        </div>
    )
}
