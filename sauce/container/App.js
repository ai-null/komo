import React from 'react'
import Title from './title/Title'
import Video from './video/Video'
import VideoControl from './video/VideoControl'

let electron = window.require('electron')
let {ipcRenderer} = electron || electron.remote

export default class App extends React.Component {
    constructor (...argument) {
        super(...argument)
        this.state = {
            inputID: 'inputDOM',
            video: 'video-player',
        }
    }

    componentDidMount () {
        this.getFilePath()
    }

    getFilePath () {
        // So this is the problem of MaxEventListener on my app
        // Then, how i can solve this ?
        let fpath = []
        ipcRenderer.on('open-file', (e, path) => {
            fpath.push(path)
            for (let i in fpath) {
                console.log(fpath)
            }
        })
    }

    playBtn () {
        let videoDOM = document.getElementById('video-player')
        videoDOM.play()
    }

    render () {
        return (
            <div>
                <Title />
                <Video sauce={this.state.path === undefined ? ' ' : this.state.path} id={this.state.video} />
                <VideoControl playBtn={this.playBtn} />
            </div>
        )
    }
}