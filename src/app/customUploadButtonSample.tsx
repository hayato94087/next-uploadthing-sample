
"use client";

import { generateReactHelpers } from "@uploadthing/react/hooks";
const { useUploadThing } = generateReactHelpers<OurFileRouter>();
import { OurFileRouter } from "./api/uploadthing/core";
import { generateMimeTypes } from "uploadthing/client";

export default function Home() {
  const { isUploading, permittedFileInfo, startUpload } = useUploadThing({
    endpoint: "imageUploader",
    onClientUploadComplete: (res) => {
      // Do something with the response
      console.log("Files: ", res);
      alert("Upload Completed");
    },
    onUploadError: (error: Error) => {
      // Do something with the error.
      alert(`ERROR! ${error.message}`);
    },
  });
  const { maxSize, fileTypes } = permittedFileInfo ?? {};
  const multiple = true;

  return (
    <div className="flex flex-col items-center">
      <label className="bg-green-700 rounded-md py-2 px-3 h-[40px] w-[180px] flex items-center justify-center">
        <input
          className="hidden"
          type="file"
          multiple={multiple}
          accept={generateMimeTypes(fileTypes ?? []).join(", ")}
          onChange={(e) => {
            e.target.files && startUpload(Array.from(e.target.files));
          }}
        />
        <span className="text-white">
          {isUploading ? <Spinner /> : `Choose File${multiple ? `(s)` : ``}`}
        </span>
      </label>
      <div className="h-[1.25rem]">
        {fileTypes && (
          <p className="text-xs leading-5 text-gray-600">
            {`${fileTypes.join(", ")}`} {maxSize && `up to ${maxSize}`}
          </p>
        )}
      </div>
    </div>
  );
}

const Spinner = () => {
  return (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 576 512"
    >
      <path
        fill="currentColor"
        d="M256 32C256 14.33 270.3 0 288 0C429.4 0 544 114.6 544 256C544 302.6 531.5 346.4 509.7 384C500.9 399.3 481.3 404.6 465.1 395.7C450.7 386.9 445.5 367.3 454.3 351.1C470.6 323.8 480 291 480 255.1C480 149.1 394 63.1 288 63.1C270.3 63.1 256 49.67 256 31.1V32z"
      />
    </svg>
  );
};