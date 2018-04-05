import React from 'react'
import ReactDOM from 'react-dom'
import App from './container/App'

const dom = document.getElementById('app')

require('events').EventEmitter.defaultMaxListeners = 15;

ReactDOM.render(
    <App />,
    dom
)