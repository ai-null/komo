import React from 'react'
import Title from './title/Title'
import Video from './video/Video'
import VideoControl from './video/VideoControl'
import MiddleBtn from './video/MiddleBtn';

let electron = window.require('electron')
let {ipcRenderer} = electron || electron.remote

const VIDEOID = 'video-player'
const PROG_BAR = 'mnt-range'
const VOLM_BAR = 'volume-range'
const MID_BTN = 'middleBtn'

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

            document.getElementById(VIDEOID).classList.remove('playing')

            let f = document.getElementById('play').firstChild.classList
            let midBtn = document.getElementById(MID_BTN)

            midBtn.style.visibility = 'visible'
            midBtn.classList.add('show')
            setTimeout(() => {
                midBtn.classList.remove('show')
                midBtn.classList.remove('isGone')
            }, 300);

            f.remove('fa-pause')
            f.add('fa-play')
        })

        ipcRenderer.on('kntl', (e, data) => {
            let p = data[0].split('/');
            let l = p.length;

            let title = p[l - 1]
            this.setState({
                title
            })
        })
    }

    shortcut() {
        let v = document.getElementById(VIDEOID)
        let g = document.getElementById(MID_BTN)
        let f = document.getElementById('play').firstChild.classList

        window.addEventListener('keyup', (e) => {
            switch (e.keyCode) {
                case 32: // space || pause & play
                    if (v.classList.length === 0 ) {
                        // play the video and set the class
                        v.play()
                        v.classList.add('playing')

                        // setting play button
                        f.remove('fa-play')
                        f.add('fa-pause')

                        g.classList.add('isGone')
                        setTimeout(() => {
                            g.classList.remove('isGone')
                            g.style.visibility = 'hidden'
                        }, 300);
                    } else {
                        v.pause()
                        v.classList.remove('playing')

                        g.style.visibility = 'visible'
                        g.classList.add('show')
                        setTimeout(() => {
                            g.classList.remove('show')
                        }, 300);

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
        let g = document.getElementById(MID_BTN)
        let f = document.getElementById('play').firstChild.classList

        for (let e of btn) {
            e.addEventListener('click', () => {
                switch (e.id) {
                    case 'play': // play and pause
                        if (f.contains('fa-play')) {
                            // play the video and set the class
                            v.play()
                            v.classList.add('playing')

                            // setting play button
                            f.remove('fa-play')
                            f.add('fa-pause')

                            g.classList.add('isGone')
                            setTimeout(() => {
                                g.classList.remove('isGone')
                                g.style.visibility = 'hidden'
                            }, 300);
                        } else {
                            v.pause()
                            v.classList.remove('playing')

                            g.style.visibility = 'visible'
                            g.classList.add('show')
                            setTimeout(() => {
                                g.classList.remove('show')
                            }, 300);

                            f.remove('fa-pause')
                            f.add('fa-play')
                        }
                        break;
                    case 'middleBtn':
                        if (v.classList.length === 0) {
                            v.play()
                            v.classList.add('playing')

                            f.remove('fa-play')
                            f.add('fa-pause')
                            
                            g.classList.add('isGone')
                            setTimeout(() => {
                                g.classList.remove('isGone')
                                g.style.visibility = 'hidden'
                            }, 300);
                        } else {
                            v.pause()
                            v.classList.remove('playing')

                            g.style.visibility = 'visible'
                            g.classList.add('show')
                            setTimeout(() => {
                                g.classList.remove('show')
                            }, 300);

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
            <Title t={this.state.title === undefined ? 'Welcome to Komo' : this.state.title}/>
            <MiddleBtn />
            <Video sauce = {this.state.path === undefined ? null : this.state.path} id = {VIDEOID}/> 
            <VideoControl />
        </div>
        )
    }
}