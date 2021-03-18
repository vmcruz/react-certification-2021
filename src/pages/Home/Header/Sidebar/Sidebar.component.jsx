import React from 'react';
import PropTypes from 'prop-types';

import { useGlobalState } from 'providers/Global';
import Overlay from 'components/Overlay';
import Text from 'components/Text';
import List from 'components/List';

import { MenuContainer } from './styled';

function Sidebar({ onClose }) {
  const { theme } = useGlobalState();

  return (
    <Overlay onDismiss={onClose}>
      <MenuContainer align="flex-start" onClick={(e) => e.stopPropagation()}>
        <List>
          <List.Item>
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
