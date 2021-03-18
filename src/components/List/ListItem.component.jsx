import React from 'react';

import { Item } from './styled';

function ListItem({ children, ...otherProps }) {
  return (
    <Item padding={{ horizontal: 'md', vertical: 'md' }} {...otherProps}>
      {children}
    </Item>
  );
}

export default ListItem;
