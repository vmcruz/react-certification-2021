import React from 'react';
import PropTypes from 'prop-types';

import Text from 'components/Text';
import Title from 'components/Title';
import FlexContainer from 'components/FlexContainer';
import { Container, Thumbnail } from './styled';

function Card({ thumbnail, title, description, onClick }) {
  return (
    <Container margin={{ all: 'sm' }} column onClick={onClick}>
      <Thumbnail url={thumbnail} alt="thumbnail" />
      <FlexContainer padding={{ horizontal: 'md' }} column align="flex-start">
        <Title size="xsm" color="black">
          {title}
        </Title>
        <Text size="md" color="#696969" margin={{ top: 'sm' }}>
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
  onClick: PropTypes.func,
};

Card.defaultProps = {
  onClick: () => {},
};

export default Card;
