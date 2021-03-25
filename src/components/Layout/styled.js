import styled from 'styled-components';

import FlexContainer from 'components/FlexContainer';

export const Container = styled(FlexContainer)`
  background-color: ${({ theme }) => theme.content.colors.background};
  padding-top: calc(65px + var(--spacing-xlg));
  min-height: 100vh;
`;
