import React, { useState } from 'react';

import { useGlobalState, useGlobalDispatch } from 'providers/Global';
import Input from 'components/Input';
import Button from 'components/Button';
import Text from 'components/Text';
import FlexContainer from 'components/FlexContainer';
import { placeholder100 } from 'assets';
import { StyledHeader, Avatar } from './styled';

function Header() {
  const { state } = useGlobalState();
  const dispatch = useGlobalDispatch();
  const [value, setValue] = useState(state.searchQuery);

  function handleChange({ target }) {
    setValue(target.value);
  }

  async function handleKeyUp(e) {
    if (e.keyCode === 13) {
      dispatch({
        type: 'SEARCH_QUERY',
        payload: { searchQuery: value },
      });
    }
  }

  return (
    <StyledHeader>
      <FlexContainer>
        <Button icon="bars" iconColor="white" />
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
        <Button icon="toggle-off" iconColor="white">
          <Text color="white" size="lg">
            Dark Mode
          </Text>
        </Button>
        <Button>
          <Avatar src={placeholder100} alt="placeholder-100x100" />
        </Button>
      </FlexContainer>
    </StyledHeader>
  );
}

export default Header;
