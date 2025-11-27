"use client";

import { useRouter } from "next/navigation";
import usePost from "../hooks/usepost";

export default function Upload() {
  const router = useRouter();
  const { loading, error, response, postData } = usePost();

  //upload file

  const uploadResume = async (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      console.log("No file selected");
      return;
    }

    const response = await postData("/api/upload", { resume: file }, true);

    if (response) {
      router.push(`/interview/${response.data}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-10 gap-12">
      {/* ---- RESUME UPLOAD SECTION ---- */}
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          📄 Upload Your Resume
        </h2>

        <label className="flex items-center gap-4 border-2 border-dashed border-gray-400 rounded-xl p-6 cursor-pointer hover:border-black transition">
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={uploadResume}
          />
          <div className="text-lg text-gray-700">
            Click to choose a PDF resume
          </div>
        </label>
      </div>
    </div>
  );
}
