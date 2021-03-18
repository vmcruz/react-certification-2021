import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import utils from 'components/utils';

export const StyledButton = styled.button(({ margin, padding }) => {
  return css`
    background: transparent;
    border: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    ${utils.getSpacingCSS({ for: 'margin', using: margin })}
    ${utils.getSpacingCSS({ for: 'padding', using: padding })}
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
