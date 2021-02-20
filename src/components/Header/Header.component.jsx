import React from 'react';

import Input from 'components/Input';
import Button from 'components/Button';
import FlexContainer from 'components/FlexContainer';
import { placeholder100 } from 'assets';
import { StyledHeader, Avatar } from './styled';

function Header() {
  return (
    <StyledHeader>
      <FlexContainer>
        <Button icon="bars" />
        <Input icon="search" placeholder="Search..." autoFocus />
      </FlexContainer>
      <FlexContainer>
        <Button icon="toggle-off">Dark Mode</Button>
        <Button>
          <Avatar src={placeholder100} alt="placeholder-100x100" />
        </Button>
      </FlexContainer>
    </StyledHeader>
  );
}

export default Header;
