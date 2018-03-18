import React from 'react'
import Video from './video/Video'

export default class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            data: 'Hello World'
        }
    }
    
    getFilePath (e) {
        let filePath = document.getElementById(e).files[0].path
        
        this.setState({filePath})
    }

    render () {
        return (
            <div>
                <input type="file" id="inputDOM" accept="*.pdf" onChange={() => { this.getFilePath('inputDOM') }} />

                <Video sauce={this.state.filePath === '' ? 'lol' : this.state.filePath} />
            </div>
        )
    }
}