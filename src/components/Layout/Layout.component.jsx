import React from 'react';

import Header from './Header';
import { Container } from './styled';

function Layout({ children, ...otherProps }) {
  return (
    <Container column {...otherProps}>
      <Header />
      {children}
    </Container>
  );
}

export default Layout;
