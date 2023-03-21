import styled from 'styled-components';
import {devices} from '@site/src/utils/mediaQuery';

export const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;

  & > :not(:last-child) {
    margin-right: 1rem;
  }
`;

export const SplitView = styled.div`
  display: flex;
  flex-direction: row;

  .split-left {
    width: 40%;
    height: calc(100vh - 60px - 4rem);
    overflow-y: scroll;
  }

  .split-right {
    width: 60%;
    height: calc(100vh - 60px - 4rem);
    overflow-y: scroll;
  }

  @media ${devices.xs} {
    flex-direction: column;

    .split-left {
      width: 100%;
      height: initial;
    }

    .split-right {
      width: 100%;
      height: initial;
    }
  }
`;
