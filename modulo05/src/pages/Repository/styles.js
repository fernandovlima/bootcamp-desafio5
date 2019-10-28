import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    background: #7159c1;
    color: #fff;
    text-decoration: none;
    font-size: 16px;
    padding: 5px 10px;
    border-radius: 4px;
    border: 1px solid #fff;
    margin-bottom: 10px;

    &:hover {
      background: #fff;
      color: #7159c1;
      border: 1px solid #7159c1;
    }
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 20px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.div`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      height: 36px;
      width: 36px;
      border-radius: 50%;
      border: 2px solid #eef;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;
      }

      a {
        text-decoration: none;
        color: #333;

        &:hover {
          background: #fff;
          color: #7159c1;
          border: 1px solid #7159c1;
          font-weight: 800;
        }
        span {
          background: #eee;
          color: #333;
          border-radius: 3px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const IssueFilter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  align-content: center;
  padding-bottom: 30px;
  margin-bottom: 30px;
  border-bottom: 1px solid #eee;
`;

export const PageActions = styled.div``;
