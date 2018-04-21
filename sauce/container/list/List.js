import React from 'react'

let g = (d) => {
    if (d === '') {
        return
    } else {
        let p = d.split('/');
        return p[p.length-1]
    }
}

const List = ({l}) => {
    return(
        <div className="list-sidebar">
            {Object.keys(l).map(e => {
                return <div className="list-data" key={e}>{g(l[e])}</div>
            })}
        </div>
    )
}

export default List