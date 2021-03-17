import styled, { css } from 'styled-components';

import utils from 'components/utils';

export const StyledText = styled.span((props) => {
  const { margin, padding } = props;

  return css`
    font-size: var(--font-size-${props.size});
    color: ${props.color};
    font-weight: ${props.weight};
    text-align: ${props.align};
    ${utils.getSpacingCSS({ for: 'margin', using: margin })}
    ${utils.getSpacingCSS({ for: 'padding', using: padding })}
  `;
});

StyledText.propTypes = {
  margin: utils.spacing.propTypes,
  padding: utils.spacing.propTypes,
};

StyledText.defaultProps = {
  margin: utils.spacing.defaultProps,
  padding: utils.spacing.defaultProps,
};
