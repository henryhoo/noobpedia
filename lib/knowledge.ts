import {
  KNOWLEDGE_PATH,
  KNOWLEDGE_RESOURCE_PATH,
  ROOT_KNOWLEDGE_FILENAME,
} from "constants/path";

import yaml from "js-yaml";
import { getAllFileContentsInDir, getFileContent } from "lib/files";
import fs from "fs";

import type {
  KnowledgeSubject,
  KnowledgeResource,
  KnowledgeMetadata,
} from "types";
import { getOrInitResourceLikes } from "lib/firestore";

type KnowledgeSubjectRaw = {
  name: string;
  description?: string;
  resources: string[];
  children: string[];
};

export async function getKnowledgeTree(
  knowledgeDir: string
): Promise<KnowledgeSubject> {
  const knowledgeDirPath = KNOWLEDGE_PATH + knowledgeDir + "/";
  const knowledgeFileName = ROOT_KNOWLEDGE_FILENAME;

  const allKnowledgeYAMLContents = getAllFileContentsInDir(knowledgeDirPath);
  const allResourceYAMLContents = getAllFileContentsInDir(
    KNOWLEDGE_RESOURCE_PATH
  );
  if (!allKnowledgeYAMLContents.has(knowledgeFileName)) {
    throw new Error(`knowledge ${knowledgeFileName} does not exist`);
  }

  const createTreeNode = async (
    node: KnowledgeSubjectRaw
  ): Promise<KnowledgeSubject> => {
    const childrenFileNames = node.children;
    const childrenPromises =
      childrenFileNames?.map(
        async (file: string): Promise<KnowledgeSubject> => {
          if (allKnowledgeYAMLContents.has(file)) {
            return await createTreeNode(
              yaml.safeLoad(allKnowledgeYAMLContents.get(file))
            );
          }
          throw new Error(`knowledge ${file} does not exist`);
        }
      ) || [];
    const children = await Promise.all(childrenPromises);

    const resourceFileNames = node.resources;
    const resourcesPromises =
      resourceFileNames?.map(
        async (file: string): Promise<KnowledgeResource> => {
          if (allResourceYAMLContents.has(file)) {
            const resource = yaml.safeLoad(allResourceYAMLContents.get(file));
            const likes = await getOrInitResourceLikes(resource.name);
            return {
              name: resource.name,
              link: resource.link,
              type: resource.type,
              length: resource.length,
              likes,
              liked: false,
            };
          }
          throw new Error(`resource ${file} does not exist`);
        }
      ) || [];
    const resources = await Promise.all(resourcesPromises);

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
  return await createTreeNode(root);
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
