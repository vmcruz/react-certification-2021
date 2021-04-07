import React, { useCallback, useEffect } from 'react';

import { useGlobalState } from 'providers/Global';
import Layout from 'components/Layout';
import Error from 'components/Error';
import FlexContainer from 'components/FlexContainer';
import { useYoutubeQuery } from 'hooks/useYoutubeSearch';
import { useDebouncer } from 'hooks/useDebouncer';
import CardsLoader from 'components/CardsLoader/CardsLoader.component';

function HomePage() {
  const { search, items, nextPage, error } = useYoutubeQuery();
  const debounce = useDebouncer();
  const { state } = useGlobalState();
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

  return (
    <Layout>
      <FlexContainer padding={{ horizontal: 'xlg' }} fluid>
        <CardsLoader videos={videoResults} />
        {error && <Error message={error.message} />}
      </FlexContainer>
    </Layout>
  );
}

export default HomePage;
