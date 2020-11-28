export enum ResourceType {
  VIDEO = "video",
  READ = "read",
}

export type KnowledgeResource = {
  name: string;
  link: string;
  type: ResourceType;
};

export type KnowledgeSubject = {
  name: string;
  description: string | null;
  resources: KnowledgeResource[];
  children: KnowledgeSubject[];
};

export type KnowledgeMetadata = {
  name: string;
  description: string | null;
  path: string;
};
