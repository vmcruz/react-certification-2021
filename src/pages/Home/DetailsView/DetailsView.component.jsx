import React, { useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { decode } from 'html-entities';

import { useGlobalState, useGlobalDispatch } from 'providers/Global';
import Overlay from 'components/Overlay';
import Text from 'components/Text';
import Title from 'components/Title';
import { useYoutubeRelated } from 'hooks/useYoutubeSearch';
import { VideoPlayer, Container, RelatedVideos } from './styled';
import RelatedVideo from './RelatedVideoCard';

function DetailsView() {
  const { state, theme } = useGlobalState();
  const dispatch = useGlobalDispatch();
  const { search, items } = useYoutubeRelated();
  const relatedVideos = items.filter((ytItem) => ytItem.id.kind === 'youtube#video');
  const containerRef = useRef(null);

  function onDismiss() {
    dispatch({ type: 'UNSET_VIDEO' });
  }

  function handleSetVideo(relatedVideo) {
    dispatch({
      type: 'SET_VIDEO',
      payload: { video: relatedVideo },
    });
    if (containerRef && containerRef.current) {
      containerRef.current.scroll({ top: 0, behavior: 'smooth' });
    }
  }

  useEffect(() => {
    const videoId = state.selectedVideo?.id?.videoId;
    if (videoId) {
      search(videoId);
    }
  }, [state.selectedVideo, search]);

  return (
    <Overlay onDismiss={onDismiss}>
      <Container ref={containerRef}>
        <div>
          <VideoPlayer>
            <iframe
              title={state.selectedVideo.snippet.title}
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${state.selectedVideo.id.videoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </VideoPlayer>
          <Title
            size="md"
            color={theme.card.colors.title}
            padding={{ vertical: 'md' }}
            align="left"
          >
            {decode(state.selectedVideo.snippet.title)}
          </Title>
          <Text size="lg" color={theme.card.colors.description} weight="300">
            {decode(state.selectedVideo.snippet.description)}
          </Text>
        </div>
        <RelatedVideos column margin={{ left: 'md' }}>
          {relatedVideos.map((relatedVideo) => (
            <RelatedVideo
              key={uuidv4()}
              video={relatedVideo}
              onClick={() => handleSetVideo(relatedVideo)}
            />
          ))}
        </RelatedVideos>
      </Container>
    </Overlay>
  );
}

export default DetailsView;
