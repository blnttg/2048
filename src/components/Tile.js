import React from 'react'


export const Tile = (props) => {
    const bgClasses = 'flex items-center justify-center h-20 w-20 m-1 rounded select-none ' + colorByValue(props.value).background
    const fgClasses = 'text-2xl font-black ' + colorByValue(props.value).foreground
    return (
        <div className={ bgClasses }>
            <span className={ fgClasses }>
                { props.value }
            </span>
        </div>
    )
}

const colorByValue = (value) => {
    let foreground = 'text-gray-100'
    let background
    switch (parseInt(value)) {
        case 0:
            background = 'bg-gray-400'
            foreground = 'text-gray-400'
            break
        case 2:
            background = 'bg-orange-100'
            foreground = 'text-gray-800'
            break
        case 4:
            background = 'bg-orange-200'
            foreground = 'text-gray-800'
            break
        case 8:
            background = 'bg-orange-300'
            foreground = 'text-gray-800'
            break
        case 16:
            background = 'bg-orange-400'
            break
        case 32:
            background = 'bg-orange-500'
            break
        case 64:
            background = 'bg-orange-600'
            break
        case 128:
            background = 'bg-yellow-400'
            break
        case 256:
            background = 'bg-yellow-500'
            break
        case 512:
            background = 'bg-yellow-600'
            break
        case 1024:
            background = 'bg-red-400'
            break
        case 2048:
            background = 'bg-red-500'
            break
        default:
            background = 'bg-red-600'
            break
    }

    return { foreground, background }
}
