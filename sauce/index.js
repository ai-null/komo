import React from 'react'
import ReactDOM from 'react-dom'
import App from './container/App'
import {getFilePath} from '../renderer-process/path'

const dom = document.getElementById('app')

getFilePath()

ReactDOM.render(
    <App />,
    dom
)