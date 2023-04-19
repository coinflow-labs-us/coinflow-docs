import React from 'react';
import styled from 'styled-components';
import {useColorMode} from '@docusaurus/theme-common';

const Wrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 2px;
  svg {
    fill: ${props => (props.isDark ? 'white' : 'initial')};
  }
`;

const IconWrapper = ({children}) => {
  const theme = useColorMode();
  return <Wrapper isDark={theme.colorMode === 'dark'}>{children}</Wrapper>;
};

export default IconWrapper;
