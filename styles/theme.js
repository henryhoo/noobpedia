import { createMuiTheme } from "@material-ui/core/styles";

// Create a theme instance.
const theme = createMuiTheme({
  spacing: 8,
  palette: {
    // type: "dark",
    primary: {
      main: "#9e9e9e",
      mainGradient: "linear-gradient(45deg, #9e9e9e, #bdbdbd)",
    },
    secondary: {
      main: "#bdbdbd",
    },
    background: {
      // paper: "#bdbdbd",
    },
  },
  typography: {
    fontSize: 14,
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        code: {
          backgroundColor: "#9e9e9e",
          borderRadius: "5px",
          padding: "0.75rem",
          fontSize: "1.1rem",
          fontFamily:
            "Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace",
        },
      },
    },
  },
});

export default theme;
