import styled, { css } from 'styled-components';

export const StyledH1 = styled.h1(
  (props) => css`
    color: ${props.color};
    font-size: 4em;
  `
);

export const StyledH2 = styled.h2(
  (props) => css`
    color: ${props.color};
    font-size: 3em;
  `
);

export const StyledH3 = styled.h3(
  (props) => css`
    color: ${props.color};
    font-size: 2em;
  `
);

export const StyledH4 = styled.h4(
  (props) => css`
    color: ${props.color};
    line-height: 1.875em;
    font-size: 1.5em;
  `
);

export const StyledH5 = styled.h5(
  (props) => css`
    color: ${props.color};
    line-height: 1.5em;
    font-size: 1.2em;
  `
);
