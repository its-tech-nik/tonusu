import { useEffect, useRef, useState } from "react";
// import { db } from "@/db/db.ts";

import { useNavigate, createLazyFileRoute } from "@tanstack/react-router";
import { v4 as uuidv4 } from "uuid";

import { GlobalWorkerOptions } from "pdfjs-dist";
GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

import { useAuth0 } from "@auth0/auth0-react";

export const Route = createLazyFileRoute("/" as never)({
  component: Index,
});

function Index() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [base64Pdf, setBase64Pdf] = useState<string | null>("");

  const navigate = useNavigate();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.type === "application/pdf" && selectedFile !== file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        setBase64Pdf(base64String);
        setSelectedFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const acceptFile = async () => {
    if (!base64Pdf) return;
    const uuid = uuidv4();

    // await db.contracts.add({
    //   name: selectedFile?.name || "Νέα Περίληψη",
    //   uuid,
    //   pdf: base64Pdf,
    //   summaryInfo: {
    //     documentInformation: documentInfoExample,
    //     writtenActs: typesOfWrittenActsExample,
    //     kaekList: {
    //       ...KaekListExample,
    //     },
    //     extraInformationOfWrittenAction: extraInformationOfWrittenActionExample,
    //     verticalPropertiesTable: verticalPropertyTableExample,
    //     horizontalPropertiesTable: horizontalPropertyTableExample,
    //     newPropertiesTable: newPropertiesExample,
    //   },
    //   last_modified: new Date().toISOString(),
    // });

    navigate({
      to: "/editor/$contractId",
      params: { contractId: uuid },
    });
  };

  const reUploadFile = () => {
    setBase64Pdf(null);
    fileInputRef.current?.click();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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
    <div className="size-full flex flex-col justify-center items-center gap-4 relative">
      <input
        ref={fileInputRef}
        className="hidden"
        type="file"
        name="contract-upload"
        id="contract-upload"
        accept=".pdf"
        onChange={handleFileSelect}
      />
      {!base64Pdf && (
        <div className="size-full flex justify-center items-center">
          <div className="aspect-square rounded-xl border-4 border-gray-400 flex flex-col justify-center items-center h-96 bg-linear-to-b from-gray-700 to-gray-900">
            <label
              htmlFor="contract-upload"
              className="size-full flex flex-col justify-center items-center cursor-pointer"
            >
              <span>Επιλογή Συμβολαίου</span>
              <div className="mt-6">
                <svg
                  height="100px"
                  width="100px"
                  version="1.1"
                  id="_x32_"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 512 512"
                  xmlSpace="preserve"
                >
                  <g>
                    <path
                      fill="#c8c8c8"
                      d="M378.413,0H208.297h-13.182L185.8,9.314L57.02,138.102l-9.314,9.314v13.176v265.514
		c0,47.36,38.528,85.895,85.896,85.895h244.811c47.353,0,85.881-38.535,85.881-85.895V85.896C464.294,38.528,425.766,0,378.413,0z
		 M432.497,426.105c0,29.877-24.214,54.091-54.084,54.091H133.602c-29.884,0-54.098-24.214-54.098-54.091V160.591h83.716
		c24.885,0,45.077-20.178,45.077-45.07V31.804h170.116c29.87,0,54.084,24.214,54.084,54.092V426.105z"
                    />
                    <path
                      fill="#c8c8c8"
                      d="M171.947,252.785h-28.529c-5.432,0-8.686,3.533-8.686,8.825v73.754c0,6.388,4.204,10.599,10.041,10.599
		c5.711,0,9.914-4.21,9.914-10.599v-22.406c0-0.545,0.279-0.817,0.824-0.817h16.436c20.095,0,32.188-12.226,32.188-29.612
		C204.136,264.871,192.182,252.785,171.947,252.785z M170.719,294.888h-15.208c-0.545,0-0.824-0.272-0.824-0.81v-23.23
		c0-0.545,0.279-0.816,0.824-0.816h15.208c8.42,0,13.447,5.027,13.447,12.498C184.167,290,179.139,294.888,170.719,294.888z"
                    />
                    <path
                      fill="#c8c8c8"
                      d="M250.191,252.785h-21.868c-5.432,0-8.686,3.533-8.686,8.825v74.843c0,5.3,3.253,8.693,8.686,8.693h21.868
		c19.69,0,31.923-6.249,36.81-21.324c1.76-5.3,2.723-11.681,2.723-24.857c0-13.175-0.964-19.557-2.723-24.856
		C282.113,259.034,269.881,252.785,250.191,252.785z M267.856,316.896c-2.318,7.331-8.965,10.459-18.21,10.459h-9.23
		c-0.545,0-0.824-0.272-0.824-0.816v-55.146c0-0.545,0.279-0.817,0.824-0.817h9.23c9.245,0,15.892,3.128,18.21,10.46
		c0.95,3.128,1.62,8.56,1.62,17.93C269.476,308.336,268.805,313.768,267.856,316.896z"
                    />
                    <path
                      fill="#c8c8c8"
                      d="M361.167,252.785h-44.812c-5.432,0-8.7,3.533-8.7,8.825v73.754c0,6.388,4.218,10.599,10.055,10.599
		c5.697,0,9.914-4.21,9.914-10.599v-26.351c0-0.538,0.265-0.81,0.81-0.81h26.086c5.837,0,9.23-3.532,9.23-8.56
		c0-5.028-3.393-8.553-9.23-8.553h-26.086c-0.545,0-0.81-0.272-0.81-0.817v-19.425c0-0.545,0.265-0.816,0.81-0.816h32.733
		c5.572,0,9.245-3.666,9.245-8.553C370.411,256.45,366.738,252.785,361.167,252.785z"
                    />
                  </g>
                </svg>
              </div>
            </label>
          </div>
        </div>
      )}
      {base64Pdf && (
        <div className="max-w-(--breakpoint-2xl) w-full mx-auto bg-neutral-800 rounded-md overflow-hidden relative group">
          <Root
            source={base64Pdf}
            className="size-full"
            loader={
              <div className="flex justify-center items-center h-full w-full">
                Loading...
              </div>
            }
          >
            <Display acceptFile={acceptFile} rejectFile={reUploadFile} />
          </Root>
        </div>
      )}
    </div>
  );
}
