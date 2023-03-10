import { ThemeProvider } from 'styled-components';
import { FlexRow, FlexRowBetween, FlexCol } from './shared/style/Theme';
import Router from './shared/router/Router';

function App() {
    const theme = {
        FlexRow,
        FlexRowBetween,
        FlexCol,
    };
    return (
        <ThemeProvider theme={theme}>
            <Router />
        </ThemeProvider>
    );
}

export default App;
