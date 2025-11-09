import {
  ArrowRightStartOnRectangleIcon,
  Cog8ToothIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import { Avatar } from "@/design_system/avatar.tsx";
import {
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from "@/design_system/dropdown.tsx";

import { Dropdown } from "@/design_system/dropdown.tsx";
import {
  Navbar,
  NavbarItem,
  NavbarSpacer,
  NavbarSection,
} from "@/design_system/navbar.tsx";

import { Input, InputGroup } from "@/design_system/input.tsx";

function NavigationBar() {
  return (
    <Navbar>
      <NavbarSection>
        <Dropdown>
          <DropdownButton as={NavbarItem}>
            <Avatar
              src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"
              square
              className="size-full"
            />
          </DropdownButton>
          <DropdownMenu className="min-w-64" anchor="bottom end">
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
            <DropdownItem href="/logout">
              <ArrowRightStartOnRectangleIcon />
              <DropdownLabel>Sign out</DropdownLabel>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarSection>
      <NavbarSpacer />
      <NavbarSection>
        <InputGroup className="w-full">
          <Input
            className=""
            name="search"
            placeholder="Where to?"
            aria-label="Where to?"
          />
        </InputGroup>
      </NavbarSection>
      <NavbarSpacer className="ml-0.5" />
    </Navbar>
  );
}

export default NavigationBar;
