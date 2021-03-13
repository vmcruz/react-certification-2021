import React, { useEffect, useState } from 'react';

import { useGlobalState, useGlobalDispatch } from 'providers/Global';
import Input from 'components/Input';
import Button from 'components/Button';
import Text from 'components/Text';
import FlexContainer from 'components/FlexContainer';
import { placeholder100 } from 'assets';
import { StyledHeader, Avatar } from './styled';

function Header() {
  const { state, theme, toggleTheme } = useGlobalState();
  const dispatch = useGlobalDispatch();
  const [value, setValue] = useState('');
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  useEffect(() => {
    // syncs with state after loading config
    setValue(state.searchQuery);
    setIsSwitchOn(state.config.theme !== 'light');
  }, [state]);

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

  function toggleSwitch() {
    setIsSwitchOn(!isSwitchOn);
    toggleTheme();
  }

  return (
    <StyledHeader>
      <FlexContainer>
        <Button icon="bars" iconColor={theme.header.colors.text} />
        <Input
          autoFocus
          icon="search"
          placeholder="Search..."
          value={value}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          color={theme.header.colors.text}
        />
      </FlexContainer>
      <FlexContainer>
        <Button
          icon={isSwitchOn ? 'toggle-on' : 'toggle-off'}
          iconColor={theme.header.colors.switch}
          iconSize="2x"
          onClick={toggleSwitch}
        >
          <Text color={theme.header.colors.text} size="lg">
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
