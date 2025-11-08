import {
  usePdf,
  CanvasLayer,
  Page,
  Pages,
  usePdfJump,
} from "@anaralabs/lector";

import {
  Listbox,
  ListboxLabel,
  ListboxOption,
} from "@/design_system/listbox.tsx";
import { Button } from "@/design_system/button.tsx";

type SelectBoxOptions = {
  label: string;
  value: any;
};

const zoomOptions: Array<SelectBoxOptions> = [
  { label: "50%", value: "0.5" },
  { label: "75%", value: "0.75" },
  { label: "100%", value: "1" },
  { label: "125%", value: "1.25" },
  { label: "150%", value: "1.5" },
  { label: "175%", value: "1.75" },
  { label: "200%", value: "2" },
];

type DisplayProps = {
  acceptFile: () => void;
  rejectFile: () => void;
};

const Display = ({ rejectFile, acceptFile }: DisplayProps) => {
  const pages = usePdf((state) => state.pdfDocumentProxy?.numPages);
  const currentPage = usePdf((state) => state.currentPage);
  const setZoom = usePdf((state) => state.updateZoom);
  const { jumpToPage } = usePdfJump();

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      jumpToPage(currentPage - 1, { behavior: "smooth", align: "center" });
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages) {
      jumpToPage(currentPage + 1, { behavior: "smooth", align: "center" });
    }
  };

  return (
    <>
      <Pages>
        <Page>
          <CanvasLayer />
        </Page>
      </Pages>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-black flex justify-end absolute top-4 right-8 p-[1px] rounded-lg">
          <Listbox
            name="zoom"
            defaultValue="1"
            className="max-w-24"
            onChange={(value) => setZoom(Number(value))}
          >
            {zoomOptions.map((option) => (
              <ListboxOption key={option.value} value={option.value}>
                <ListboxLabel>{option.label}</ListboxLabel>
              </ListboxOption>
            ))}
          </Listbox>
        </div>
        <div className="absolute bottom-25 right-8 flex flex-col gap-2 z-10">
          <Button
            className="bg-green-500! text-white px-4 py-2 rounded-lg"
            onClick={acceptFile}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
              width="28px"
              height="28px"
              viewBox="0 0 1024 1024"
            >
              <path d="M760 380.4l-61.6-61.6-263.2 263.1-109.6-109.5L264 534l171.2 171.2L760 380.4z" />
            </svg>
          </Button>
          <Button
            className="bg-red-500! text-white px-4 py-2 rounded-lg hover:cursor-pointer"
            onClick={rejectFile}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28px"
              height="28px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M16 8L8 16M8.00001 8L16 16"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </div>
        <div className="absolute bottom-25 left-1/2 transform -translate-x-1/2 text-white px-8 py-2 rounded-lg flex gap-3">
          <Button
            className="fill-white"
            onClick={handlePreviousPage}
            disabled={currentPage <= 1}
            aria-label="Previous page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Button>
          <div className="px-4 py-2 bg-black rounded-lg">
            {currentPage} / {pages}
          </div>
          <Button
            className="fill-white"
            onClick={handleNextPage}
            disabled={currentPage >= pages}
            aria-label="Next page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Display;
