import React from 'react'

export default class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            text: "Hello World from React"
        }
    }
    
    render () {
        return (
            <div>
                <p> { this.state.text } </p>
            </div>
        )
    }
}