import { createFileRoute, useSearch } from "@tanstack/react-router";

export const Route = createFileRoute("/edittodo/$edittodo")({
  component: RouteComponent,
});

function RouteComponent() {
  //   const { description, isComplete } = Route.useSearch();
  return <div>Hello "/edittodo/$edittodo"!</div>;
}
