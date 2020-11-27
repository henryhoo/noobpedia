import {
  KNOWLEDGE_PATH,
  KNOWLEDGE_RESOURCE_PATH,
  ROOT_KNOWLEDGE_FILENAME,
} from "constants/path";

import yaml from "js-yaml";
import { getAllFileContentsInDir, getFileContent } from "utils/files";
import fs from "fs";

import type {
  KnowledgeSubject,
  KnowledgeResource,
  KnowledgeMetadata,
} from "types";
import { resolveMx } from "dns";

type KnowledgeSubjectRaw = {
  name: string;
  resources: string[];
  children: string[];
};

export function getKnowledgeTree(knowledgeDir: string): KnowledgeSubject {
  const knowledgeDirPath = KNOWLEDGE_PATH + knowledgeDir + "/";
  const knowledgeFileName = ROOT_KNOWLEDGE_FILENAME;

  const allKnowledgeYAMLContents: {} = getAllFileContentsInDir(
    knowledgeDirPath
  );
  const allResourceYAMLContents: {} = getAllFileContentsInDir(
    KNOWLEDGE_RESOURCE_PATH
  );
  if (!(knowledgeFileName in allKnowledgeYAMLContents)) {
    throw new Error(`knowledge ${knowledgeFileName} does not exist`);
  }

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
        knowledge: fileName,
      },
    };
  });
}

export function getAllKnowledges(): KnowledgeMetadata[] {
  const knowledgeDirs = fs.readdirSync(KNOWLEDGE_PATH);
  const res = knowledgeDirs.map((knowledgeDir) => {
    const content = yaml.safeLoad(
      getFileContent(
        KNOWLEDGE_PATH + knowledgeDir + "/" + ROOT_KNOWLEDGE_FILENAME
      )
    );
    return {
      name: content.name,
      path: knowledgeDir,
    };
  });
  res.push({ name: "dummy", path: "sd" });
  res.push({ name: "dummy", path: "sd" });
  res.push({ name: "dummy", path: "sd" });
  return res;
}
