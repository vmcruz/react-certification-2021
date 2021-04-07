import styled from 'styled-components';

import FlexContainer from 'components/FlexContainer';

export const MenuContainer = styled(FlexContainer)`
  height: 100%;
  background-color: ${({ theme }) => theme.sidebar.colors.background};
  animation: extend 200ms;
  animation-fill-mode: forwards;

  @keyframes extend {
    from {
      width: 0;
    }
    to {
      width: 250px;
    }
  }
`;
