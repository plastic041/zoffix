import { trpc } from "~/utils/trpc";
import { UploadClient } from "@uploadcare/upload-client";
import { useId, useState, type FormEvent } from "react";

const client = new UploadClient({
  publicKey: process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY as string,
});

export const Form = () => {
  const urlId = useId();
  const imageId = useId();
  const context = trpc.useContext();
  const { mutate } = trpc.page.create.useMutation({
    onSuccess: () => context.page.invalidate(),
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const url = formData.get("url") as string;
    const image = formData.get("image") as File;
    console.log(image);

    if (!(url && image)) {
      return;
    }

    const { uuid } = await client.uploadFile(image);

    mutate({ url, image_id: uuid });

    setIsLoading(false);
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 flex-1">
        <div className="flex gap-4 flex-1">
          <div className="flex flex-col flex-1">
            <label
              className="text-gray-700 text-sm font-bold mb-2"
              htmlFor={urlId}
            >
              URL
            </label>
            <input
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              type="text"
              id={urlId}
              name="url"
            />
          </div>
          <div className="flex flex-col flex-1">
            <label
              className="text-gray-700 text-sm font-bold mb-2"
              htmlFor={imageId}
            >
              IMAGE
            </label>
            <input
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              type="file"
              accept="image/*"
              id={imageId}
              name="image"
            />
          </div>
        </div>
        <div className="flex gap-2 self-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:hover:bg-blue-500"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
};
