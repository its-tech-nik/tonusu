import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/route_overview")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/route_overview"!</div>;
}
