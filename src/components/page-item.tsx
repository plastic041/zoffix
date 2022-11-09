import dayjs from "dayjs";
import { type Page } from "~/types/page";
import { trpc } from "~/utils/trpc";
import { Url } from "./page-item/url";

type PageItemProps = {
  page: Page;
};
export const PageItem = ({ page }: PageItemProps) => {
  const trpcContext = trpc.useContext();

  const { mutate: mutateToggle, isLoading: isLoadingToggle } =
    trpc.page.toggleRead.useMutation({
      onSuccess: () => trpcContext.page.invalidate(),
    });

  const handleToggleRead = () => {
    mutateToggle({ id: page.id });
  };

  const createdAt = dayjs(page.created_at).format("YYYY-MM-DD HH:mm:ss");
  const readAt =
    page.read_at === null
      ? "-"
      : dayjs(page.read_at).format("YYYY-MM-DD HH:mm:ss");

  return (
    <tr key={page.id}>
      <td className="border px-4 py-2">
        <div className="flex justify-center items-center">
          {isLoadingToggle ? (
            <svg
              className="animate-spin h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v1a7 7 0 00-7 7h1z"
              />
            </svg>
          ) : (
            <input
              type="checkbox"
              checked={page.read_at !== null}
              onChange={handleToggleRead}
            />
          )}
        </div>
      </td>
      <td className="border px-4 py-2">
        <Url page={page} />
      </td>
      <td className="border px-4 py-2 tabular-nums">{createdAt}</td>
      <td className="border px-4 py-2 tabular-nums">{readAt}</td>
    </tr>
  );
};
