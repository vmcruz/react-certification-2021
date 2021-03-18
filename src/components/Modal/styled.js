import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import FlexContainer from 'components/FlexContainer';

export const DismissIcon = styled(FontAwesomeIcon)`
  position: absolute;
  right: -32px;
  top: -32px;
  cursor: pointer;
  z-index: 100;
  color: #fff;
`;

export const Content = styled(FlexContainer)`
  position: absolute;
  width: 80vw;
  height: 80vh;
  left: 10vw;
  top: 10vh;
  z-index: 100;

  @media screen and (max-width: 1200px) {
    left: 5vw;
    top: 5vh;
    width: 90vw;
    height: 90vh;
  }
`;
