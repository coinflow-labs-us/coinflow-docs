import styled from 'styled-components';
import {devices} from '@site/src/utils/mediaQuery';

export const LoadingWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${devices.sm} {
    height: 400px;
  }
`;
