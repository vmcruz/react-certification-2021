import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Input from 'components/Input';
import Button from 'components/Button';
import FlexContainer from 'components/FlexContainer';
import { placeholder100 } from 'assets';
import { StyledHeader, Avatar } from './styled';

function Header({ ytSearch }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    // load initial search
    ytSearch('wizeline');
  }, [ytSearch]);

  function handleChange({ target }) {
    setValue(target.value);
  }

  async function handleKeyUp(e) {
    if (e.keyCode === 13) {
      ytSearch(value);
    }
  }

  return (
    <StyledHeader>
      <FlexContainer>
        <Button icon="bars" />
        <Input
          autoFocus
          icon="search"
          placeholder="Search..."
          value={value}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
        />
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

Header.propTypes = {
  ytSearch: PropTypes.func.isRequired,
};

export default Header;
