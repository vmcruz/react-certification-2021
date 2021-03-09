import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import Overlay from 'components/Overlay';
import Text from 'components/Text';
import Title from 'components/Title';
import { useYoutubeSearch } from 'hooks/useYoutubeSearch';
import { VideoPlayer, Container, RelatedVideos } from './styled';
import RelatedVideo from './RelatedVideoCard';

function DetailsView({ video, onClose, setVideo }) {
  const { search, items } = useYoutubeSearch({ for: 'related' });
  const relatedVideos = items.filter((ytItem) => ytItem.id.kind === 'youtube#video');
  const containerRef = useRef(null);

  function handleSetVideo(related) {
    setVideo(related);
    if (containerRef && containerRef.current) {
      containerRef.current.scroll({ top: 0, behavior: 'smooth' });
    }
  }

  useEffect(() => {
    const videoId = video?.id?.videoId;
    if (videoId) {
      search(videoId);
    }
  }, [video, search]);

  return (
    <Overlay onDismiss={onClose}>
      <Container ref={containerRef}>
        <div>
          <VideoPlayer>
            <iframe
              title={video.snippet.title}
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </VideoPlayer>
          <Title size="md" color="black" padding={{ vertical: 'md' }} align="left">
            {video.snippet.title}
          </Title>
          <Text size="lg" color="#696969" weight="300">
            {video.snippet.description}
          </Text>
        </div>
        <RelatedVideos column margin={{ left: 'md' }}>
          {relatedVideos.map((related) => (
            <RelatedVideo
              key={uuidv4()}
              video={related}
              onClick={() => handleSetVideo(related)}
            />
          ))}
        </RelatedVideos>
      </Container>
    </Overlay>
  );
}

DetailsView.propTypes = {
  video: PropTypes.shape({
    id: PropTypes.shape({
      videoId: PropTypes.string.isRequired,
    }).isRequired,
    snippet: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  setVideo: PropTypes.func.isRequired,
};

export default DetailsView;
