import styled from 'styled-components';

import Button from 'components/Button';

export const Item = styled(Button)`
  width: 100%;
  justify-content: flex-start;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
