import { useMemo, useState, type ComponentType, useEffect } from "react";

import { useNavigate, createLazyFileRoute } from "@tanstack/react-router";

import { Button } from "@/design_system/button.tsx";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { InputGroup } from "@/design_system/input.tsx";
import { Input } from "@/design_system/input.tsx";
import axios from "axios";

export const Route = createLazyFileRoute("/" as never)({
  component: Index,
});

function Index() {
  const navigate = useNavigate();

  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const mapCenter = [37.9747, 23.7273] as const;
  const LeafletMapContainer = MapContainer as unknown as ComponentType<any>;
  const LeafletTileLayer = TileLayer as unknown as ComponentType<any>;

  const actionMenuItems = useMemo(
    () =>
      [
        {
          id: "route-overview",
          icon: "🌪️",
          onSelect: () => {
            navigate({ to: "/route_overview" });
            setIsActionMenuOpen(false);
          },
          lowContrast: false,
        },
        {
          id: "death-reporting",
          icon: "🛡️",
          onSelect: () => {
            navigate({ to: "/death_reporting" });
            setIsActionMenuOpen(false);
          },
          lowContrast: false,
        },
        {
          id: "loss-theft",
          icon: "♿",
          onSelect: () => {
            setIsActionMenuOpen(false);
          },
          lowContrast: true,
        },
        {
          id: "psychological-discomfort",
          icon: "😨",
          onSelect: () => {
            setIsActionMenuOpen(false);
          },
          lowContrast: true,
        },
      ] satisfies Array<{
        id: string;
        onSelect: () => void;
        icon: string;
        lowContrast: boolean;
      }>,
    [navigate],
  );
  const actionMenuRadius = 160;
  const actionMenuButtonSize = 72;

  useEffect(() => {
    const abortController = new AbortController();

    const handleLoad = async () => {
      if (abortController.signal.aborted) {
        return;
      }

      console.log("loaded");

      const startFrom = "37.984921656802506, 23.761350135880402";
      const endTo = "37.95084445458045, 23.72500516775307";

      const response = await axios.get("http://localhost:8000/fetch_data.php", {
        params: {
          start: startFrom,
          end: endTo,
        },
        signal: abortController.signal,
      });
      const data = response.data;

      console.log(data);
    };

    if (document.readyState === "complete") {
      void handleLoad();
    } else {
      window.addEventListener("load", handleLoad, {
        signal: abortController.signal,
      });
    }

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div>
      <LeafletMapContainer
        className="absolute top-0 left-0 bottom-0 right-0 z-0"
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={false}
      >
        <LeafletTileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={mapCenter}
          eventHandlers={{
            click: () => navigate({ to: "/route_overview" }),
          }}
        ></Marker>
      </LeafletMapContainer>

      <div className="absolute top-4 left-1/2 -translate-x-1/2 max-lg:hidden z-1">
        <InputGroup className="bg-white/50 backdrop-blur-md rounded-full">
          <Input type="text" placeholder="Where to?" />
        </InputGroup>
      </div>

      <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
        <div
          className="relative"
          style={{
            width: actionMenuButtonSize,
            height: actionMenuButtonSize,
          }}
        >
          {actionMenuItems.map((item, index) => {
            const angle =
              (Math.PI / 2 / (actionMenuItems.length - 1 || 1)) * index;
            const offsetX = Math.cos(angle) * actionMenuRadius;
            const offsetY = Math.sin(angle) * actionMenuRadius;
            const iconContent = item.lowContrast ? (
              <span className="text-3xl leading-none text-slate-800 dark:text-slate-100">
                {item.icon}
              </span>
            ) : (
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/70 text-3xl leading-none text-slate-800 shadow-[0_12px_24px_rgba(15,23,42,0.18)] ring-1 ring-white/60 backdrop-blur-sm transition-[background,box-shadow] duration-200 dark:bg-slate-900/65 dark:text-slate-100 dark:shadow-[0_12px_24px_rgba(2,6,23,0.55)] dark:ring-slate-100/15">
                {item.icon}
              </span>
            );

            return (
              <Button
                outline
                key={item.id}
                className="transition-transform duration-200 ease-out"
                onClick={item.onSelect}
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: actionMenuButtonSize,
                  height: actionMenuButtonSize,
                  transform: isActionMenuOpen
                    ? `translate(-${offsetX}px, -${offsetY}px)`
                    : "translate(0px, 0px)",
                  opacity: isActionMenuOpen ? 1 : 0,
                  pointerEvents: isActionMenuOpen ? "auto" : "none",
                  transition:
                    "transform 180ms ease, opacity 150ms ease, box-shadow 150ms ease",
                }}
              >
                {iconContent}
              </Button>
            );
          })}

          <Button
            className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-white/80 text-slate-900 shadow-[0_18px_30px_rgba(15,23,42,0.18)] ring-1 ring-white/50 backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white dark:bg-slate-900/70 dark:text-slate-100 dark:shadow-[0_18px_30px_rgba(2,6,23,0.55)] dark:ring-slate-100/15 dark:hover:bg-slate-900/80"
            onClick={() => setIsActionMenuOpen((prev) => !prev)}
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#bc4e00"
              className="size-10 transition-transform duration-200 ease-out"
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
    </div>
  );
}
