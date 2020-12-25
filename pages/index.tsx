import React, { useRef } from "react";
import styles from "styles/Home.module.css";
import { GetStaticProps } from "next";
import { getAllKnowledges } from "lib/knowledge";
import AllKnowledgeSection from "pages/components/allKnowledgesSection";
import type { KnowledgeMetadata } from "types";
import Typography from "@material-ui/core/Typography";
import Head from "next/head";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import WbIncandescentOutlinedIcon from "@material-ui/icons/WbIncandescentOutlined";
import BubbleChartOutlinedIcon from "@material-ui/icons/BubbleChartOutlined";

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
    background: theme.palette.success.light,
  },
  title: {
    marginTop: theme.spacing(4),
    margin: theme.spacing(1),
    lineHeight: 1.15,
    fontSize: "4rem",
  },
  description: {
    lineHeight: 1.5,
    fontSize: "1.5rem",
  },
  knowledgeSection: {
    borderTop: "1px solid #eaeaea",
    width: "100%",
  },
}));

export default function Home(props: Props) {
  const targetRef = useRef(null);
  const classes = useStyles();

  return (
    <div className={classes.root} ref={targetRef}>
      <Head>
        <title>noobpedia</title>
      </Head>
      <h1 className={classes.title}>Starter guide for n00b</h1>
      <p className={classes.description}>
        Learning with the best resources voted by <code>community</code>
      </p>
      <div>
        <Button
          variant="contained"
          href="https://github.com/noobpedia/noobpedia/blob/master/contributing/knowledge.md"
          className={classes.button}
          startIcon={<WbIncandescentOutlinedIcon />}
          size="small"
        >
          Write a new topic
        </Button>
        <Button
          variant="contained"
          href="https://github.com/noobpedia/noobpedia/blob/master/contributing/resource.md"
          className={classes.button}
          startIcon={<BubbleChartOutlinedIcon />}
          size="small"
        >
          Add useful resources
        </Button>
      </div>

      <div className={classes.knowledgeSection}>
        <AllKnowledgeSection
          allKnowledge={props.allKnowledge}
        ></AllKnowledgeSection>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  return {
    props: { allKnowledge: getAllKnowledges() },
  };
};
