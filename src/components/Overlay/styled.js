import styled from 'styled-components';

export const OverlayLayer = styled.div`
  top: 0;
  left: 0;
  position: absolute;
  z-index: 99;
  height: 100vh;
  width: 100vw;
  animation: displayOverlay 200ms;
  animation-fill-mode: forwards;

  @keyframes displayOverlay {
    from {
      background-color: rgba(0, 0, 0, 0);
    }
    to {
      background-color: rgba(0, 0, 0, 0.8);
    }
  }
`;
