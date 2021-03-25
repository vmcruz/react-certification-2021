import React, { useEffect, useState } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';

import { useGlobalState, useGlobalDispatch } from 'providers/Global';
import Button from 'components/Button';
import Text from 'components/Text';
import FlexContainer from 'components/FlexContainer';
import Sidebar from './Sidebar';
import { StyledHeader, Avatar, HeaderInput, Section } from './styled';

function Header() {
  const { state, theme, toggleTheme } = useGlobalState();
  const dispatch = useGlobalDispatch();
  const [value, setValue] = useState('');
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const history = useHistory();
  const params = useParams();
  const location = useLocation();

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

  function handleKeyUp(e) {
    if (e.keyCode === 13) {
      history.push(`/search/${value}`, { from: location.pathname });
    }
  }

  function toggleSwitch() {
    setIsSwitchOn(!isSwitchOn);
    toggleTheme();
  }

  function handleAction() {
    if (state.user) {
      dispatch({ type: 'LOGOUT' });
    } else {
      history.push('/login', { from: location.pathname });
    }
  }

  return (
    <StyledHeader>
      {isSidebarVisible && <Sidebar onClose={() => setIsSidebarVisible(false)} />}
      <Section justify="flex-start">
        <Button
          icon="bars"
          iconColor={theme.header.colors.text}
          iconSize="lg"
          onClick={() => setIsSidebarVisible(true)}
        />
        <HeaderInput
          autoFocus
          icon="search"
          placeholder="Search..."
          value={value}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          color={theme.header.colors.text}
        />
      </Section>
      <Section justify="flex-end">
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
        {state.user && (
          <FlexContainer margin={{ left: 'xlg' }}>
            <Avatar src={state.user.avatarUrl} alt={state.user.name} />
            <Text size="lg" color={theme.header.colors.text} margin={{ left: 'sm' }}>
              {state.user.name}
            </Text>
          </FlexContainer>
        )}
        <Button primary margin={{ left: 'md' }} onClick={handleAction}>
          <Text size="lg" padding={{ horizontal: 'md' }} color={theme.header.colors.text}>
            {!state.user ? 'Login' : 'Logout'}
          </Text>
        </Button>
      </Section>
    </StyledHeader>
  );
}

export default Header;
