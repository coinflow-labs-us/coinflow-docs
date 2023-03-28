import styled, {css} from 'styled-components';

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
  cursor: pointer;

  :hover {
    border-left-color: var(--ifm-color-primary-darker);
  }

  :active {
    border-left-color: var(--ifm-color-primary);
  }

  ${props =>
    props.isActive &&
    css`
      border-left-color: var(--ifm-color-primary) !important;
    `};

  .source-link-container {
    display: flex;
    justify-content: flex-end;
  }
`;

export const SourceLink = styled.a`
  color: #3cad6e;
  display: flex;
  align-items: center;

  svg {
    transform: scale(0.8);
  }
`;
