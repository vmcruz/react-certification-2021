import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import utils from 'components/utils';

export const StyledButton = styled.button(({ primary, margin, padding }) => {
  const primaryStyles = `
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: var(--border-radius-sm);
    border: 1px solid rgba(0, 0, 0, 0.2);

    &:hover {
      background-color: rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(0, 0, 0, 0.5);
    }
  `;

  return css`
    background-color: transparent;
    border: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    ${utils.getSpacingCSS({ for: 'margin', using: margin })};
    ${utils.getSpacingCSS({ for: 'padding', using: padding })};
    ${primary && primaryStyles}
  `;
});

export const StyledIcon = styled(FontAwesomeIcon)`
  color: ${({ color }) => color};
  margin-right: var(--spacing-md);
  transition: color 300ms;
`;

StyledIcon.propTypes = {
  color: PropTypes.string,
};

StyledIcon.defaultProps = {
  color: 'white',
};

StyledButton.propTypes = {
  margin: utils.spacing.propTypes,
  padding: utils.spacing.propTypes,
};

StyledButton.defaultProps = {
  margin: null,
  padding: { all: 'sm' },
};
