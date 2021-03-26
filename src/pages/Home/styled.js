import styled from 'styled-components';

import FlexContainer from 'components/FlexContainer';

export const Container = styled(FlexContainer)`
  background-color: ${({ theme }) => theme.content.colors.background};
`;

export const CardsContainer = styled(FlexContainer)`
  margin-top: calc(65px + var(--spacing-xlg));
`;
