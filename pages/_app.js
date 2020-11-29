import "../styles/globals.css";
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import Breadcrumbs from "@material-ui/core/breadcrumbs";
import Link from "next/link";
import { useRouter } from "next/router";
import theme from "styles/theme";
import GitHubIcon from "@material-ui/icons/GitHub";
import CssBaseline from "@material-ui/core/CssBaseline";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  githubButton: {
    marginRight: theme.spacing(2),
    marginLeft: "auto",
  },
}));

function MyApp({ Component, pageProps }) {
  const classes = useStyles();
  const router = useRouter();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="delete"
          >
            <AccountTreeIcon />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/">
              noobpedia
            </Link>
            <Typography variant="h6" className={classes.title}>
              {router.query.knowledge || ""}
            </Typography>
          </Breadcrumbs>
          <Button
            variant="contained"
            href="https://github.com/noobpedia/noobpedia"
            className={classes.githubButton}
            startIcon={<GitHubIcon></GitHubIcon>}
          >
            Fork
          </Button>
        </Toolbar>
      </AppBar>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
