import { createMuiTheme } from "@material-ui/core/styles";

// Create a theme instance.
const theme = createMuiTheme({
  spacing: 8,
  palette: {
    // type: "dark",
    primary: {
      light: "#cfcfcf",
      main: "#9e9e9e",
      dark: "#707070",
      contrastText: "#000",
    },
    secondary: {
      light: "#efefef",
      main: "#bdbdbd",
      dark: "#8d8d8d",
      contrastText: "#000",
    },
    background: {
      paper: "#bdbdbd",
    },
  },
  typography: {
    fontSize: 14,
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        // h1: {
        //   fontSize: 60,
        // },
      },
    },
  },
});

export default theme;
