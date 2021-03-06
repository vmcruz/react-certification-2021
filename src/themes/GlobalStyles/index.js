import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --font-family-default: Roboto, Arial, sans-serif;
    --font-size-default: 16px;
    --font-size-sm: 12px;
    --font-size-md: 14px;
    --font-size-lg: 16px;
    --font-size-xlg: 24px;
    --spacing-sm: 8px;
    --spacing-md: 15px;
    --spacing-lg: 20px;
    --spacing-xlg: 30px;
    --border-radius-sm: 4px;
    --border-radius-md: 10px;
    --border-radius-lg: 15px;
    --border-radius-xlg: 20px;
  }

  *, body, html {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    outline: none !important;
    font-family: var(--font-family-default);
  }

  body {
    background-color: ${({ theme }) => theme.content.colors.background}
  }

  h1, h2, h3, h4 {
    width: 100%;
    text-align: center;
  }
`;

export default GlobalStyle;
