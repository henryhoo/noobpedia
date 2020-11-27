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

type KnowledgeSubjectRaw = {
  name: string;
  resources: string[];
  children: string[];
};

export function getKnowledgeTree(): KnowledgeSubject {
  const knowledgeFiles: {} = getAllFileContentsInDir(KNOWLEDGE_PATH);
  const resourcesFiles: {} = getAllFileContentsInDir(KNOWLEDGE_RESOURCE_PATH);

  const createTreeNode = (node: KnowledgeSubjectRaw): KnowledgeSubject => {
    const childrenFiles = node.children;
    const resourceFiles = node.resources;
    const children =
      childrenFiles?.map(
        (file: string): KnowledgeSubject => {
          return createTreeNode(yaml.safeLoad(knowledgeFiles[file]));
        }
      ) || [];
    const resources =
      resourceFiles?.map(
        (file: string): KnowledgeResource => {
          return yaml.safeLoad(resourcesFiles[file]);
        }
      ) || [];
    return { name: node.name, children: children, resources: resources };
  };

  const root: KnowledgeSubjectRaw = yaml.safeLoad(
    knowledgeFiles[ROOT_KNOWLEDGE_FILENAME]
  );
  return createTreeNode(root);
}
