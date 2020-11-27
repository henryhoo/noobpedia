import { getAllKnowledgePaths } from "utils/knowledgeTree";
import { GetStaticProps, GetStaticPaths } from "next";

import React, { useRef } from "react";
import styles from "styles/Home.module.css";
import Tree from "components/knowledgeTree";
import { KnowledgeSubject } from "types";
import { getKnowledgeTree } from "utils/knowledgeTree";

type URLParams = {
  knowledge: string;
};

type Props = {
  knowledgeTreeRoot: KnowledgeSubject;
};

export default function Home(props: Props) {
  const targetRef = useRef(null);
  return (
    <div className={styles.container} ref={targetRef}>
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
    props: { knowledgeTreeRoot: getKnowledgeTree(params.knowledge) }, // will be passed to the page component as props
  };
};
