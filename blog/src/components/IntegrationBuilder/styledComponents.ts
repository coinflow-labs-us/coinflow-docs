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
    margin-bottom: 0;
  }

  .scrollable-code,
  .split-left {
    ::-webkit-scrollbar {
      width: 10px;
    }
    ::-webkit-scrollbar-track {
      background: var(--color-tint);
      border-radius: 5px;
    }
    ::-webkit-scrollbar-thumb {
      background: var(--ifm-color-primary-lighter);
      border-radius: 5px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: var(--ifm-color-primary-dark);
    }
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
