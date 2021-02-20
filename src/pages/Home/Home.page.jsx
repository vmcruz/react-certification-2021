import React from 'react';

import FlexContainer from 'components/FlexContainer';
import Header from 'components/Header';
import mockYoutubeVideos from 'assets/youtube-videos-mock.json';
import Title from 'components/Title';
import Card from 'components/Card';

function HomePage() {
  const videoResults = mockYoutubeVideos.items.filter(
    (ytItem) => ytItem.id.kind === 'youtube#video'
  );

  return (
    <FlexContainer column>
      <Header />
      <FlexContainer margin={{ top: 'xlg' }} fluid>
        <Title color="black" size="xlg">
          Welcome to the Challenge
        </Title>
      </FlexContainer>
      <FlexContainer margin={{ vertical: 'xlg' }} padding={{ horizontal: 'xlg' }} fluid>
        {videoResults.map((ytVideo) => (
          <Card
            thumbnail={ytVideo.snippet.thumbnails.medium.url}
            title={ytVideo.snippet.title}
            description={ytVideo.snippet.description}
            key={ytVideo.etag}
          />
        ))}
      </FlexContainer>
    </FlexContainer>
  );
}

export default HomePage;
