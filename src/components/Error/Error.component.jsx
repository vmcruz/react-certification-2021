import React from 'react';
import PropTypes from 'prop-types';

import Text from 'components/Text';
import { Container } from './styled';

function Error({ message }) {
  return (
    <Container fluid>
      <Text size="md" color="#540000">
        {message}
      </Text>
    </Container>
  );
}

Error.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Error;
