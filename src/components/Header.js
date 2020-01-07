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
        <div className='flex flex-col px-3 py-5'>
            <h1 className='text-5xl text-center font-bold m-5 text-gray-700'>2048</h1>
            <div className='flex justify-between'>
                {/* <button className='text-xl font-bold' onClick={props.newGame}>New Game</button> */}
                <div className='flex flex-col items-center mx-1 py-1 px-4 rounded bg-gray-300'>
                    <span className='font-semibold text-gray-800 tracking-tight'>new game</span>
                    <div className='flex justify-around'>
                        <span className='cursor-pointer mx-1 text-xl font-bold text-green-800' onClick={() => props.newGame(3)}>3x3</span>
                        <span className='cursor-pointer mx-1 text-xl font-bold text-gray-800 text-blue-800' onClick={() => props.newGame(4)}>4x4</span>
                        <span className='cursor-pointer mx-1 text-xl font-bold text-gray-800 text-orange-800' onClick={() => props.newGame(5)}>5x5</span>
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
