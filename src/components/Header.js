import React from 'react'

export const Header = (props) => {
    return (
        <div className='flex flex-col p-5'>
            <h1 className='text-4xl text-center font-bold p-2'>2048</h1>
            <div className='flex justify-around'>
                <button className='text-xl font-bold' onClick={ props.newGame }>New Game</button>
                {/* <button className='text-xl font-bold' onClick={ props.newGame }>Board Size </button> */}
                <span className='text-xl font-bold'>Score: { props.score }</span>
            </div>
        </div>
    )
}
