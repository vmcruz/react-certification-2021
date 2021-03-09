import styled from 'styled-components';
import FlexContainer from 'components/FlexContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const BackgroundContainer = styled(FlexContainer)`
  top: 0;
  position: fixed;
  z-index: 100;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
`;

export const Container = styled(FlexContainer)`
  width: 80%;

  @media screen and (max-width: 1200px) {
    width: 90%;
  }
`;

export const DismissIcon = styled(FontAwesomeIcon)`
  position: absolute;
  right: -32px;
  top: -32px;
  cursor: pointer;
`;
