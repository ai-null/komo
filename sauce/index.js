import React from 'react'
import ReactDOM from 'react-dom'
import App from './container/App'
import {getFilePath} from '../renderer-process/path'

const dom = document.getElementById('app')

let file = []

file.push(getFilePath())

ReactDOM.render(
    <App sauce={file[0] === null ? 'lol' : file[0]}/>,
    dom
)