import React from 'react'
import Title from './title/Title'
import Video from './video/Video'
import VideoControl from './video/VideoControl'
import MiddleBtn from './video/MiddleBtn';
import List from './list/List'

let electron = window.require('electron')
let {ipcRenderer} = electron || electron.remote
let num = 0

const VIDEOID = 'video-player'
const PROG_BAR = 'progress-bar-hidden'
const VOLM_BAR = 'volume-range'
const MID_BTN = 'middleBtn'
const PLAY_BTN = 'play'

export default class App extends React.Component {
    constructor(...argument) {
        super(...argument)
        this.path = []
        this.state = {}
    }

    componentDidMount() {
        this.getFilePath()
        this.controls()
        this.shortcut()
    }

    /**
     * action to video.
     * @param {String} arg role : play, pause, {null | will be execute if the video ended}
     */
    role(arg) {
        let v = document.getElementById(VIDEOID)
        let g = document.getElementById(MID_BTN)
        let f = document.getElementById(PLAY_BTN).firstChild.classList


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
                v.classList.remove('playing')

                g.classList.remove('hidden')
                g.classList.add('show')
                setTimeout(() => {
                    g.classList.remove('show')
                    g.classList.remove('isGone')
                }, 300);

                f.remove('fa-pause')
                f.add('fa-play')
                break;
        }
    }

    getFilePath() {
        let v = document.getElementById(VIDEOID)

        ipcRenderer.on('open-file', (e, path) => {
            this.role()

            let waitForPush = new Promise((resolve, reject) => {
                this.path.push(path)
                this.setState({path})

                if (this.state.path !== undefined) {
                    resolve(path)
                }
            })

            waitForPush.then(() => {
                if (this.path.length !== 1) {
                    num = this.path.length - 1
                    // After g set to the new value the playList function
                    // must be called again, to update the value it have
                    this.playList(v)
                }
            })
            .catch(err => {return})
        })

        ipcRenderer.on('kntl', (e, data) => {
            this.title(data)
        })
    }

    /**
     * 
     * @param {String} data 
     * File's path
     */
    title(data) {
        let p = data.split('/');
        let title = p[p.length-1]

        this.setState({
            title
        })
    }

    setChange() {
        this.setState({
            path: this.path[num]
        })
        this.title(this.path[num])
    }

    shortcut() {
        let v = document.getElementById(VIDEOID)
        let f = document.getElementById(PLAY_BTN).firstChild.classList

        window.addEventListener('keyup', (e) => {
            switch (e.keyCode) {
                case 32: // space || pause & play
                v.src === "" ? console.log('nothing') : f.contains('fa-play') ? this.role('play') : this.role('pause')
                    break;
            }
        })
    }

    controls() {
        let btn = document.getElementsByClassName('btn')
        let v = document.getElementById(VIDEOID)
        let f = document.getElementById(PLAY_BTN).firstChild.classList

        // Development mode 😸
        document.getElementById(VOLM_BAR).value = 0
        v.volume = 0

        // Video Controls
        v.addEventListener('timeupdate', () => {
            document.getElementById('progress-bar').style.width = `${String(Math.round((100/v.duration)*v.currentTime))}%`

            this.videoTime(v, 'play')
            this.videoTime(v)
        })

        this.seekbar(v)        

        for (let e of btn) {
            e.addEventListener('click', () => {
                switch (e.className.split(' ')[1]) {
                    case 'play': // play and pause
                        v.src === "" ? console.log('nothing') : f.contains('fa-play') ? this.role('play') : this.role('pause')
                        break;
                    case 'middleBtn':
                        v.classList.length === 0 ? this.role('play') : this.role('pause')
                        break;
                    case 'list':
                        let l = document.getElementById('list')
                        let g = e.firstChild.classList

                        if (l.classList.contains('hidden')) {
                            l.classList.remove('hidden')
                            g.remove('fa-list-alt')
                            g.add('fa-times')
                        }
                        else {
                            g.remove('fa-times')
                            l.classList.add('hidden')
                            g.add('fa-list-alt')
                        }
                        break;
                    case 'next':
                        console.log('1', 'path', this.path.length -1)
                        console.log('1', 'num', num)
                        if (num === this.path.length - 1) {
                            num=0
                            this.setChange()
                        } else {
                            console.log('path', this.path.length -1)
                            console.log('num', num)
                            num++
                            this.setChange()
                        }

                        v.pause()
                        v.load()
                        v.play()
                        break;
                    case 'previous':
                        num--
                        if (num === -1) {
                            num = this.path.length - 1
                            this.setChange()
                        } else {
                            this.setChange()
                        }

                        v.pause()
                        v.load()
                        v.play()
                        break;
                    case 'expand':
                        v.webkitRequestFullscreen();
                        break;
                }
            })

            e.addEventListener('change', () => {
                switch (e.className.split(' ')[1]) {
                    case 'volume-range':
                        v.volume = e.value/100
                        break;
                }
            })
        }
    }

    seekbar(v) {
        let g = false
        let pb = document.getElementById(PROG_BAR)
        
        if (v.src !== "" || v.src !== undefined) {
            pb.addEventListener('mousemove', (e) => {
                if (g) {
                    v.currentTime = ((e.offsetX)/e.target.offsetWidth)*v.duration
                }
                
                window.addEventListener('mouseup', () => g = false)
                pb.addEventListener('mousedown', () => g = true)
                pb.addEventListener('click', () => {
                    v.currentTime = ((e.offsetX)/e.target.offsetWidth)*v.duration
                })
            })
        }
    }

    /**
     * video's current time and duration
     * @param {String} v videoDom | update currentTime
     * @param {null} r role | video's duration
     */
    videoTime(v, r = '') {
        let t = []
        let role = 'play'
        let d = new Date(r === role ? v.currentTime*1000 : v.duration*1000)

        t.push(d.getUTCHours())
        t.push(d.getUTCMinutes())
        t.push(d.getUTCSeconds())

        if (r === role) {
            this.setState({
                time: t.join(':')
            })
        } else {
            this.setState({
                end: t.join(':')
            })
        }
    }

    playList(v) {
        v.onended = () => {
            if (this.path.length - 1 === num) {
                num = 0;
                this.setChange()
            } else {
                num++
                this.setChange()
            }
            v.pause()
            v.load()
            v.play()
        }
    }

    list() {
        if (this.path.length !== 0) {
            try {
                return <List l={this.path} c={(g) => {
                    if (num === g) {
                        return
                    } else {
                        num=g
                        this.setChange()
                    }
                    let v = document.getElementById(VIDEOID)
                    v.pause()
                    v.load()
                    v.play()
                }} />
            } catch (err) {
                return <div className="list-data">something error : {err}</div>
            }
        }
    }

    render() {
        return ( 
            <div>
                <Title t={this.state.title === undefined ? 'Welcome to Komo':this.state.title}/>
                <MiddleBtn/>
                <Video sauce={this.state.path === undefined ? null:this.state.path}id={VIDEOID}/>
                <div id="list" className="list-sidebar hidden">
                    {this.list()}
                </div>
                <VideoControl t={this.state.time} e={this.state.end}/>
            </div>
        )
    }
}