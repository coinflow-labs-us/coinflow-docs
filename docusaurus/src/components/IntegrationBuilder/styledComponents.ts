import {devices} from '@site/src/utils/mediaQuery';
import styled from 'styled-components';

export const SplitView = styled.div`
  display: flex;
  flex-direction: row;

  .split-left,
  .split-right {
    height: calc(100vh - 60px - 3rem);
  }

  .split-left {
    width: 40%;
    overflow-y: auto;
  }

  .split-right {
    width: 60%;
  }

  .scrollable-code {
    overflow-y: auto;
    height: calc(100% - 50px);
  }

  .code-block {
    border-radius: 0;
  }

  @media ${devices.xs} {
    flex-direction: column;

    .split-left,
    .split-right {
      width: 100%;
      height: initial;
    }
  }
`;
