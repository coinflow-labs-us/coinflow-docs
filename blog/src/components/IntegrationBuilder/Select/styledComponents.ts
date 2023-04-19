import styled from 'styled-components';

export const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;

  & > :not(:last-child) {
    margin-right: 1rem;
  }
`;
