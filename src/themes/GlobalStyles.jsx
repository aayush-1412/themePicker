import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.colors.body};
    color: ${({ theme }) => theme.colors.user.text};
    font-family: ${({ theme }) => theme.font};
    transition: all 0.50s linear;
  }

  a {
    color: ${({ theme }) => theme.colors.user.text};
    cursor: pointer;
  }

  button.btn {
    background-color: ${({ theme }) => theme.colors.user.body};
    color: ${({ theme }) => theme.colors.user.text};
  }

  button.cancel {
    background-color: #ff0000;
    color: ${({ theme }) => theme.colors.sender.text};
  }

  button:disabled {
    background-color: #ebebeb;
    color: #333333;
  }

  button {
    border: 0;
    display: inline-block;
    padding: 12px 24px;
    font-size: 14px;
    border-radius: 4px;
    margin-top: 5px;
    cursor: pointer;
    background-color: #1064EA;
    color: #FFFFFF;
    font-family: ${({ theme }) => theme.font};
  }

`;
