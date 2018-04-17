import React from 'react'

const Video = ({sauce, id}) => {
    return (
        <div>
            <video id={id} src={sauce}></video>
        </div>
    )
}

export default Video