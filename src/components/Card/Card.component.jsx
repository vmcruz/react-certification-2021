import React from 'react';
import PropTypes from 'prop-types';

import Text from 'components/Text';
import Title from 'components/Title';
import FlexContainer from 'components/FlexContainer';
import { Container, Banner } from './styled';

function Card({ thumbnail, title, description }) {
  return (
    <Container margin={{ all: 'sm' }} column>
      <Banner url={thumbnail} alt="thumbnail" />
      <FlexContainer padding={{ horizontal: 'md' }} column>
        <Title size="xsm" color="black">
          {title}
        </Title>
        <Text size="md" color="gray" margin={{ top: 'sm' }}>
          {description}
        </Text>
      </FlexContainer>
    </Container>
  );
}

Card.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Card;
