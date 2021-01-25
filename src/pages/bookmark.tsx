import { IonButton, IonIcon, IonList } from "@ionic/react";
import { save } from "ionicons/icons";
import React from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { Storage } from "../common/storage";
import { Input } from "../components/input";
import { ListHeader } from "../components/list-header";
import { PageWrapper } from "../components/page-wrapper";
import { TagSelect } from "../components/tag-select";
import { Textarea } from "../components/textarea";
import { useData } from "../hooks";
import { IBookmark } from "../typing";

type Props = RouteComponentProps<{ id?: string }>;

export const BookmarkPage: React.FC<Props> = ({
  match: {
    params: { id },
  },
}) => {
  const history = useHistory();
  const { getBookmark, updateBookmark } = useData();

  const [bookmark, setBookmark] = React.useState<IBookmark | null>(null);

  React.useEffect(() => {
    if (!id) return;
    setBookmark(getBookmark(id));

    Storage.removeData("isCreate");
  }, [id]);

  const handleChange = ({
    currentTarget: { name, value },
  }: React.FormEvent<HTMLIonInputElement>) => {
    if (!value) return;

    setBookmark({
      ...bookmark,
      [name]: value.toString(),
    } as IBookmark);
  };

  const handleSubmit = () => {
    if (bookmark) updateBookmark(bookmark);
    history.push("/");
  };

  const post = bookmark && (
    <IonList>
      <ListHeader title="Post" />
      <Input onChange={handleChange} prop="author" value={bookmark?.author} />
      <Input onChange={handleChange} prop="group" value={bookmark?.group} />
      <Textarea
        onChange={(title) => setBookmark({ ...bookmark, title })}
        rows={2}
        title="Title"
        value={bookmark?.title}
      />
    </IonList>
  );

  const tags = bookmark && (
    <React.Fragment>
      <ListHeader title="Tags" />
      <TagSelect
        onChange={(tags) => setBookmark({ ...bookmark, tags })}
        tags={bookmark.tags}
      />
    </React.Fragment>
  );

  const action = (
    <IonButton expand="block" fill="clear" onClick={handleSubmit} size="large">
      <IonIcon color="dark" icon={save} />
    </IonButton>
  );

  return (
    <PageWrapper action={action} title="Save bookmark">
      {post}
      {tags}
    </PageWrapper>
  );
};
