export interface IStorageData {
  bookmarks: Bookmark[];
  isCreate: boolean;
  isDark: boolean;
  lastActivationReqTs: number;
  licenseKey: string;
  options: IOptions;
}

export interface IOptions {
  comment: {
    enabled: boolean;
    limit: number;
  };
  post: {
    enabled: boolean;
  };
}

export type SearchType = Extract<
  keyof IBookmark,
  "author" | "content" | "notes" | "tags" | "title"
>;

export interface IBookmark {
  author: string;
  content?: string;
  id: string;
  notes?: string;
  tags: string[];
  title: string;
  url: string;
}
export interface IPost extends IBookmark {
  type: "post";
}

export interface IComment extends IBookmark {
  type: "comment";
}

export type Bookmark = IPost | IComment;

export interface IMessage {
  bookmark: Bookmark;
  isCreate: IStorageData["isCreate"];
}

export interface ISelectOption<T = string> {
  keywords?: string;
  label: string;
  value: T;
}
