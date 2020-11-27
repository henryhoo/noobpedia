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
  const allKnowledgeFiles: {} = getAllFileContentsInDir(KNOWLEDGE_PATH);
  const allResourcesFiles: {} = getAllFileContentsInDir(
    KNOWLEDGE_RESOURCE_PATH
  );

  const createTreeNode = (node: KnowledgeSubjectRaw): KnowledgeSubject => {
    const childrenFiles = node.children;
    const resourceFiles = node.resources;
    const children =
      childrenFiles?.map(
        (file: string): KnowledgeSubject => {
          if (file in allKnowledgeFiles) {
            return createTreeNode(yaml.safeLoad(allKnowledgeFiles[file]));
          }
          throw new Error(`knowledge ${file} does not exist`);
        }
      ) || [];
    const resources =
      resourceFiles?.map(
        (file: string): KnowledgeResource => {
          if (file in allResourcesFiles) {
            return yaml.safeLoad(allResourcesFiles[file]);
          }
          throw new Error(`resource ${file} does not exist`);
        }
      ) || [];
    return { name: node.name, children: children, resources: resources };
  };

  const root: KnowledgeSubjectRaw = yaml.safeLoad(
    allKnowledgeFiles[ROOT_KNOWLEDGE_FILENAME]
  );
  return createTreeNode(root);
}
