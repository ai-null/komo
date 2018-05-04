import React from 'react'

export default class List extends React.Component {
    constructor(...args) {
        super(...args)
        this.state = {}
    }

    g(d) {
        if (d === '') return
        else {
            let p = d.split('/');
            return p[p.length-1]
        }
    }

    render() {
        return (
            Object.keys(this.props.l).map(e => {
                return (
                    <div className="list-data" onClick={()=>{console.log(e)}} key={e}>
                        <video src={this.props.l[e]}></video>
                        <span>{this.g(this.props.l[e])}</span>
                    </div>
                )
            })
        )
    }
}