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

    /**
     * 
     * @param {DOM} arg
     * put access dom here, like video's or button's DOM
     */
    play(...arg) {
        let v = document.getElementById(VIDEOID)
        let g = document.getElementById(MID_BTN)
        let f = document.getElementById('play').firstChild.classList
        // video play        
        v.play()
        v.classList.add('playing')

        // showing the middle button
        g.classList.add('isGone')
        setTimeout(() => {
            g.classList.remove('isGone')
            g.style.visibility = 'hidden'
        }, 300);

        // setting play button
        f.remove('fa-play')
        f.add('fa-pause')
    }

    pause (...arg) {
        let v = document.getElementById(VIDEOID)
        let g = document.getElementById(MID_BTN)
        let f = document.getElementById('play').firstChild.classList
        // video pause
        v.pause()
        v.classList.remove('playing')

        // showing the middle button
        g.style.visibility = 'visible'
        g.classList.add('show')
        setTimeout(() => {
            g.classList.remove('show')
        }, 300);

        // setting play button on video controls
        f.remove('fa-pause')
        f.add('fa-play')
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

        window.addEventListener('keyup', (e) => {
            switch (e.keyCode) {
                case 32: // space || pause & play
                    v.classList.length === 0 ? this.play() : this.pause()
                    break;
            }
        })
    }

    controls() {
        let btn = document.getElementsByClassName('btn')
        let v = document.getElementById(VIDEOID)
        let f = document.getElementById('play').firstChild.classList

        for (let e of btn) {
            e.addEventListener('click', () => {
                switch (e.id) {
                    case 'play': // play and pause
                        v.src === "" ? console.log('nothing') : f.contains('fa-play') ? this.play() : this.pause()
                        break;
                    case 'middleBtn':
                        v.classList.length === 0 ? this.play() : this.pause()
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
            <div>
                <Title t={this.state.title === undefined ? 'Welcome to Komo' : this.state.title}/>
                <MiddleBtn />
                <Video sauce={this.state.path === undefined ? null : this.state.path}id={VIDEOID}/>
                <VideoControl />
            </div>
        )
    }
}