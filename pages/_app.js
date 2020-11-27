import "../styles/globals.css";
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Breadcrumbs from "@material-ui/core/breadcrumbs";
import Link from "next/link";
import { useRouter } from "next/router";

const rootTheme = createMuiTheme({
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

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function MyApp({ Component, pageProps }) {
  const classes = useStyles();
  const router = useRouter();

  return (
    <ThemeProvider theme={rootTheme}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/">
              noobpedia
            </Link>
            <Typography variant="h6" className={classes.title}>
              {router.query.knowledge || ""}
            </Typography>
          </Breadcrumbs>
        </Toolbar>
      </AppBar>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
