import dayjs from "dayjs";
import { type Page } from "~/types/page";
import { Url } from "./page-item/url";
import { Read } from "./page-item/read";

type PageItemProps = {
  page: Page;
};
export const PageItem = ({ page }: PageItemProps) => {
  const createdAt = dayjs(page.created_at).format("YYYY-MM-DD HH:mm");
  const readAt =
    page.read_at === null
      ? "-"
      : dayjs(page.read_at).format("YYYY-MM-DD HH:mm");
  const imgSrc = `https://ucarecdn.com/${page.image_id}/-/scale_crop/1000x1000/smart/-/preview/-/quality/smart/-/format/auto/`;

  return (
    <tr key={page.id}>
      <td className="border px-4 py-2">
        <Read page={page} />
      </td>
      <td className="border px-4 py-2">
        <Url page={page} />
      </td>
      <td className="border px-4 py-2 tabular-nums">{createdAt}</td>
      <td className="border px-4 py-2 tabular-nums">{readAt}</td>
      <td className="border px-4 py-2 font-mono text-xs">
        <img src={imgSrc} alt={page.url} width="30" height="30" />
        <a href={imgSrc} target="_blank" rel="noreferrer">
          {page.image_id}
        </a>
      </td>
    </tr>
  );
};
