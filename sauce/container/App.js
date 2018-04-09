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
     * @param {String} arg
     * put role here.
     * - play
     * - pause
     * - {null}
     */
    role(arg) {
        let v = document.getElementById(VIDEOID)
        let g = document.getElementById(MID_BTN)
        let f = document.getElementById('play').firstChild.classList


        switch (arg) {
            case 'pause':
                 // video pause
                v.pause()
                v.classList.remove('playing')

                // showing the middle button
                g.classList.add('show')
                g.classList.remove('hidden')
                setTimeout(() => {
                    g.classList.remove('show')
                }, 300);

                // setting play button on video controls
                f.remove('fa-pause')
                f.add('fa-play')
                break;

            case 'play':
                // video play
                v.play()
                v.classList.add('playing')

                // removing mid button
                g.classList.add('isGone')
                setTimeout(() => {
                    g.classList.remove('isGone')
                    g.classList.add('hidden')
                }, 300);

                // setting play button
                f.remove('fa-play')
                f.add('fa-pause')
                break;
                
            default:
                g.classList.remove('hidden')
                g.classList.add('show')
                setTimeout(() => {
                    g.classList.remove('show')
                    g.classList.remove('isGone')
                }, 300);

                v.classList.remove('playing')

                f.remove('fa-pause')
                f.add('fa-play')
                break;
        }
    }

    getFilePath() {
        ipcRenderer.on('open-file', (e, path) => {
            this.setState({
                path
            })
            this.role()
        })

        ipcRenderer.on('kntl', (e, data) => {
            let p = data[0].split('/');
            let title = p[p.length - 1]

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
                    v.classList.length === 0 ? this.role('play') : this.role('pause')
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
                        v.src === "" ? console.log('nothing') : f.contains('fa-play') ? this.role('play') : this.role('pause')
                        break;
                    case 'middleBtn':
                        v.classList.length === 0 ? this.role('play') : this.role('pause')
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