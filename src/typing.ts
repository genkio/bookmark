export interface IStorageData {
  bookmarks: IBookmark[];
  isCreate: boolean;
}
export interface IBookmark {
  author: string;
  group: string;
  id: string; // post slug
  title: string;
  url: string;
}

export interface IMessage {
  bookmark: IBookmark;
  isCreate: IStorageData["isCreate"];
}
