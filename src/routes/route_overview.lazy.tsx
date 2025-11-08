import { createLazyFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";

export const Route = createLazyFileRoute("/route_overview")({
  component: RouteComponent,
});

function RouteComponent() {
  const safetyScorePercent = 90;
  const clampedSafetyScorePercent = Math.min(
    Math.max(safetyScorePercent, 0),
    100,
  );
  const aqiScorePercent = 40;
  const clampedAqiScorePercent = Math.min(Math.max(aqiScorePercent, 0), 100);
  const popularityPercent = 65;
  const clampedPopularityPercent = Math.min(
    Math.max(popularityPercent, 0),
    100,
  );
  const {
    data: londonWeather,
    isPending: isLondonWeatherPending,
    error: londonWeatherError,
  } = useQuery({
    queryKey: ["weather", "Millstreet"],
    queryFn: async () => {
      const apiKey = "b1b15e88fa797225412429c1c50c122a1";
      const url = new URL("https://api.openweathermap.org/data/2.5/weather");
      url.searchParams.set("q", "Millstreet");
      url.searchParams.set("units", "metric");
      if (apiKey) {
        url.searchParams.set("appid", apiKey);
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Weather request failed: ${response.statusText}`);
      }

      return response.json() as Promise<{
        weather: Array<{ description: string; icon: string }>;
        main: { temp: number; feels_like: number; humidity: number };
        wind: { speed: number };
      }>;
    },
    staleTime: 5 * 60 * 1000,
  });
  const londonWeatherIcon = londonWeather?.weather?.[0]?.icon;
  const londonWeatherDescription = londonWeather?.weather?.[0]?.description;
  const londonWeatherIconUrl = londonWeatherIcon
    ? `https://openweathermap.org/img/wn/${londonWeatherIcon}@2x.png`
    : undefined;
  const bottomActionButtons: Array<{
    id: string;
    label: string;
    icon?: ReactNode;
  }> = [
    {
      id: "start-route",
      label: "Start route",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          fill="none"
          width={28}
          height={28}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 12h12.75m0 0-4.5-4.5m4.5 4.5-4.5 4.5"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 7.5v9a2.25 2.25 0 0 1-2.25 2.25H17"
          />
        </svg>
      ),
    },
    {
      id: "bookmark",
      label: "Bookmark",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          fill="none"
          width={28}
          height={28}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 5.25A2.25 2.25 0 0 1 9 3h6a2.25 2.25 0 0 1 2.25 2.25v15.086a.75.75 0 0 1-1.139.632L12 18.45l-4.111 2.518a.75.75 0 0 1-1.139-.632z"
          />
        </svg>
      ),
    },
    {
      id: "share",
      label: "Share",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          fill="none"
          width={28}
          height={28}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v12m0-12 4 4m-4-4-4 4"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.25 14.25v3a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-3"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="relative min-h-[100vh] pb-28">
      <div>
        <h1>Safety Score</h1>
        <div
          style={{
            width: "100%",
            height: "24px",
            borderRadius: "12px",
            background: "linear-gradient(to right, #ff2d2d, #ffc107, #4caf50)",
            position: "relative",
            overflow: "hidden",
            margin: "16px 0",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              left: `${clampedSafetyScorePercent}%`,
              background: "#e5e7eb",
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              borderTopRightRadius: "inherit",
              borderBottomRightRadius: "inherit",
            }}
          >
            {/* Optionally display a value or icon */}
          </div>
        </div>
      </div>
      <div>
        <h1>AQI</h1>
        <div
          style={{
            width: "100%",
            height: "24px",
            borderRadius: "12px",
            background: "linear-gradient(to right, #ff2d2d, #ffc107, #4caf50)",
            position: "relative",
            overflow: "hidden",
            margin: "16px 0",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              left: `${clampedAqiScorePercent}%`,
              background: "#e5e7eb",
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              borderTopRightRadius: "inherit",
              borderBottomRightRadius: "inherit",
            }}
          />
        </div>
      </div>
      <div>
        <h1>Weather</h1>
        {isLondonWeatherPending && <p>Loading weather...</p>}
        {londonWeatherError instanceof Error && (
          <p role="alert">
            Failed to load weather: {londonWeatherError.message}
          </p>
        )}
        <div>
          {!isLondonWeatherPending && !londonWeatherError && londonWeather && (
            <div className="flex flex-row">
              {londonWeatherIconUrl && (
                <img
                  src={londonWeatherIconUrl}
                  alt={londonWeatherDescription ?? "Weather icon"}
                  width={100}
                  height={100}
                  style={{ objectFit: "contain" }}
                />
              )}
              <div>
                <p>Conditions: {londonWeatherDescription ?? "Unknown"}</p>
                <p>Temperature: {londonWeather.main.temp.toFixed(1)}°C</p>
                <p>Feels like: {londonWeather.main.feels_like.toFixed(1)}°C</p>
                <p>Humidity: {londonWeather.main.humidity}%</p>
                <p>Wind speed: {londonWeather.wind.speed} m/s</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        <h1>Popularity</h1>
        <div
          style={{
            width: "100%",
            height: "24px",
            borderRadius: "12px",
            background: "linear-gradient(to right, #f59e0b, #10b981, #6366f1)",
            position: "relative",
            overflow: "hidden",
            margin: "16px 0",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              left: `${clampedPopularityPercent}%`,
              background: "#e5e7eb",
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              borderTopRightRadius: "inherit",
              borderBottomRightRadius: "inherit",
            }}
          />
        </div>
      </div>
      <div>
        <h1>Crowd</h1>
        <div
          style={{
            width: "100%",
            height: "24px",
            borderRadius: "12px",
            background: "linear-gradient(to right, #f59e0b, #10b981, #6366f1)",
            position: "relative",
            overflow: "hidden",
            margin: "16px 0",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              left: `50%`,
              background: "#e5e7eb",
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              borderTopRightRadius: "inherit",
              borderBottomRightRadius: "inherit",
            }}
          />
        </div>
      </div>
      <div>
        <h1>Notes</h1>
        <ul
          style={{ listStyle: "disc", paddingLeft: "1.5rem", lineHeight: 1.6 }}
        >
          <li>
            Arrive early to beat the midday tour buses and snag better photos.
          </li>
          <li>
            Best coffee is at the little café behind the cathedral—cash only.
          </li>
          <li>
            Watch for pickpockets near the fountain when street performers
            gather.
          </li>
          <li>
            Stay for sunset; the west-facing overlook glows and crowds thin out.
          </li>
          <li>
            If it rains, the covered market two blocks east is a great backup.
          </li>
        </ul>
      </div>
      <div className="fixed inset-x-0 bottom-0 mx-auto max-w-[640px] px-4 pb-6 pt-4 bg-transparent backdrop-blur-[18px] [box-shadow:0_-10px_30px_rgba(15,23,42,0.12)] lg:inset-auto lg:bottom-6 lg:right-6 lg:left-auto lg:max-w-none lg:px-0 lg:py-0 lg:bg-transparent lg:[box-shadow:none]">
        <div className="flex gap-3 justify-between lg:flex-col">
          {bottomActionButtons.map(({ id, label, icon }) => (
            <button
              key={id}
              type="button"
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-300/40 bg-white/75 px-4 py-3 text-[15px] font-semibold text-slate-900 backdrop-blur-md shadow-[0_12px_24px_rgba(15,23,42,0.18),0_2px_8px_rgba(15,23,42,0.1)] transition-all duration-150 hover:-translate-y-1 hover:bg-white/85 hover:shadow-[0_16px_32px_rgba(15,23,42,0.22),0_6px_14px_rgba(15,23,42,0.12)] lg:flex-none"
            >
              {icon && (
                <span className="inline-flex items-center justify-center">
                  {icon}
                </span>
              )}
              <span className="text-[15px] font-semibold">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
