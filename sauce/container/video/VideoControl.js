import React from 'react'

const VideoControl = ({t, e}) => {
    return (
        <div id="video-control">
            <div id="progress" className="progress">
                <div id="progress-bar-hidden" className="progress-bar-hidden"></div>
                <div id="progress-bar" className="progress-bar">
                    <div id="progress-thumb"></div>
                </div>
            </div>
            <div>
                <ul>
                    <li className="btn previous">
                        <i className="fa fa-fast-backward"></i>
                    </li>
                    <li className="btn backward">
                        <i className="fa fa-backward"></i>
                    </li>
                    <li className="btn play" id="play">
                        <i className="fa fa-play"></i>
                    </li>
                    <li className="btn forward">
                        <i className="fa fa-forward"></i>
                    </li>
                    <li className="btn next">
                        <i className="fa fa-fast-forward"></i>
                    </li>
                    <li className="btn stop">
                        <i className="fa fa-stop"></i>
                    </li>
                    <li className="btn volume">
                        <i className="fa fa-volume-up"></i>
                        <input type="range" className="btn volume-range" id="volume-range" />
                    </li>
                    <li className="mnt">
                        {t === undefined ? '0:0:0' : t}/{e === undefined || e === 'NaN:NaN:NaN' ? '0:0:0' : e}
                    </li>
                    {/* Float Right */}
                    <li className="btn expand">
                        <i className="fa fa-expand"></i>
                    </li>
                    <li className="btn list">
                        <i className="fa fa-list-alt"></i>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default VideoControl