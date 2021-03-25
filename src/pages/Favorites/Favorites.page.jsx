import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useGlobalState } from 'providers/Global';
import Layout from 'components/Layout';
import Title from 'components/Title';
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
        {favorites && <CardsLoader videos={favorites} />}
      </FlexContainer>
    </Layout>
  );
}

export default Favorites;
