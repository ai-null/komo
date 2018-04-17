import React from 'react'

let g = 0
const Video = ({sauce, id}) => {
    return (
        <div>
            <video id={id} src={sauce}></video>
        </div>
    )
}

export default Video