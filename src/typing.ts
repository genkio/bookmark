export interface IStorageData {
  bookmarks: Bookmark[];
  isCreate: boolean;
}

export type SearchType = Extract<keyof IBookmark, "content" | "tags" | "title">;

export interface IBookmark {
  content?: string;
  id: string; // post slug or comment id
  tags: string[];
  title: string;
  url: string;
}
export interface IPost extends IBookmark {
  author: string;
  type: "post";
}

export interface IComment extends IBookmark {
  type: "comment";
}

export type Bookmark = IPost | IComment;

export function isPost(v: any): v is IPost {
  return v?.type === "post";
}

export function isComment(v: any): v is IComment {
  return v?.type === "comment";
}

export interface IMessage {
  bookmark: Bookmark;
  isCreate: IStorageData["isCreate"];
}

export interface ISelectOption<T = string> {
  keywords?: string;
  label: string;
  value: T;
}
