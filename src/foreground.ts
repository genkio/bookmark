import "arrive";
import { browser } from "webextension-polyfill-ts";
import { IBookmark, IComment, IMessage, IPost } from "./typing";

const icon = `
  <svg width="22px" height="22px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#4B6681" fill-rule="nonzero">
    <path d="M3.98623482,1.03351671e-15 L19.9297166,1.03351671e-15 C22.1310121,1.03351671e-15 23.9154656,1.33563636 23.9154656,2.98327273 L23.9154656,20.4763636 C23.9154656,21.3 23.0234818,21.968 21.9225911,21.968 C21.4236437,21.968 20.9431579,21.828 20.5758704,21.576 L13.3044534,16.5869091 C12.5426721,16.0643636 11.3732794,16.0643636 10.6110121,16.5869091 L3.33959514,21.576 C2.52825911,22.1327273 1.26753036,22.0916364 0.523724696,21.4843636 C0.186834353,21.2092286 -3.30877448e-05,20.8495695 0,20.4763636 L0,2.98327273 C0.00048582996,1.33563636 1.78493927,0 3.98623482,1.03351671e-15 Z"></path>
  </svg>
`;

const bookmarkButton = `
  <button
    class="post-page__supplement post-page__supplement--bookmark"
    title="Bookmark a post"
    onmouseover="this.children[0].style.fill='#ffffff'"
    onmouseout="this.children[0].style.fill='#4B6681'"
  >
    ${icon}
  </button>
`;

const bookmarkCommentButton = (i: number) =>
  `<div class="footer__action footer__action--bookmark-${i}">Bookmark</div><div class="footer__separator">·</div>`;

const getBookmarkCommonProps = (
  document: Document,
): Pick<IBookmark, "tags" | "title"> => ({
  tags: document.querySelector(".post-sidebar__group-name > label")?.textContent
    ? [
        document.querySelector(".post-sidebar__group-name > label")
          ?.textContent!,
      ]
    : [],
  title: document.querySelector(".post-page__title")?.textContent!,
});

document.arrive(".post-page__supplement--report", function () {
  const isExist = !!document.querySelector(".post-page__supplement--bookmark");
  if (isExist) return;

  // 'this' refers to the newly created element
  this?.insertAdjacentHTML("afterend", bookmarkButton);

  const url = document.location.href;
  const [, id] = url.split("post/");

  const post: IPost = {
    ...getBookmarkCommonProps(document),
    author: document.querySelector(".user-link__name")?.textContent?.trim()!,
    content: document.querySelector(".post-page__body")?.textContent?.trim()!,
    id,
    type: "post",
    url: document.location.href,
  };

  document.querySelector(".post-page__supplement--bookmark")?.addEventListener(
    "click",
    async function () {
      await browser.runtime.sendMessage({
        bookmark: post,
        isCreate: true,
      } as IMessage);
    },
    false,
  );
});

document.arrive("ol.comment-tree", function () {
  const comments = document.querySelectorAll(".comment__content");
  const links = document.querySelectorAll(
    "a.footer__date",
  ) as NodeListOf<HTMLAnchorElement>;

  // FIXME performance issue
  if (comments.length >= 100) return;

  Array.from(document.querySelectorAll(".footer__action--reply")).map(
    (el, i) => {
      const className = `.footer__action--bookmark-${i}`;

      const isExist = !!document.querySelector(className);
      if (isExist) return;

      el.insertAdjacentHTML("beforebegin", bookmarkCommentButton(i));

      const url = links[i].href;
      const [, id] = url.split("commentId=");

      const comment: IComment = {
        ...getBookmarkCommonProps(document),
        content: comments[i].textContent?.trim()!,
        id,
        type: "comment",
        url: links[i].href,
      };

      document.querySelector(className)?.addEventListener(
        "click",
        async function () {
          await browser.runtime.sendMessage({
            bookmark: comment,
            isCreate: true,
          } as IMessage);
        },
        false,
      );
    },
  );
});

/**
 * To retrieve comment content and anchor manually
 *
// .footer__separator -> .footer__action--collapse -> .footer__separator -> comment anchor
const commentAnchor = document.querySelectorAll(className)[0]
  .previousElementSibling?.previousElementSibling?.previousElementSibling
  ?.previousElementSibling as HTMLAnchorElement;
const url = commentAnchor.href;

// .comment__footer -> .comment__main -> .comment__content
const content = document.querySelectorAll(className)[0].parentElement
  ?.parentElement?.children[0].textContent;
 */
