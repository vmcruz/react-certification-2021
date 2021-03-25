import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { decode } from 'html-entities';

import { useGlobalState, useGlobalDispatch } from 'providers/Global';
import Layout from 'components/Layout';
import ErrorPage from 'pages/ErrorPage';
import Text from 'components/Text';
import Title from 'components/Title';
import { useYoutubeRelated } from 'hooks/useYoutubeSearch';
import { useVideoData } from 'hooks/useVideoData';
import { VideoPlayer, Container, RelatedVideos } from './styled';
import RelatedVideo from './RelatedVideoCard';

function DetailsView() {
  const { state, theme } = useGlobalState();
  const dispatch = useGlobalDispatch();
  const { search, items } = useYoutubeRelated();
  const relatedVideos = items.filter((ytItem) => ytItem.id.kind === 'youtube#video');
  const history = useHistory();
  const params = useParams();
  const { videoData, error } = useVideoData({ videoId: params.videoId });

  function handleSetVideo(relatedVideoId) {
    dispatch({
      type: 'SET_VIDEO',
      payload: { videoId: relatedVideoId },
    });
    window.scroll({ top: 0, behavior: 'smooth' });
    history.push(`/watch/${relatedVideoId}`);
  }

  useEffect(() => {
    if (state.selectedVideo) {
      search(state.selectedVideo);
    }
  }, [state.selectedVideo, search]);

  useEffect(() => {
    dispatch({
      type: 'SET_VIDEO',
      payload: { videoId: params.videoId },
    });
  }, [dispatch, params.videoId]);

  if (error) {
    if (!error.inApi) {
      return <ErrorPage message={error.message} code={404} />;
    }
    return <ErrorPage message="Something went wrong" code={500} />;
  }

  return (
    <Layout>
      <Container>
        {videoData.id && (
          <div>
            <VideoPlayer>
              <iframe
                title={videoData.snippet.title}
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoData.id}`}
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
              {decode(videoData.snippet.title)}
            </Title>
            <Text size="lg" color={theme.card.colors.description} weight="300">
              {decode(videoData.snippet.description)}
            </Text>
          </div>
        )}
        <RelatedVideos column margin={{ left: 'md' }}>
          {relatedVideos.map((relatedVideo) => (
            <RelatedVideo
              key={uuidv4()}
              video={relatedVideo}
              onClick={() => handleSetVideo(relatedVideo.id.videoId)}
            />
          ))}
        </RelatedVideos>
      </Container>
    </Layout>
  );
}

export default DetailsView;