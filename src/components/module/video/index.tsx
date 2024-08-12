import React from 'react';
import { CmsContent } from '@utils/cms/utils';

type VideoProps = {} & CmsContent;

const Video = ({ video, className, autoPlay, showPlay }: VideoProps) => {
    if (!video) {
        return null;
    }
    return (
        <div>
            <video
                className={`${className} amp-dc-video`}
                style={{ width: '100%' }}
                poster={`https://${video.defaultHost}/v/${video.endpoint}/${video.name}?protocol=https`}
                controls={showPlay}
                autoPlay={autoPlay}
                loop
                muted
                // src={`https://${video.defaultHost}/v/${video.endpoint}/${video.name}/mp4_720p?protocol=https`}
            >
                <source
                    src={`https://${video.defaultHost}/v/${video.endpoint}/${video.name}/mp4_720p?protocol=https`}
                    data-res="High"
                    data-bitrate="2119"
                    data-label="High"
                    type="video/mpeg4"
                />

                <source
                    src={`https://${video.defaultHost}/v/${video.endpoint}/${video.name}/mp4_480p?protocol=https`}
                    data-res="Medium"
                    data-bitrate="689"
                    data-label="Medium"
                    type="video/mpeg4"
                />

                <source
                    src={`https://${video.defaultHost}/v/${video.endpoint}/${video.name}/webm_480p?protocol=https`}
                    data-res="Medium"
                    data-bitrate="624"
                    data-label="Medium"
                    type="video/webm"
                />
            </video>
            {/* <div className="pause-button inactive"></div> */}
        </div>
    );
};

export default Video;