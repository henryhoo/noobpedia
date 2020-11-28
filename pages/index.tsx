import React, { useRef } from "react";
import styles from "styles/Home.module.css";
import { GetStaticProps } from "next";
import { getAllKnowledges } from "utils/knowledgeTree";
import GithubCorner from "react-github-corner";
import AllKnowledgeSection from "components/allKnowledgesSection";
import type { KnowledgeMetadata } from "types";
import Typography from "@material-ui/core/Typography";
import Head from "next/head";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

type Props = {
  allKnowledge: KnowledgeMetadata[];
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    height: "100%",
    paddingLeft: "20px",
    paddingRight: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function Home(props: Props) {
  const targetRef = useRef(null);
  const classes = useStyles();

  return (
    <div className={classes.root} ref={targetRef}>
      <GithubCorner href="https://github.com/noobpedia/noobpedia" />
      <Head>
        <title>noobpedia</title>
      </Head>
      <h1 className={styles.title}>Starter guide for n00b</h1>
      <p className={styles.description}>
        Learning with the best resources voted by{" "}
        <code className={styles.code}>community</code>
      </p>
      <Typography variant="body1" component="p"></Typography>
      <div>
        <Button
          variant="contained"
          href="https://github.com/noobpedia/noobpedia/blob/master/contributing/knowledge.md"
          className={classes.button}
        >
          Write a new topic
        </Button>
        <Button
          variant="contained"
          href="https://github.com/noobpedia/noobpedia/blob/master/contributing/resource.md"
          className={classes.button}
        >
          Add useful resources
        </Button>
      </div>

      <AllKnowledgeSection
        allKnowledge={props.allKnowledge}
      ></AllKnowledgeSection>
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  return {
    props: { allKnowledge: getAllKnowledges() },
  };
};
