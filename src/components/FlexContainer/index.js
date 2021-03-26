import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import utils from 'components/utils';

const FlexContainer = styled.div(({ margin, padding, align, justify, fluid, column }) => {
  return css`
    position: relative;
    display: flex;
    align-items: ${align || 'center'};
    justify-content: ${justify || 'center'};
    flex-wrap: ${column ? 'initial' : 'wrap'};
    flex-direction: ${column ? 'column' : 'row'};
    ${utils.getSpacingCSS({ for: 'margin', using: margin })}
    ${utils.getSpacingCSS({ for: 'padding', using: padding })}
    ${fluid
      ? 'width: 100%'
      : ''}
  `;
});

FlexContainer.propTypes = {
  margin: utils.spacing.propTypes,
  padding: utils.spacing.propTypes,
  fluid: PropTypes.bool,
  align: PropTypes.string,
  justify: PropTypes.string,
  columnd: PropTypes.bool,
};

FlexContainer.defaultProps = {
  margin: utils.spacing.defaultProps,
  padding: utils.spacing.defaultProps,
  fluid: false,
  align: '',
  justify: '',
  column: false,
};

export default FlexContainer;
