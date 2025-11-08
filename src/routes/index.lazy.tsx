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
      <span>Hello world</span>
    </div>
  );
}
