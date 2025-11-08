import { useEffect } from "react";

import { useNavigate, createLazyFileRoute } from "@tanstack/react-router";

import { useAuth0 } from "@auth0/auth0-react";
import { Input, InputGroup } from "@/design_system/input.tsx";
import { Button } from "@/design_system/button.tsx";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export const Route = createLazyFileRoute("/" as never)({
  component: Index,
});

function Index() {
  const navigate = useNavigate();

  const { isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      const originalUrl = localStorage.getItem("redirect_after_login");
      if (originalUrl) {
        localStorage.removeItem("redirect_after_login");
        navigate({
          to: originalUrl,
        });
      }
    }
  }, [isAuthenticated, isLoading]);

  return (
    <div>
      <MapContainer
        className="absolute top-16 left-0 bottom-0 right-0 z-0"
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>

      <div className="absolute top-4 left-1/2 -translate-x-1/2 max-lg:hidden z-1">
        <InputGroup>
          <Input type="text" placeholder="Where to?" />
        </InputGroup>
      </div>

      <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-1">
        <Button
          className="rounded-full p-5 aspect-square overflow-hidden"
          onClick={() => navigate({ to: "/route_overview" })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
        </Button>
        <Button
          className="rounded-full p-5 aspect-square overflow-hidden"
          onClick={() => navigate({ to: "/reporting" })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#bc4e00"
            className="size-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
}
