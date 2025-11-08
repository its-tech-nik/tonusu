import { useState } from "react";

import clsx from "clsx";

import { Button } from "@/design_system/button.tsx";
import {
  CanvasLayer,
  Page,
  Pages,
  TextLayer,
  ColoredHighlightLayer,
  type ColoredHighlight,
  usePdf,
  usePdfJump,
  Thumbnail,
  Thumbnails,
} from "@anaralabs/lector";

export const Test = () => {
  // use this to pass the highlighted text to the other pdf
  const onHighlight = (highlight: ColoredHighlight) => {
    console.log("highlight", highlight);
  };

  const highlights = usePdf((state) => state.coloredHighlights);

  const { jumpToHighlightRects } = usePdfJump();

  const [showIndicatorsOnly, setShowIndicatorsOnly] = useState(true);
  const [showThumbnails, setShowThumbnails] = useState(true);

  const setZoom = usePdf((state) => state.updateZoom);

  return (
    <div className="size-full relative flex flex-row">
      <div
        className={clsx("z-1 w-full transition-all duration-200", {
          "pl-40 !w-[calc(100% - 10rem)]": showThumbnails,
        })}
      >
        <Pages>
          <Page>
            <CanvasLayer />
            <TextLayer />
            <ColoredHighlightLayer onHighlight={onHighlight} />
          </Page>
        </Pages>
      </div>
      <div
        className={clsx(
          "z-10 transition-all duration-200 w-0 h-full overflow-x-hidden bg-neutral-800 absolute top-0 left-0",
          {
            "!w-40": showThumbnails,
          },
        )}
      >
        <Thumbnails className="flex flex-col gap-4 p-4">
          <Thumbnail className="cursor-pointer w-32 rounded blur-[0.5px]" />
        </Thumbnails>
      </div>
      <div className="z-20 absolute top-0 left-0 w-full h-13 hover:[&>*]:h-13">
        <div className="h-0 overflow-hidden bg-neutral-900/90 transition-all duration-100 px-2 flex items-center relative">
          <div
            className={clsx(
              "transition-all duration-200 size-full absolute flex items-center justify-center gap-5",
              {
                "pl-40": showThumbnails,
              },
            )}
          >
            <Button
              onClick={() => setZoom((zoom) => Number((zoom - 0.2).toFixed(1)))}
            >
              -
            </Button>
            <Button
              onClick={() => setZoom((zoom) => Number((zoom + 0.2).toFixed(1)))}
            >
              +
            </Button>
          </div>
          <div className="w-full flex flex-row justify-between">
            <Button
              onClick={() => setShowThumbnails(!showThumbnails)}
              className="cursor-pointer"
            >
              {showThumbnails
                ? "Εμφάνιση Μικρογραφιών"
                : "Απόκρυψη Μικρογραφιών"}
            </Button>
            <Button
              className="cursor-pointer"
              onClick={() => setShowIndicatorsOnly(!showIndicatorsOnly)}
            >
              <svg
                fill="white"
                width="28px"
                height="28px"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M743.3 512L598.5 656.8l-36.2-36.2L670.9 512 562.3 403.4l36.2-36.2L743.3 512zM425.5 656.8l36.2-36.2L353.1 512l108.6-108.6-36.2-36.2L280.7 512l144.8 144.8z" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
      <div className="z-20 pointer-events-none absolute top-14 right-0 h-full text-white p-2 flex flex-col gap-2 items-end">
        {highlights.map((highlight) =>
          !showIndicatorsOnly ? (
            <p
              className="w-32 pointer-events-auto overflow-hidden truncate rounded-full p-1 text-xs cursor-pointer"
              key={highlight.uuid}
              style={{ backgroundColor: highlight.color }}
              onClick={() =>
                jumpToHighlightRects(highlight.rectangles, "pixels", "center")
              }
            >
              {highlight.text}
            </p>
          ) : (
            <div
              className="pointer-events-auto rounded-full size-4 cursor-pointer hover:[&>*]:visible hover:size-auto"
              key={highlight.uuid}
              style={{ backgroundColor: highlight.color }}
              onClick={() =>
                jumpToHighlightRects(highlight.rectangles, "pixels", "center")
              }
            >
              <p className="w-40 invisible truncate overflow-hidden text-xs px-1">
                {highlight.text}
              </p>
            </div>
          ),
        )}
      </div>
    </div>
  );
};
