import React from 'react';

const Title = ({t, c}) => {
    return (
        <div className="title">
            <span>{t === undefined || t === null ? 'This is a title' : t }</span><br />
            <span>{c === undefined || c === null ? 'Created by AinulBedjo' : c }</span>
        </div>
    )
}

export default Title