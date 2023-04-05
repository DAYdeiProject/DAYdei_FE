import { Outlet } from "react-router-dom";
import styled from "styled-components";

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
