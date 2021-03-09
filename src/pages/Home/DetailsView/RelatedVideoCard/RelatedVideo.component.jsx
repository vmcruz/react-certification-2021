import React from 'react';
import PropTypes from 'prop-types';

import FlexContainer from 'components/FlexContainer';
import Text from 'components/Text';
import { RelatedVideoCard, Thumbnail } from './styled';

function RelatedVideo({ video, onClick }) {
  if (!video.snippet) return null;

  return (
    <RelatedVideoCard onClick={onClick}>
      <Thumbnail src={video.snippet.thumbnails.medium.url} />
      <FlexContainer
        column
        margin={{ left: 'md' }}
        align="flex-start"
        justify="flex-start"
      >
        <Text color="black" margin={{ bottom: 'sm' }} weight="500">
          {video.snippet.title}
        </Text>
      </FlexContainer>
    </RelatedVideoCard>
  );
}

RelatedVideo.propTypes = {
  video: PropTypes.shape({
    snippet: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      thumbnails: PropTypes.shape({
        medium: PropTypes.shape({
          url: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }),
  }).isRequired,
  onClick: PropTypes.func,
};

RelatedVideo.defaultProps = {
  onClick: () => {},
};

export default RelatedVideo;
