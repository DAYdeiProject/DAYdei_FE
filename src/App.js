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
