import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

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
      history.push(`/search/${value}`);
    }
  }

  function toggleSwitch() {
    setIsSwitchOn(!isSwitchOn);
    toggleTheme();
  }

  function handleAction() {
    if (state.userData) {
      dispatch({ type: 'LOGOUT' });
    } else {
      history.push('/login');
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
        {state.userData && (
          <FlexContainer margin={{ left: 'xlg' }}>
            <Avatar src={state.userData.avatarUrl} alt={state.userData.name} />
            <Text size="lg" color={theme.header.colors.text} margin={{ left: 'sm' }}>
              {state.userData.name}
            </Text>
          </FlexContainer>
        )}
        <Button primary margin={{ left: 'md' }} onClick={handleAction}>
          <Text size="lg" padding={{ horizontal: 'md' }} color={theme.header.colors.text}>
            {!state.userData ? 'Login' : 'Logout'}
          </Text>
        </Button>
      </Section>
    </StyledHeader>
  );
}

export default Header;
