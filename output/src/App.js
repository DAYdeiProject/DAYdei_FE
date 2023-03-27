import { ThemeProvider } from "styled-components";
import { FlexRow, FlexRowBetween, FlexCol } from "./shared/style/Theme";
import Router from "./shared/router/Router";
import theme from "./shared/style/Theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
}

export default App;
