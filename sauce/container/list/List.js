import React from 'react'

function g(d) {
    if (d === '') return
    else {
        let p = d.split('/');
        return p[p.length-1]
    }
}

const List = ({l, c}) => {
    return (
        Object.keys(l).map(e => {
            return (
                <div className="list-data" onClick={() => {c(parseInt(e))}} key={e}>
                    <video src={l[e]}></video>
                    <span>{g(l[e])}</span>
                </div>
            )
        })
    )
}

export default List