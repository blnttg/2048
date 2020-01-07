import React, { Component } from 'react'
import 'animate.css'
import { Tile } from './Tile'
import { Header } from './Header'

export default class Game extends Component {
    constructor(props) {
        super(props)

        this.state = {
            gridSize: 3,
            board: false,
            score: 0,
            gameOver: false
        }
        this.initGame = this.initGame.bind(this)
        this.placeNewTile = this.placeNewTile.bind(this)
    }

    componentDidMount() {
        this.initGame()
        document.addEventListener('keydown', e => this.handleKeyDown(e))
    }

    // init board by grid size & palce 2 random tiles (2 or 4 only)
    initGame() {
        let board = [...Array(this.state.gridSize)].map(e => Array(this.state.gridSize).fill(0))

        board = this.placeNewTile(this.placeNewTile(board))

        this.setState(prevState => ({
            ...prevState,
            board: board
        }))
        console.log(this.state)
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
        function combineRow(row) {
            let combined = row
            for (let i = 0; i < combined.length - 1; i++) {
                const tileLeft = combined[i]
                const tileRight = combined[i + 1]
    
                if (tileLeft === tileRight) {
                    combined[i] = tileLeft + tileRight
                    combined[i + 1] = 0
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

    move(direction) {
        // check for game over
        let emptyTilesLeft = this.getEmptyTiles(this.state.board).length
        if (emptyTilesLeft > 0) {
            // rotate the board to the right direction
            let board = this.rotate(this.state.board, direction)
            // slide the tiles in the rows
            let slided = this.slide(board)
            // combine the tiles in the rows
            let combined = this.slide(this.combine(slided))
            // place new tile & rotate it back to the original direction
            const moved = this.rotate(this.placeNewTile(combined), 4 - direction)
            //save it to the state
            this.setState(prevState => ({
                ...prevState,
                board: moved
            }))
        }
        else {
            this.setState(prevState => ({
                ...prevState,
                gameOver: true
            }))
        }
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
        const { gridSize, board, score } = this.state
        let items = []

        for (let i = 0; i < board.length; i++) {
            let subItems = []
            for (let j = 0; j < board.length; j++) {
                subItems.push(<Tile value={board[i][j]} key={[i, j, board[i][j]].join('')} />)
            }
            items.push(<div className='flex' key={i}>{subItems}</div>)
        }

        return (
            <div>
                <Header newGame={this.initGame} score={score} />
                <div className='flex flex-col bg-gray-300 rounded p-2'>
                    { this.state.board && items }
                    { this.state.gameOver && 
                        <div className='h-full w-full bg-gray-400'>
                            <h2 className='text-4xl font-bold text-center'>Game Over!</h2>
                        </div>
                    }
                </div>
            </div>
        )
    }
}
