import styled from 'styled-components';
import {devices} from '@site/src/utils/mediaQuery';

export const HomepageBanner = styled.img`
  display: block;
  object-fit: cover;
  width: 100%;
  height: 30vh;
  opacity: 1;
  object-position: center 50%;

  @media ${devices.sm} {
    padding: 2rem;
  }
`;
