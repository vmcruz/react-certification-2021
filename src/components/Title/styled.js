import styled, { css } from 'styled-components';

const StyledH1 = styled.h1(
  (props) => css`
    color: ${props.color};
    font-size: 4em;
  `
);

const StyledH2 = styled.h2(
  (props) => css`
    color: ${props.color};
    font-size: 3em;
  `
);

const StyledH3 = styled.h3(
  (props) => css`
    color: ${props.color};
    font-size: 2em;
  `
);

const StyledH4 = styled.h4(
  (props) => css`
    color: ${props.color};
    line-height: 1.875em;
    font-size: 1.5em;
  `
);

const StyledH5 = styled.h5(
  (props) => css`
    color: ${props.color};
    line-height: 1.5em;
    font-size: 1.2em;
  `
);

export { StyledH1, StyledH2, StyledH3, StyledH4, StyledH5 };
