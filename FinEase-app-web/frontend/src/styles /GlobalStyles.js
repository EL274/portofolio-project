import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
  }

  body {
    background:rgb(13, 12, 12);
    color: gold;
  }

  button {
    padding: 10px;
    background: none;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    transition: 0.3s;

    &:hover {
      background: #0056b3;
    }
  }

  input {
    padding: 8px;
    margin: 5px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
`;

export default GlobalStyles;
