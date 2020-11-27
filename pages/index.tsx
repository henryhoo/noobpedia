import React, { useRef } from "react";
import styles from "styles/Home.module.css";
import { GetStaticProps } from "next";
import { getAllKnowledges } from "utils/knowledgeTree";
import GithubCorner from "react-github-corner";
import AllKnowledgeSection from "components/allKnowledgesSection";
import type { KnowledgeMetadata } from "types";

type Props = {
  allKnowledge: KnowledgeMetadata[];
};

export default function Home(props: Props) {
  const targetRef = useRef(null);

  return (
    <div className={styles.container} ref={targetRef}>
      <GithubCorner href="https://github.com/noobpedia/noobpedia" />
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
