import { type NextPage } from "next";
import { trpc } from "~/utils/trpc";
import { Form } from "~/components/new-page-form";
import { PageItem } from "~/components/page-item";

const Home: NextPage = () => {
  const { data: pages } = trpc.page.getAll.useQuery();

  if (!pages) {
    return <div>Loading...</div>;
  }

  return (
    <main className="container mx-auto">
      <h1 className="text-4xl font-bold">Pages</h1>
      <table className="table-auto mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Read?</th>
            <th className="px-4 py-2">URL</th>
            <th className="px-4 py-2">Created At</th>
            <th className="px-4 py-2">Read At</th>
            <th className="px-4 py-2">Image Id</th>
          </tr>
        </thead>
        <tbody>
          {pages.map((page) => (
            <PageItem key={page.id} page={page} />
          ))}
        </tbody>
      </table>
      <Form />
    </main>
  );
};

export default Home;
