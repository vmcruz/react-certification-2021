import React from 'react';
import PropTypes from 'prop-types';

import Text from 'components/Text';
import { Container } from './styled';

function Error({ message, ...otherProps }) {
  return (
    <Container fluid {...otherProps}>
      <Text size="md" color="#540000" data-testid="error-message">
        {message}
      </Text>
    </Container>
  );
}

Error.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Error;
