import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { useGlobalState, useGlobalDispatch } from 'providers/Global';
import Overlay from 'components/Overlay';
import Text from 'components/Text';
import List from 'components/List';

import { MenuContainer } from './styled';

function Sidebar({ onClose }) {
  const { theme } = useGlobalState();
  const dispatch = useGlobalDispatch();
  const history = useHistory();

  function goHome() {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { searchQuery: 'wizeline' },
    });
    history.push('/');
    onClose();
  }

  return (
    <Overlay onDismiss={onClose}>
      <MenuContainer align="flex-start" onClick={(e) => e.stopPropagation()}>
        <List>
          <List.Item
            icon="home"
            iconColor={theme.sidebar.colors.text}
            iconSize="lg"
            onClick={goHome}
          >
            <Text color={theme.sidebar.colors.text} size="lg">
              Home
            </Text>
          </List.Item>
        </List>
      </MenuContainer>
    </Overlay>
  );
}

Sidebar.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Sidebar;
