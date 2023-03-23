import styled from 'styled-components';

export const RetryButton = styled.button`
  background-color: #ffffff;
  border: 1px solid #000000;
  border-radius: 16px;
  color: #000000;
  font-size: 16px;
  padding: 8px 16px;
  transition: background-color 0.3s ease;
  cursor: pointer;

  :hover {
    background-color: #000000;
    color: #ffffff;
  }
`;

export const ContentBlockContainer = styled.div`
  border-left: 6px solid transparent;
  padding: 1rem;

  //onClick Color #1c64f2

  :hover {
    border-left: 6px solid #233876;
  }
`;
