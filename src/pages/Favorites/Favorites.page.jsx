import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useGlobalState } from 'providers/Global';
import Layout from 'components/Layout';
import Title from 'components/Title';
import Text from 'components/Text';
import FlexContainer from 'components/FlexContainer';
import CardsLoader from 'components/CardsLoader/CardsLoader.component';

function Favorites() {
  const { favorites, theme } = useGlobalState();

  return (
    <Layout>
      <Title size="lg" color={theme.card.colors.title} margin={{ bottom: 'xlg' }}>
        <FontAwesomeIcon icon="heart" size="1x" /> Favorites
      </Title>
      <FlexContainer padding={{ horizontal: 'xlg' }} fluid>
        {favorites.length ? (
          <CardsLoader videos={favorites} />
        ) : (
          <Text size="xlg" color={theme.card.colors.title}>
            It looks like you haven&apos;t added any favorites yet.
          </Text>
        )}
      </FlexContainer>
    </Layout>
  );
}

export default Favorites;
