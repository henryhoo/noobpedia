import { createMuiTheme } from "@material-ui/core/styles";

// Create a theme instance.
const theme = createMuiTheme({
  spacing: 8,
  palette: {
    // type: "dark",
    primary: {
      main: "#9e9e9e",
    },
    secondary: {
      main: "#bdbdbd",
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
