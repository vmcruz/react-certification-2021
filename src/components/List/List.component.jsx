import React from 'react';

import FlexContainer from 'components/FlexContainer';
import ListItem from './ListItem.component';

function List({ children, ...otherProps }) {
  return (
    <FlexContainer fluid {...otherProps}>
      {children}
    </FlexContainer>
  );
}

List.Item = ListItem;

export default List;
