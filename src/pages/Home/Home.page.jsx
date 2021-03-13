import React, { useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { decode } from 'html-entities';

import { useGlobalState, useGlobalDispatch } from 'providers/Global';
import FlexContainer from 'components/FlexContainer';
import Title from 'components/Title';
import Error from 'components/Error';
import { useYoutubeQuery } from 'hooks/useYoutubeSearch';
import { useDebouncer } from 'hooks/useDebouncer';
import Card from './Card';
import Header from './Header';
import DetailsView from './DetailsView';
import { HomeContainer } from './styled';

function HomePage() {
  const { search, items, nextPage, error } = useYoutubeQuery();
  const debounce = useDebouncer();
  const { state, theme } = useGlobalState();
  const dispatch = useGlobalDispatch();
  const videoResults = items.filter((ytItem) => ytItem.id.kind === 'youtube#video');

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

  function setSelectedVideo(video) {
    dispatch({
      type: 'SET_VIDEO',
      payload: { video },
    });
  }

  return (
    <HomeContainer column scroll={false}>
      {state.selectedVideo && <DetailsView />}
      <Header ytSearch={search} />
      <FlexContainer margin={{ top: 'xlg' }} fluid>
        <Title color={theme.content.colors.text} size="xlg">
          Welcome to the Challenge
        </Title>
      </FlexContainer>
      <FlexContainer margin={{ vertical: 'xlg' }} padding={{ horizontal: 'xlg' }} fluid>
        {videoResults.map(
          (ytVideo) =>
            ytVideo.snippet && (
              <Card
                thumbnail={ytVideo.snippet.thumbnails.medium.url}
                title={decode(ytVideo.snippet.title)}
                description={decode(ytVideo.snippet.description)}
                key={uuidv4()}
                onClick={() => setSelectedVideo(ytVideo)}
              />
            )
        )}
        {error && <Error message={error.message} />}
      </FlexContainer>
    </HomeContainer>
  );
}

export default HomePage;
