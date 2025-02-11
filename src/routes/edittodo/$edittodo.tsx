import {
  createFileRoute,
  useLoaderData,
  useSearch,
} from "@tanstack/react-router";

export const Route = createFileRoute("/edittodo/$edittodo")({
  component: EditTask,
  loader: async ({ params }) => {
    return {
      edittodo: params.edittodo,
    };
  },
});

function EditTask() {
  //   const { description, isComplete } = Route.useSearch();
  const { edittodo } = Route.useLoaderData();
  return <div>Hello {edittodo}</div>;
}
