import styled, {css} from 'styled-components';

const activeMixin = css`
  background-color: #606098;
  color: #ffffff;
`;

export const FileItem = styled.button`
  flex: 1 0 70px;
  height: 40px;
  padding: 0 10px;
  border-radius: 20px;
  border: none;
  font-size: 16px;
  white-space: nowrap;
  font-weight: bold;
  margin-right: 10px;
  transition: 0.1s ease;
  cursor: pointer;
  background-color: transparent;
  color: #bfc5d3;

  :hover {
    background: #595991;
    color: #ffffff;
  }

  ${props => props.isActive && activeMixin}
`;

export const FileContainer = styled.div`
  overflow-x: auto;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  border-radius: 8px 8px 0 0;
  background-color: #505086;
`;
