import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { decode } from 'html-entities';
import { useHistory } from 'react-router-dom';

import Card from './Card.component';

function CardsLoader({ videos }) {
  const history = useHistory();

  return (
    <>
      {videos.map(
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
      )}
    </>
  );
}

CardsLoader.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      snippet: PropTypes.shape({
        thumbnails: PropTypes.shape({
          medium: PropTypes.shape({
            url: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }).isRequired,
      id: PropTypes.oneOfType([
        PropTypes.shape({
          videoId: PropTypes.string,
        }),
        PropTypes.string,
      ]).isRequired,
    })
  ).isRequired,
};

export default CardsLoader;
