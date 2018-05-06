import React from 'react';

const ganti = (e) => {
    if (e === 'Welcome to Komo') return <span>Created by AinulBedjo</span>
    else return <span></span>
}

const Title = ({t}) => {
    return (
        <div className="title" id="title">
            <span>{t}</span><br />
            {ganti(t)}
        </div>
    )
}

export default Title