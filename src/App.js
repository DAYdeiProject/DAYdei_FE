import styled from "styled-components";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;

// import { ThemeProvider } from "styled-components";
// import Router from "./shared/router/Router";
// import theme from "./shared/style/Theme";
//  <ThemeProvider theme={theme}>
//    <Router />
//  </ThemeProvider>;

// <Wrapper>
//     <Outlet />
//   </Wrapper>
