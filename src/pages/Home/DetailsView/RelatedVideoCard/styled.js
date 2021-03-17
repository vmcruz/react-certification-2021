import styled from 'styled-components';

export const RelatedVideoCard = styled.div`
  cursor: pointer;
  display: grid;
  grid-template-columns: 168px 1fr;

  &:not(:last-child) {
    margin-bottom: var(--spacing-sm);
  }
`;

export const Thumbnail = styled.img`
  width: 168px;
  height: 94px;
`;
