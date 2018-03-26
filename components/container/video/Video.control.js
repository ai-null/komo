import React from 'react'

const VideoControl = ({playBtn}) => {
    return (
        <div id="video-control">
            <input className="mnt-range" type="range" />
            <div>
                <ul>
                    <li className="btn fast-backward">
                        <i className="fa fa-fast-backward"></i>
                    </li>
                    <li className="btn backward">
                        <i className="fa fa-backward"></i>
                    </li>
                    <li className="btn play">
                        <i className="fa fa-play"></i>
                    </li>
                    <li className="btn forward">
                        <i className="fa fa-forward"></i>
                    </li>
                    <li className="btn fast-forward">
                        <i className="fa fa-fast-forward"></i>
                    </li>
                    <li className="btn stop">
                        <i className="fa fa-stop"></i>
                    </li>
                    <li className="btn volume">
                        <ul>
                            <li><i className="fa fa-volume-up"></i></li>
                            <li><input type="range" className="volume" /></li>
                        </ul>
                    </li>
                    <li className="mnt">
                        0:00/0:00
                    </li>
                    {/* Float Right */}
                    <li className="btn expand">
                        <i className="fa fa-expand"></i>
                    </li>
                    <li className="btn list" title="Player list">
                        <i className="fa fa-list-alt"></i>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default VideoControl