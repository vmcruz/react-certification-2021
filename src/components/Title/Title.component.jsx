import React from 'react';
import PropTypes from 'prop-types';

import { StyledH5, StyledH4, StyledH3, StyledH2, StyledH1 } from './styled';

function Title({ color, size, children, ...otherProps }) {
  const titleSizes = {
    xsm: StyledH5,
    sm: StyledH4,
    md: StyledH3,
    lg: StyledH2,
    xlg: StyledH1,
  };

  const StyledTitle = titleSizes[size];

  return (
    <StyledTitle color={color} {...otherProps}>
      {children}
    </StyledTitle>
  );
}

Title.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOf(['xsm', 'sm', 'md', 'lg', 'xlg']),
};

Title.defaultProps = {
  color: 'black',
  size: 'xlg',
};

export default Title;
