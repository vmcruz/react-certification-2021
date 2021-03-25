import styled from 'styled-components';
import FlexContainer from 'components/FlexContainer';

export const VideoPlayer = styled.div`
  width: 100%;
  height: 502px;
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  background-color: ${({ theme }) => theme.card.colors.background};
  padding: var(--spacing-md);
  width: 100%;

  @media screen and (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    overflow: auto;
    height: 90vh;
  }
`;

export const RelatedVideos = styled(FlexContainer)`
  overflow: auto;
  align-items: flex-start;
  justify-content: flex-start;

  @media screen and (max-width: 1200px) {
    margin-left: 0;
    margin-top: var(--spacing-md);
    overflow: initial;
  }
`;
