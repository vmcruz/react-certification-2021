import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { useGlobalState, useGlobalDispatch } from 'providers/Global';
import Input from 'components/Input';
import Button from 'components/Button';
import Text from 'components/Text';
import FlexContainer from 'components/FlexContainer';
import { placeholder100 } from 'assets';
import Sidebar from './Sidebar';
import { StyledHeader, Avatar } from './styled';

function Header() {
  const { state, theme, toggleTheme } = useGlobalState();
  const dispatch = useGlobalDispatch();
  const [value, setValue] = useState('');
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    // syncs with state after loading config
    setValue(state.searchQuery);
    setIsSwitchOn(state.config.theme !== 'light');
  }, [state]);

  useEffect(() => {
    // syncs the value of the input when the param.query changes
    if (params.query) {
      dispatch({
        type: 'SEARCH_QUERY',
        payload: { searchQuery: params.query },
      });
    }
  }, [dispatch, params.query]);

  function handleChange({ target }) {
    setValue(target.value);
  }

  async function handleKeyUp(e) {
    if (e.keyCode === 13) {
      history.push(`/search/${value}`);
    }
  }

  function toggleSwitch() {
    setIsSwitchOn(!isSwitchOn);
    toggleTheme();
  }

  return (
    <StyledHeader>
      {isSidebarVisible && <Sidebar onClose={() => setIsSidebarVisible(false)} />}
      <FlexContainer>
        <Button
          icon="bars"
          iconColor={theme.header.colors.text}
          iconSize="lg"
          onClick={() => setIsSidebarVisible(true)}
        />
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
