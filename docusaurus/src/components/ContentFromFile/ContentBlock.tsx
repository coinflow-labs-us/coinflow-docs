import React from 'react';
import {MDXProvider} from '@mdx-js/react';

const BaseBlock = props => {
  return <MDXProvider>{props.children}</MDXProvider>;
};

export default BaseBlock;
