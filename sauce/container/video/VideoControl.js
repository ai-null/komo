import React from 'react'

const VideoControl = () => {
    return (
        <div id="video-control">
            <input className="mnt-range" type="range" id="mnt-range"/>
            <div>
                <ul>
                    <li className="btn fast-backward" id="fast-backward">
                        <i className="fa fa-fast-backward"></i>
                    </li>
                    <li className="btn backward" id="backward">
                        <i className="fa fa-backward"></i>
                    </li>
                    <li className="btn play" id="play">
                        <i className="fa fa-play"></i>
                    </li>
                    <li className="btn forward" id="forward">
                        <i className="fa fa-forward"></i>
                    </li>
                    <li className="btn fast-forward" id="fast-forward">
                        <i className="fa fa-fast-forward"></i>
                    </li>
                    <li className="btn stop" id="stop">
                        <i className="fa fa-stop"></i>
                    </li>
                    <li className="btn volume" id="volume">
                        <i className="fa fa-volume-up"></i>
                        <input type="range" id="volume-range" />
                    </li>
                    <li className="mnt" id="mnt">
                        0:00/0:00
                    </li>
                    {/* Float Right */}
                    <li className="btn expand" id="expand">
                        <i className="fa fa-expand"></i>
                    </li>
                    <li className="btn list" title="Player list" id="title">
                        <i className="fa fa-list-alt"></i>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default VideoControl