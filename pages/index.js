import React, { useRef } from "react";
import styles from "styles/Home.module.css";
import Tree from "components/knowledgeTree";
import { getKnowledgeTree } from "utils/knowledgeTree";

export default function Home(props) {
  const targetRef = useRef(null);
  return (
    <div className={styles.container} ref={targetRef}>
      <Tree data={props.knowledgeTreeRoot} targetRef={targetRef} />
    </div>
  );
}

export function getStaticProps(context) {
  const treeRoot = getKnowledgeTree();
  return {
    props: { knowledgeTreeRoot: treeRoot }, // will be passed to the page component as props
  };
}
