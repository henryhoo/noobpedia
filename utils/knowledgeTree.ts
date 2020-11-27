import type {
  KnowledgeSubject,
  KnowledgeResource,
} from "components/knowledgeTree";
import {
  KNOWLEDGE_PATH,
  KNOWLEDGE_RESOURCE_PATH,
  ROOT_KNOWLEDGE_FILENAME,
} from "constants/path";

import yaml from "js-yaml";
import { getAllFileContentsInDir } from "utils/files";
import fs from "fs";

type KnowledgeSubjectRaw = {
  name: string;
  resources: string[];
  children: string[];
};

export function getKnowledgeTree(knowledge?: string): KnowledgeSubject {
  const allKnowledgeYAMLContents: {} = getAllFileContentsInDir(KNOWLEDGE_PATH);
  const allResourceYAMLContents: {} = getAllFileContentsInDir(
    KNOWLEDGE_RESOURCE_PATH
  );

  const createTreeNode = (node: KnowledgeSubjectRaw): KnowledgeSubject => {
    const childrenFileNames = node.children;
    const resourceFileNames = node.resources;
    const children =
      childrenFileNames?.map(
        (file: string): KnowledgeSubject => {
          if (file in allKnowledgeYAMLContents) {
            return createTreeNode(
              yaml.safeLoad(allKnowledgeYAMLContents[file])
            );
          }
          throw new Error(`knowledge ${file} does not exist`);
        }
      ) || [];
    const resources =
      resourceFileNames?.map(
        (file: string): KnowledgeResource => {
          if (file in allResourceYAMLContents) {
            return yaml.safeLoad(allResourceYAMLContents[file]);
          }
          throw new Error(`resource ${file} does not exist`);
        }
      ) || [];
    return { name: node.name, children, resources };
  };

  const knowledgeFileName = knowledge
    ? knowledge + ".yaml"
    : ROOT_KNOWLEDGE_FILENAME;
  if (!(knowledgeFileName in allKnowledgeYAMLContents)) {
    throw new Error(`knowledge ${knowledgeFileName} does not exist`);
  }
  const root: KnowledgeSubjectRaw = yaml.safeLoad(
    allKnowledgeYAMLContents[knowledgeFileName]
  );
  return createTreeNode(root);
}

export function getAllKnowledgePaths(): { params: { knowledge: string } }[] {
  const fileNames = fs.readdirSync(KNOWLEDGE_PATH);
  return fileNames.map((fileName) => {
    return {
      params: {
        knowledge: fileName.replace(/\.yaml$/, ""),
      },
    };
  });
}
