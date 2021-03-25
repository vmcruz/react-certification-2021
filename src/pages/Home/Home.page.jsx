import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { decode } from 'html-entities';

import { useGlobalState } from 'providers/Global';
import Layout from 'components/Layout';
import Error from 'components/Error';
import FlexContainer from 'components/FlexContainer';
import { useYoutubeQuery } from 'hooks/useYoutubeSearch';
import { useDebouncer } from 'hooks/useDebouncer';
import Card from './Card';

function HomePage() {
  const { search, items, nextPage, error } = useYoutubeQuery();
  const debounce = useDebouncer();
  const { state } = useGlobalState();
  const videoResults = items.filter((ytItem) => ytItem.id.kind === 'youtube#video');
  const history = useHistory();

  const infiniteScroll = useCallback(() => {
    const currentScroll = window.innerHeight + window.scrollY;
    const treshold = window.innerHeight * 0.66;
    const nearBottom = currentScroll >= document.body.offsetHeight - treshold;

    if (nearBottom && nextPage) {
      // avoids extra calls
      debounce(nextPage);
    }
  }, [nextPage, debounce]);

  useEffect(() => {
    window.addEventListener('scroll', infiniteScroll, { passive: true });

    return () => window.removeEventListener('scroll', infiniteScroll, { passive: true });
  }, [infiniteScroll]);

  useEffect(() => {
    if (state.searchQuery) {
      debounce(() => search(state.searchQuery));
    }
  }, [state.searchQuery, debounce, search]);

  return (
    <Layout>
      <FlexContainer padding={{ horizontal: 'xlg' }} fluid>
        {videoResults.map(
          (ytVideo) =>
            ytVideo.snippet && (
              <Card
                thumbnail={ytVideo.snippet.thumbnails.medium.url}
                title={decode(ytVideo.snippet.title)}
                description={decode(ytVideo.snippet.description)}
                key={uuidv4()}
                onClick={() => history.push(`/watch/${ytVideo.id.videoId}`)}
              />
            )
        )}
        {error && <Error message={error.message} />}
      </FlexContainer>
    </Layout>
  );
}

export default HomePage;
