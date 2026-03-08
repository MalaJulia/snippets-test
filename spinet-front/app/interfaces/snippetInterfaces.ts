export type SnippetType = "link" | "note" | "command";

export interface Snippet {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  type: SnippetType;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSnippet {
  title: string;
  content: string;
  tags: string[];
  type: SnippetType;
}

export interface UpdateSnippet {
  title: string;
  content: string;
  tags: string[];
  type: SnippetType;
}