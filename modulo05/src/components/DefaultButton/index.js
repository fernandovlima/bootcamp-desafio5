import styled from 'styled-components';

const DefaultButton = styled.button`
  background: #7157c1;
  color: #fff;
  padding: 5px 10px;
  width: 120px;
  height: 40px;
  border-radius: 4px;
  font-weight: 500;

  &:hover {
    background: #fff;
    color: #7159c1;
    border: 1px solid #7159c1;
    font-weight: 800;
  }
`;

export default DefaultButton;
