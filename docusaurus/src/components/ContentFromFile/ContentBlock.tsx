import React from 'react';

const BaseBlock = props => {
  return <div style={{color: 'red'}}>{props.children}</div>;
};

export default BaseBlock;
