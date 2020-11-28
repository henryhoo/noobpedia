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

type KnowledgeSubjectRaw = {
  name: string;
  description?: string;
  resources: string[];
  children: string[];
};

export function getKnowledgeTree(knowledgeDir: string): KnowledgeSubject {
  const knowledgeDirPath = KNOWLEDGE_PATH + knowledgeDir + "/";
  const knowledgeFileName = ROOT_KNOWLEDGE_FILENAME;

  const allKnowledgeYAMLContents = getAllFileContentsInDir(knowledgeDirPath);
  const allResourceYAMLContents = getAllFileContentsInDir(
    KNOWLEDGE_RESOURCE_PATH
  );
  if (!allKnowledgeYAMLContents.has(knowledgeFileName)) {
    throw new Error(`knowledge ${knowledgeFileName} does not exist`);
  }

  const createTreeNode = (node: KnowledgeSubjectRaw): KnowledgeSubject => {
    const childrenFileNames = node.children;
    const resourceFileNames = node.resources;
    const children =
      childrenFileNames?.map(
        (file: string): KnowledgeSubject => {
          if (allKnowledgeYAMLContents.has(file)) {
            return createTreeNode(
              yaml.safeLoad(allKnowledgeYAMLContents.get(file))
            );
          }
          throw new Error(`knowledge ${file} does not exist`);
        }
      ) || [];
    const resources =
      resourceFileNames?.map(
        (file: string): KnowledgeResource => {
          if (allResourceYAMLContents.has(file)) {
            return yaml.safeLoad(allResourceYAMLContents.get(file));
          }
          throw new Error(`resource ${file} does not exist`);
        }
      ) || [];
    return {
      name: node.name,
      description: node.description ?? null,
      children,
      resources,
    };
  };

  const root: KnowledgeSubjectRaw = yaml.safeLoad(
    allKnowledgeYAMLContents.get(knowledgeFileName)
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
    const content: KnowledgeSubjectRaw = yaml.safeLoad(
      getFileContent(
        KNOWLEDGE_PATH + knowledgeDir + "/" + ROOT_KNOWLEDGE_FILENAME
      )
    );
    return {
      name: content.name,
      description: content.description ?? null,
      path: knowledgeDir,
    };
  });
  return res;
}
