import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid ${props => (props.error ? '#C70039' : '#eee')};
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;

const rotate = keyframes`
  from{
    transform: rotate(0deg)
  }
  to{
    transform: rotate(360deg)
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #7159c1;
  border: 1px solid #eee;
  padding: 0 15px;
  margin-left: 15px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover {
    background: #9159c1;
    border: 1px solid #9159c1;
  }
  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & + li {
      border-top: solid 1px #eee;
    }
  }

  a {
    color: #fff;
    background: #7159c1;
    text-decoration: none;
    padding: 5px 10px;
    border-radius: 4px;
    border: 1px solid #eee;

    &:hover {
      background: #fff;
      color: #7159c1;
      border: 1px solid #7159c1;
    }
  }
`;

const shake = keyframes`
  0%, 75%%{ transform: translate(-10px); }
  25%, 100% { transform: translate(10px); }
  50% { transform: translate(0px);

   }
 }
`;
export const ErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  p {
    margin-top: 10px;
    font-size: 14px;
    color: #c70039;
    opacity: 0.8;
    animation: ${shake} 1s linear alternate;
  }
`;
