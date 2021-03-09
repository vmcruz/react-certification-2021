import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import FlexContainer from 'components/FlexContainer';
import Title from 'components/Title';
import Error from 'components/Error';
import { useYoutubeSearch } from 'hooks/useYoutubeSearch';
import { useDebouncer } from 'hooks/useDebouncer';
import Card from './Card';
import Header from './Header';
import DetailsView from './DetailsView';

function HomePage() {
  const { search, items, nextPage, error } = useYoutubeSearch({ for: 'query' });
  const { debounce } = useDebouncer();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videoResults = items.filter((ytItem) => ytItem.id.kind === 'youtube#video');

  async function infiniteScroll() {
    const currentScroll = window.innerHeight + window.scrollY;
    const treshold = window.innerHeight * 0.66;
    const nearBottom = currentScroll >= document.body.offsetHeight - treshold;

    if (nearBottom && nextPage) {
      // avoids extra calls
      debounce(nextPage);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', infiniteScroll, { passive: true });

    return () => window.removeEventListener('scroll', infiniteScroll, { passive: true });
  });

  return (
    <FlexContainer column scroll={false}>
      {selectedVideo && (
        <DetailsView
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
          setVideo={setSelectedVideo}
        />
      )}
      <Header ytSearch={search} />
      <FlexContainer margin={{ top: 'xlg' }} fluid>
        <Title color="black" size="xlg">
          Welcome to the Challenge
        </Title>
      </FlexContainer>
      <FlexContainer margin={{ vertical: 'xlg' }} padding={{ horizontal: 'xlg' }} fluid>
        {videoResults.map(
          (ytVideo) =>
            ytVideo.snippet && (
              <Card
                thumbnail={ytVideo.snippet.thumbnails.medium.url}
                title={ytVideo.snippet.title}
                description={ytVideo.snippet.description}
                key={uuidv4()}
                onClick={() => setSelectedVideo(ytVideo)}
              />
            )
        )}
        {error && <Error message={error.message} />}
      </FlexContainer>
    </FlexContainer>
  );
}

export default HomePage;
