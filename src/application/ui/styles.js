import styled, { injectGlobal } from 'styled-components';

injectGlobal`
* {
  box-sizing: border-box;
}
body, html {
  margin: 0;
  padding:0;
}

`;

export const Site = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu,
    Cantarell, '“Fira Sans”', '“Droid Sans”', '“Helvetica Neue”', Arial,
    sans-serif;
`;
