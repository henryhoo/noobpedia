import { GetStaticProps, GetStaticPaths } from "next";
import { makeStyles } from "@material-ui/core/styles";
import React, { useRef } from "react";
import Tree from "components/knowledgeTree";
import { KnowledgeSubject } from "types";
import { getKnowledgeTree, getAllKnowledgePaths } from "lib/knowledge";

type URLParams = {
  knowledge: string;
};

type Props = {
  knowledgeTreeRoot: KnowledgeSubject;
};

const useStyles = makeStyles((theme) => {
  return {
    container: {
      height: "100%",
    },
  };
});

export default function Home(props: Props) {
  const targetRef = useRef(null);
  const classes = useStyles();
  return (
    <div className={classes.container} ref={targetRef}>
      <Tree data={props.knowledgeTreeRoot} targetRef={targetRef} />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths<URLParams> = async () => {
  return {
    paths: getAllKnowledgePaths(),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, URLParams> = async ({
  params,
}) => {
  return {
    props: { knowledgeTreeRoot: await getKnowledgeTree(params.knowledge) }, // will be passed to the page component as props
  };
};
