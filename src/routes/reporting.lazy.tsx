import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/reporting")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/reporting"!</div>;
}
