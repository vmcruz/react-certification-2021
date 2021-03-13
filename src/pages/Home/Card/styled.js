import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import FlexContainer from 'components/FlexContainer';

export const Container = styled(FlexContainer)`
  flex-basis: 345px;
  height: 345px;
  border-radius: var(--border-radius-md);
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),
    0px 1px 3px 0px rgb(0 0 0 / 12%);
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  cursor: pointer;
  transition: opacity 300ms;
  background-color: ${({ theme }) => theme.card.colors.background};

  &:hover {
    opacity: 0.7;
  }

  &:hover > div {
    background-size: 120%;
  }
`;

export const Thumbnail = styled.div(
  ({ url }) => css`
    width: 100%;
    height: 160px;
    background-image: url(${url});
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
    border-top-left-radius: var(--border-radius-md);
    border-top-right-radius: var(--border-radius-md);
    margin-bottom: var(--spacing-md);
    transition: background-size 300ms;
  `
);

Thumbnail.propTypes = {
  url: PropTypes.string.isRequired,
};
