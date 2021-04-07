import React from 'react';
import PropTypes from 'prop-types';

import { undraw404 } from 'assets';
import { useGlobalState } from 'providers/Global';
import Layout from 'components/Layout';
import Title from 'components/Title';
import { Image } from './styled';

function Error({ message, code }) {
  const { theme } = useGlobalState();

  return (
    <Layout>
      <Image src={undraw404} alt="404" />
      <Title color={theme.card.colors.title}>{code}</Title>
      <Title color={theme.card.colors.title} size="md">
        {message}
      </Title>
    </Layout>
  );
}

Error.propTypes = {
  message: PropTypes.string,
  code: PropTypes.number,
};

Error.defaultProps = {
  message: 'Oops! you reached an empty place',
  code: 404,
};

export default Error;
