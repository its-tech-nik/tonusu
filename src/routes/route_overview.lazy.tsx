import { createLazyFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";

export const Route = createLazyFileRoute("/route_overview")({
  component: RouteComponent,
});

function clampPercent(value: number) {
  return Math.min(Math.max(value, 0), 100);
}

type ScoreMeterProps = {
  id: string;
  label: string;
  value: number;
  gradientClassName: string;
  tone?: "default" | "muted";
};

function ScoreMeter({
  id,
  label,
  value,
  gradientClassName,
  tone = "default",
}: ScoreMeterProps) {
  const clampedValue = clampPercent(value);

  return (
    <section aria-labelledby={`${id}-label`} className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <h2
          id={`${id}-label`}
          className="text-lg font-semibold text-slate-900 dark:text-slate-100"
        >
          {label}
        </h2>
        <span
          aria-live="polite"
          className="text-sm font-medium text-slate-500 dark:text-slate-400"
        >
          {clampedValue}%
        </span>
      </div>
      <div
        className={`relative h-6 w-full overflow-hidden rounded-full ring-1 transition-colors duration-200 ${
          tone === "muted"
            ? "ring-slate-200/80 dark:ring-slate-700/70"
            : "ring-slate-200/60 dark:ring-slate-600/60"
        } ${gradientClassName}`}
      >
        <div
          className="absolute inset-y-0 right-0 bg-slate-200/80 transition-colors duration-200 dark:bg-slate-800/80"
          style={{ left: `${clampedValue}%` }}
        />
      </div>
    </section>
  );
}

function RouteComponent() {
  const safetyScorePercent = 90;
  const aqiScorePercent = 40;
  const popularityPercent = 65;
  const crowdPercent = 50;
  // TODO: get the user's location and convert to a city name
  const weatherQueryLocation = "Athens, GR";
  const {
    data: weatherData,
    isPending: isWeatherPending,
    error: weatherError,
  } = useQuery({
    queryKey: ["weather", weatherQueryLocation],
    queryFn: async () => {
      const apiKey = "b1b15e88fa797225412429c1c50c122a1";
      const url = new URL("https://api.openweathermap.org/data/2.5/weather");
      url.searchParams.set("q", weatherQueryLocation);
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
  const weatherIcon = weatherData?.weather?.[0]?.icon;
  const weatherDescription = weatherData?.weather?.[0]?.description;
  const weatherIconUrl = weatherIcon
    ? `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`
    : undefined;
  const metrics: Array<ScoreMeterProps> = [
    {
      id: "safety-score",
      label: "Safety Score",
      value: safetyScorePercent,
      gradientClassName:
        "bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-500 dark:from-rose-400 dark:via-amber-300 dark:to-emerald-400",
    },
    {
      id: "aqi",
      label: "AQI",
      value: aqiScorePercent,
      gradientClassName:
        "bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-500 dark:from-rose-400 dark:via-amber-300 dark:to-emerald-400",
    },
    {
      id: "popularity",
      label: "Popularity",
      value: popularityPercent,
      gradientClassName:
        "bg-gradient-to-r from-amber-400 via-emerald-400 to-indigo-500 dark:from-amber-300 dark:via-emerald-300 dark:to-indigo-400",
    },
    {
      id: "crowd",
      label: "Crowd",
      value: crowdPercent,
      gradientClassName:
        "bg-gradient-to-r from-amber-400 via-emerald-400 to-indigo-500 dark:from-amber-300 dark:via-emerald-300 dark:to-indigo-400",
      tone: "muted",
    },
  ];

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
    <div className="relative min-h-[100vh] pb-28 text-slate-900 dark:text-slate-100">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-10 lg:px-0">
        <div className="space-y-8">
          {metrics.map((metric) => (
            <ScoreMeter key={metric.id} {...metric} />
          ))}
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Weather
          </h2>
          {isWeatherPending && (
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Loading weather...
            </p>
          )}
          {weatherError instanceof Error && (
            <p
              role="alert"
              className="rounded-md border border-red-500/40 bg-red-100/60 p-3 text-sm text-red-700 dark:border-red-400/40 dark:bg-red-500/10 dark:text-red-300"
            >
              Failed to load weather: {weatherError.message}
            </p>
          )}
          <div>
            {!isWeatherPending && !weatherError && weatherData && (
              <div className="flex flex-row gap-6 rounded-xl border border-slate-200/80 bg-white/60 p-4 shadow-sm transition-colors duration-200 dark:border-slate-700/60 dark:bg-slate-900/60">
                {weatherIconUrl && (
                  <img
                    src={weatherIconUrl}
                    alt={weatherDescription ?? "Weather icon"}
                    width={100}
                    height={100}
                    className="h-24 w-24 shrink-0 rounded-lg bg-white/70 object-contain p-2 shadow-sm dark:bg-slate-800/70"
                  />
                )}
                <div className="space-y-1 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  <p>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      Conditions:
                    </span>{" "}
                    {weatherDescription ?? "Unknown"}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      Temperature:
                    </span>{" "}
                    {weatherData.main.temp.toFixed(1)}°C
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      Feels like:
                    </span>{" "}
                    {weatherData.main.feels_like.toFixed(1)}°C
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      Humidity:
                    </span>{" "}
                    {weatherData.main.humidity}%
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      Wind speed:
                    </span>{" "}
                    {weatherData.wind.speed} m/s
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Notes
          </h2>
          <ul className="list-disc space-y-2 pl-6 text-sm leading-6 text-slate-700 dark:text-slate-300">
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
              Stay for sunset; the west-facing overlook glows and crowds thin
              out.
            </li>
            <li>
              If it rains, the covered market two blocks east is a great backup.
            </li>
          </ul>
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 mx-auto max-w-[640px] px-4 pb-6 pt-4 bg-transparent backdrop-blur-[18px] [box-shadow:0_-10px_30px_rgba(15,23,42,0.12)] lg:inset-auto lg:bottom-6 lg:right-6 lg:left-auto lg:max-w-none lg:px-0 lg:py-0 lg:bg-transparent lg:[box-shadow:none]">
        <div className="flex gap-3 justify-between lg:flex-col">
          {bottomActionButtons.map(({ id, label, icon }) => (
            <button
              key={id}
              type="button"
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-300/40 bg-white/75 px-4 py-3 text-[15px] font-semibold text-slate-900 backdrop-blur-md shadow-[0_12px_24px_rgba(15,23,42,0.18),0_2px_8px_rgba(15,23,42,0.1)] transition-all duration-150 hover:-translate-y-1 hover:bg-white/85 hover:shadow-[0_16px_32px_rgba(15,23,42,0.22),0_6px_14px_rgba(15,23,42,0.12)] dark:border-slate-700/60 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:bg-slate-900/80 dark:shadow-[0_12px_24px_rgba(2,6,23,0.55),0_2px_8px_rgba(15,23,42,0.45)] lg:flex-none"
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
