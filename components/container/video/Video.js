import React from 'react'

const Video = ({sauce, id}) => {
    return (
        <video src={sauce} id={id}></video>
    )
}

export default Video