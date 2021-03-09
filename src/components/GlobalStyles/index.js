import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --font-family-default: Roboto, Arial, sans-serif;
    --font-size-default: 16px;
    --font-size-sm: 12px;
    --font-size-md: 14px;
    --font-size-lg: 18px;
    --font-size-xlg: 24px;
    --spacing-default: 0;
    --spacing-sm: 8px;
    --spacing-md: 15px;
    --spacing-lg: 20px;
    --spacing-xlg: 30px;

    --primary-color: #1c5476;
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

  h1, h2, h3, h4 {
    width: 100%;
    text-align: center;
  }
`;

export default GlobalStyle;
