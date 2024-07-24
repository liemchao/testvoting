import { BrowserRouter } from "react-router-dom";

import Router from "./routes.js";
import ThemeProvider from "theme/index.js";
import { ProviderToken } from "./context/authenToken/AuthenToken.jsx";
import theme from "assets/theme";
import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";

const materialTheme = materialExtendTheme({
  typography: {
    fontFamily: '"Arial", sans-serif',
    fontWeight: "bold",
  },
});

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ProviderToken>
          <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
            <JoyCssVarsProvider>
              <Router />
            </JoyCssVarsProvider>
          </MaterialCssVarsProvider>
        </ProviderToken>
      </ThemeProvider>
    </BrowserRouter>
  );
}
