import React from 'react'
import Title from './title/Title'
import Video from './video/Video'
import VideoControl from './video/Video.control'

export default class App extends React.Component {
    constructor (...argument) {
        super(...argument)
        this.state = {
            inputID: 'inputDOM',
            video: 'video-player'
        }
    }
    
    getFilePath () {
        let filePath = document.getElementById(this.state.inputID).files[0].path
        this.setState({ filePath })
    }

    playBtn () {
        let videoDOM = document.getElementById(this.state.video)
        console.log(videoDOM)
    }

    render () {
        return (
            <div>
                <Title />
                <Video controls id={this.state.video} sauce={this.state.filePath === '' ? '' : this.state.filePath} />
                <VideoControl playBtn={this.playBtn} />
            </div>
        )
    }
}