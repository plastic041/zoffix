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
    </tr>
  );
};
