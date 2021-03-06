import React from 'react'

const ScoreBoard = (props) => {
    return (
        <div className='flex flex-col items-center w-20 mx-1 py-1 px-2 rounded bg-gray-300'>
            <span className='text-gray-600 tracking-tight'>{props.title}</span>
            <span className='text-xl font-semibold text-gray-800 tracking-tight'>{props.score}</span>
        </div>
    )
}

export const Header = (props) => {
    return (
        <div className='flex items-center flex-col px-0 sm:px-1 py-2 select-none'>
            <h1 className='sm:text-5xl text-2xl tracking-tighter sm:tracking-normal text-center font-bold py-2 text-gray-700'>2048</h1>
            <div className='flex justify-end'>
                <div className='flex flex-col items-center mx-1 py-1 px-4 rounded bg-gray-300'>
                    <span className='font-semibold text-gray-800 tracking-tight'>new game</span>
                    <div className='flex justify-around'>
                        <span className='cursor-pointer mx-1 text-xl font-bold text-orange-800' onClick={() => props.newGame(3)}>3x3</span>
                        <span className='cursor-pointer mx-1 text-xl font-bold text-blue-800' onClick={() => props.newGame(4)}>4x4</span>
                        <span className='cursor-pointer mx-1 text-xl font-bold text-green-800' onClick={() => props.newGame(5)}>5x5</span>
                    </div>
                </div>
                <div className='flex'>
                    <ScoreBoard title='current' score={props.score} />
                    <ScoreBoard title='best' score={props.highScore} />
                </div>
            </div>
        </div>
    )
}
