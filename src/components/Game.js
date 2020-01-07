import React, { Component } from 'react'
import { Tile } from './Tile'
import { Header } from './Header'
import { Overlay } from './Overlay'

export default class Game extends Component {
    constructor(props) {
        super(props)

        this.state = {
            gridSize: 4,
            board: false,
            score: 0,
            gameOver: false,
            highScore: 0
        }
        this.initGame = this.initGame.bind(this)
        this.placeNewTile = this.placeNewTile.bind(this)
    }

    componentDidMount() {
        const storedState = JSON.parse(localStorage.getItem('state'))
        const highScore = storedState !== null ? storedState.highScore : 0
        this.setState(prevState => ({
            ...prevState,
            highScore: highScore
        }), () => {
            if (storedState === null || !storedState.board) {
                this.initGame(this.state.gridSize)
            }
            else {
                this.setState(storedState)
            }
        })

        document.addEventListener('keydown', e => this.handleKeyDown(e))
    }

    // init board by grid size & palce 2 random tiles (2 or 4 only)
    initGame(gridSize = 4) {
        let board = [...Array(this.state.gridSize)].map(e => Array(this.state.gridSize).fill(0))

        board = this.placeNewTile(this.placeNewTile(board))

        this.setState(prevState => ({
            ...prevState,
            board: board,
            score: 0,
            gameOver: false,
            gridSize: gridSize
        }), console.log(this.state))
    }

    // returns the indices of the empty tiles in
    getEmptyTiles(board) {
        const emptyTiles = [];

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === 0) { emptyTiles.push([i, j]) }
            }
        }

        return emptyTiles;
    }

    // places a new random tile on the board
    placeNewTile(board) {
        const emptyTiles = this.getEmptyTiles(board)
        const indices = emptyTiles[Math.floor(Math.random() * emptyTiles.length)]

        board[indices[0]][indices[1]] = Math.random() < 0.5 ? 2 : 4

        return board
    }

    // slides the rows to the left
    slide(board) {
        function slideRow(row) {
            const withoutZeros = row.filter(x => x)
            const onlyZeros = Array(row.length - withoutZeros.length).fill(0)

            return withoutZeros.concat(onlyZeros)
        }

        let slided = []
        for (const rowNum in board) {
            if (board.hasOwnProperty(rowNum)) {
                const row = board[rowNum]
                slided.push(slideRow(row))
            }
        }

        return slided
    }

    // combines the tiles
    combine(board) {
        const combineRow = (row) => {
            let combined = row
            for (let i = 0; i < combined.length - 1; i++) {
                const tileLeft = combined[i]
                const tileRight = combined[i + 1]

                if (tileLeft === tileRight) {
                    combined[i] = tileLeft + tileRight
                    combined[i + 1] = 0
                    this.setScore(tileLeft + tileRight)
                }
            }

            return combined
        }

        let combined = []
        for (const rowNum in board) {
            if (board.hasOwnProperty(rowNum)) {
                const row = board[rowNum]
                combined.push(combineRow(row))
            }
        }

        return combined
    }

    // rotates the board counterclockwise (to the left)
    rotate(board, times = 1) {
        const rotateOnce = board => board[0].map((col, i) => board.map(row => row[i])).reverse()

        let rotated = board
        Array(times).fill().map(() => rotated = rotateOnce(rotated))

        return rotated
    }

    isOver(board) {
        const length = board.length

        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length; j++) {
                if(board[i][j] === 0) {
                    return false
                }
                else if (i !== length - 1 && board[i][j] === board[i + 1][j]) {
                    return false
                }
                else if (j !== length - 1 && board[i][j] === board[i][j + 1]) {
                    return false
                }
            }            
        }
        return true
    }
    
    move(direction) {
        let prevBoard = this.state.board.map((row) => row.slice())
        // rotate the board to the right direction
        let movedBoard = this.rotate(prevBoard, direction)
        // slide the tiles in the rows
        movedBoard = this.slide(movedBoard)
        // combine the tiles in the rows
        movedBoard = this.slide(this.combine(movedBoard))
        // rotate it back to the original direction
        movedBoard = this.rotate(movedBoard, 4 - direction)
        // only add new tile if there is any change on the board
        if (JSON.stringify(prevBoard) != JSON.stringify(movedBoard)) {
            movedBoard = this.placeNewTile(movedBoard)
            this.setState(prevState => ({
                ...prevState,
                board: movedBoard
            }), () => localStorage.setItem('state', JSON.stringify(this.state)))
        } else if (this.isOver(movedBoard)) {
            this.setState(prevState => ({
                ...prevState,
                gameOver: true
            }), () => localStorage.setItem('state', JSON.stringify({ highScore: this.state.highScore })))
        }
    }

    setScore(number) {
        const newScore = this.state.score + number
        this.setState(prevState => ({
            ...prevState,
            score: newScore,
            highScore: newScore < prevState.highScore ? prevState.highScore : newScore
        }))
    }

    animate(direction) {
        const tileNodes = document.querySelectorAll('.tile')
        tileNodes.forEach(node => {
            if (node.getAttribute('value') != 0) {
                switch (direction) {
                    case 0:
                        node.classList.add('animated', 'faster', 'slideInLeft')
                        break
                    case 1:
                        node.classList.add('animated', 'faster', 'slideInDown')
                        break
                    case 2:
                        node.classList.add('animated', 'faster', 'slideInRight')
                        break
                    case 3:
                        node.classList.add('animated', 'faster', 'slideInUp')
                        break
                    default:
                        break
                }
            }
        })
    }

    handleKeyDown(e) {
        switch (e.keyCode) {
            case 37: // arrow left
                this.move(0)
                break
            case 38: // arrow down
                this.move(1)
                break
            case 39: // arrow right
                this.move(2)
                break
            case 40: // arrow up
                this.move(3)
                break
            default:
                break
        }
    }

    
    render() {
        const { gridSize, board, score, highScore, gameOver } = this.state
        let items = []

        for (let i = 0; i < board.length; i++) {
            let subItems = []
            for (let j = 0; j < board.length; j++) {
                subItems.push(<Tile value={board[i][j]} key={[i, j, board[i][j]].join('')} />)
            }
            items.push(<div className='flex items-center' key={i}>{subItems}</div>)
        }

        return (
            <div>
                <Header newGame={ this.initGame } score={ score } highScore={ highScore }/>
                <div className='relative flex items-center flex-col bg-gray-300 rounded p-2'>
                    { board && items }
                    { gameOver ? <Overlay score={ score } /> : null }                    
                </div>
            </div>
        )
    }
}
