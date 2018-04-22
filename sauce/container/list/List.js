import React from 'react'

let g = (d) => {
    if (d === '') return
    else {
        let p = d.split('/');
        return p[p.length-1]
    }
}

const List = ({l}) => {
    return(
        Object.keys(l).map(e => {
            return <div className="list-data" key={e}><video src={l[e]}></video><span>{g(l[e])}</span></div>
        })
    )
}

export default List