import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import 'animate.css'
import './index.css'
import Game from './components/Game'


class App extends Component {
    render() {
        return (
            <div className='flex justify-center bg-gray-200 h-screen mx-auto'>
                <Game />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'))