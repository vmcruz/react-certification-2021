import styled, { css } from 'styled-components';

import utils from 'components/utils';

const shared = (props) => css`
  color: ${props.color};
  text-align: ${props.align};
  font-weight: 500;
  ${utils.getSpacingCSS({ for: 'margin', using: props.margin })}
  ${utils.getSpacingCSS({ for: 'padding', using: props.padding })}
`;

export const StyledH1 = styled.h1(
  (props) => css`
    ${shared(props)}
    font-size: 4em;
  `
);

export const StyledH2 = styled.h2(
  (props) => css`
    ${shared(props)}
    font-size: 3em;
  `
);

export const StyledH3 = styled.h3(
  (props) => css`
    ${shared(props)}
    font-size: 2em;
  `
);

export const StyledH4 = styled.h4(
  (props) => css`
    ${shared(props)}
    line-height: 1.875em;
    font-size: 1.5em;
  `
);

export const StyledH5 = styled.h5(
  (props) => css`
    ${shared(props)}
    line-height: 1.5em;
    font-size: 1.2em;
  `
);
