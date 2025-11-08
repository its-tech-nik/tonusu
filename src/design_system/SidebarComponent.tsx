import {
  Cog8ToothIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  ChevronUpIcon,
  UserIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/16/solid";
import { Avatar } from "@/design_system/avatar.tsx";
import {
  Dropdown,
  DropdownButton,
  DropdownMenu,
  DropdownItem,
  DropdownLabel,
  DropdownDivider,
} from "@/design_system/dropdown.tsx";
import {
  Sidebar,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarBody,
  SidebarSpacer,
  SidebarFooter,
  SidebarHeading,
} from "@/design_system/sidebar.tsx";

import { Input, InputGroup } from "@/design_system/input.tsx";
import { useLiveQuery } from "dexie-react-hooks";
import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import { useRouter } from "@tanstack/react-router";
import { useAuth0 } from "@auth0/auth0-react";

function SideBar() {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } =
    useAuth0();

  const [search, setSearch] = useState("");

  const router = useRouter();

  return (
    <Sidebar className="w-64">
      <SidebarHeader className="gap-3">
        <SidebarItem href="/">
          <Avatar src="https://catalyst.tailwindui.com/tailwind-logo.svg" />
          <SidebarLabel>Homer</SidebarLabel>
        </SidebarItem>

        <SidebarSection className="max-lg:hidden">
          <InputGroup>
            <MagnifyingGlassIcon />
            <Input
              name="search"
              placeholder="Αναζήτηση&hellip;"
              aria-label="Αναζήτηση"
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </SidebarSection>
      </SidebarHeader>

      <SidebarBody>
        <SidebarSpacer />

        <SidebarSection>
          <SidebarItem href="/support">
            <QuestionMarkCircleIcon />
            <SidebarLabel>Υποστήριξη</SidebarLabel>
          </SidebarItem>
        </SidebarSection>
      </SidebarBody>

      <SidebarFooter className="max-lg:hidden">
        <Dropdown>
          {isLoading ? (
            "Loading user..."
          ) : (
            <DropdownButton as={SidebarItem}>
              <span className="flex min-w-0 items-center gap-3">
                <Avatar
                  src={
                    (isAuthenticated && user && user.picture) ||
                    "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"
                  }
                  className="size-10"
                  square
                  alt=""
                />
                <span className="min-w-0">
                  <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                    {(isAuthenticated && user && user.name) || "Guest"}
                  </span>
                  <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                    {(isAuthenticated && user && user.email) ||
                      "guest@example.com"}
                  </span>
                </span>
              </span>
              <ChevronUpIcon />
            </DropdownButton>
          )}
          <DropdownMenu className="min-w-64" anchor="top start">
            <DropdownItem href="/my-profile">
              <UserIcon />
              <DropdownLabel>My profile</DropdownLabel>
            </DropdownItem>
            <DropdownItem href="/settings">
              <Cog8ToothIcon />
              <DropdownLabel>Settings</DropdownLabel>
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem href="/privacy-policy">
              <ShieldCheckIcon />
              <DropdownLabel>Privacy policy</DropdownLabel>
            </DropdownItem>
            <DropdownItem href="/share-feedback">
              <LightBulbIcon />
              <DropdownLabel>Share feedback</DropdownLabel>
            </DropdownItem>
            <DropdownDivider />
            {isAuthenticated && (
              <DropdownItem
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                <ArrowRightStartOnRectangleIcon />
                <DropdownLabel>Αποσυνδεθείτε</DropdownLabel>
              </DropdownItem>
            )}
            {!isAuthenticated && (
              <DropdownItem onClick={() => loginWithRedirect()}>
                <ArrowRightStartOnRectangleIcon />
                <DropdownLabel>Συνδεθείτε</DropdownLabel>
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
      </SidebarFooter>
    </Sidebar>
  );
}

export default SideBar;
