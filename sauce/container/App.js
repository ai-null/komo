import React from 'react'
import Title from './title/Title'
import Video from './video/Video'
import VideoControl from './video/VideoControl'

let electron = window.require('electron')
let {ipcRenderer} = electron || electron.remote

const VIDEOID = 'video-player'
const PROG_BAR = 'mnt-range'
const VOLM_BAR = 'volume-range'

export default class App extends React.Component {
    constructor(...argument) {
        super(...argument)
        this.state = {

        }
    }

    componentDidMount() {
        this.getFilePath()
        this.controls()
        this.shortcut()
        // setting DOM
        document.getElementById(PROG_BAR).value = 0
        document.getElementById(VOLM_BAR).value = 0
    }

    getFilePath() {
        ipcRenderer.on('open-file', (e, path) => {
            this.setState({
                path
            })

            let f = document.getElementById('play').firstChild.classList
            f.remove('fa-pause')
            f.add('fa-play')

            document.getElementById(VIDEOID).classList.remove('playing')
        })
    }

    shortcut() {
        let v = document.getElementById(VIDEOID)
        let f = document.getElementById('play').firstChild.classList

        window.addEventListener('keyup', (e) => {
            switch (e.keyCode) {
                case 32:
                    if (v.classList.length === 0 ) {
                        v.classList.add('playing')
                        v.play()

                        f.remove('fa-play')
                        f.add('fa-pause')
                    } else {
                        v.pause()
                        v.classList.remove('playing')

                        f.remove('fa-pause')
                        f.add('fa-play')
                    }
                break;
            }
        })
    }

    controls() {
        let btn = document.getElementsByClassName('btn')
        let v = document.getElementById(VIDEOID)

        for (let e of btn) {
            e.addEventListener('click', () => {
                switch (e.id) {
                    case 'play': // play and pause
                        let f = e.firstChild.classList
                        if (v.classList.contains('playing')) {
                            // play the video and set the class
                            v.play()
                            v.classList.add('playing')
                            // setting play button
                            f.remove('fa-play')
                            f.add('fa-pause')
                        } else {
                            v.pause()
                            v.classList.remove('playing')
                            f.remove('fa-pause')
                            f.add('fa-play')
                        }
                        break;
                    case 'expand':
                        v.webkitRequestFullscreen();
                        break;
                }
            })
        }
    }

    render() {
        return ( 
        <div >
            <Title />
            <Video sauce = {this.state.path === undefined ? ' ' : this.state.path} id = {VIDEOID}/> 
            <VideoControl />
        </div>
        )
    }
}