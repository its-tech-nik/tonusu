import NavigationBar from "@/design_system/NavigationBar.tsx";
import { SidebarLayout } from "@/design_system/sidebar-layout.tsx";
import SideBar from "@/design_system/SidebarComponent.tsx";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <SidebarLayout navbar={<NavigationBar />} sidebar={<SideBar />}>
        <Outlet />
      </SidebarLayout>
      {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-left" />}
    </>
  ),
});
