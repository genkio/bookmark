import { IonButton, IonIcon, IonList } from "@ionic/react";
import { save } from "ionicons/icons";
import React from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { Storage } from "../common/storage";
import { ActivationAlert } from "../components/activation-alert";
import { Input } from "../components/input";
import { ListHeader } from "../components/list-header";
import { PageWrapper } from "../components/page-wrapper";
import { TagSelect } from "../components/tag-select";
import { Textarea } from "../components/textarea";
import { useData } from "../hooks";
import { Bookmark } from "../typing";

type Props = RouteComponentProps<{ id?: string }>;

export const BookmarkPage: React.FC<Props> = ({
  match: {
    params: { id },
  },
}) => {
  const history = useHistory();
  const { getBookmark, updateBookmark } = useData();

  const [bookmark, setBookmark] = React.useState<Bookmark | null>(null);

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
    } as Bookmark);
  };

  const handleSubmit = () => {
    if (bookmark) updateBookmark(bookmark);
    history.push("/");
  };

  const post = bookmark && (
    <IonList>
      <ListHeader title={bookmark.type} />
      <React.Fragment>
        <Input onChange={handleChange} prop="author" value={bookmark.author} />
      </React.Fragment>

      <Textarea
        onChange={(title) => setBookmark({ ...bookmark, title })}
        title="Title"
        value={bookmark.title}
      />
      {bookmark.content && (
        <Textarea
          onChange={(content) => setBookmark({ ...bookmark, content })}
          title="Content"
          value={bookmark.content}
        />
      )}
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

  const notes = bookmark && (
    <React.Fragment>
      <ListHeader title="Notes" />
      <Textarea
        onChange={(notes) => setBookmark({ ...bookmark, notes })}
        title="Notes"
        value={bookmark.notes ?? ""}
      />
    </React.Fragment>
  );

  const action = (
    <IonButton expand="block" fill="clear" onClick={handleSubmit} size="large">
      <IonIcon color="dark" icon={save} />
    </IonButton>
  );

  return (
    <PageWrapper action={action} showSearch={false} title="Save">
      <ActivationAlert />
      {notes}
      {tags}
      {post}
    </PageWrapper>
  );
};
