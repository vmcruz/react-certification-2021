import styled from 'styled-components';

import FlexContainer from 'components/FlexContainer';

export const HomeContainer = styled(FlexContainer)`
  background-color: ${({ theme }) => theme.content.colors.background};
`;
