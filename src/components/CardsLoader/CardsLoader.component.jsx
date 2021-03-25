import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { decode } from 'html-entities';
import { useHistory } from 'react-router-dom';

import Card from './Card.component';

function CardsLoader({ videos }) {
  const history = useHistory();

  return videos.map(
    (video) =>
      video.snippet && (
        <Card
          thumbnail={video.snippet.thumbnails.medium.url}
          title={decode(video.snippet.title)}
          description={decode(video.snippet.description)}
          key={uuidv4()}
          onClick={() => history.push(`/watch/${video.id.videoId || video.id}`)}
        />
      )
  );
}

export default CardsLoader;
