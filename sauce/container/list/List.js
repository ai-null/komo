import React from 'react'

let g = (d) => d!=='' ? d.split('/')[d.split('/').length-1] : ''
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