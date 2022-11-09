import { useState } from "react";
import { trpc } from "~/utils/trpc";
import { CheckCircleIcon, PencilSquareIcon } from "~/components/icons";
import { type Page } from "~/types/page";

type PageItemProps = {
  page: Page;
};
export const Url = ({ page }: PageItemProps) => {
  const trpcContext = trpc.useContext();
  const [isEditing, setIsEditing] = useState(false);
  const [url, setUrl] = useState(page.url);

  const { mutate: mutateUpdate, isLoading: isLoadingUpdate } =
    trpc.page.update.useMutation({
      onSuccess: () => trpcContext.page.invalidate(),
    });

  const handleToggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleUpdate = () => {
    if (url.length > 0) {
      mutateUpdate({ id: page.id, url });
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className="flex flex-row justify-between gap-8">
        <input
          className="flex-1 border rounded px-2 py-1"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.currentTarget.value)}
          name="url"
          disabled={isLoadingUpdate}
        />
        <button
          type="submit"
          className="text-gray-500 hover:text-gray-700 disabled:hover:text-gray-500 disabled:opacity-50"
          disabled={url.length === 0}
          onClick={handleUpdate}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleUpdate();
            }
          }}
        >
          <CheckCircleIcon className="w-6 h-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-row justify-between gap-8">
      <span className="flex-1 rounded px-2 py-1">{page.url}</span>
      <button
        type="button"
        onClick={handleToggleEdit}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleToggleEdit();
          }
        }}
      >
        <PencilSquareIcon className="text-gray-500 w-6 h-6 hover:text-gray-700" />
      </button>
    </div>
  );
};
