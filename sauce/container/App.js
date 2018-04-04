import React from 'react'
import Title from './title/Title'
import Video from './video/Video'
import VideoControl from './video/VideoControl'

export default class App extends React.Component {
    constructor (...argument) {
        super(...argument)
        this.state = {
            inputID: 'inputDOM',
            video: 'video-player',
            path: this.props.sauce
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
                <Video src={this.state.path} id={this.state.video} />
                <VideoControl playBtn={this.playBtn} />
            </div>
        )
    }
}