import { trpc } from "~/utils/trpc";
import { type FormEvent } from "react";

export const Form = () => {
  const context = trpc.useContext();
  const { mutate } = trpc.page.create.useMutation({
    onSuccess: () => context.page.invalidate(),
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const url = formData.get("url") as string;

    mutate({ url });
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <div className="flex flex-col w-80">
        <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="url">
          URL
        </label>
        <div className="flex gap-2">
          <input
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            type="text"
            id="url"
            name="url"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            type="submit"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
