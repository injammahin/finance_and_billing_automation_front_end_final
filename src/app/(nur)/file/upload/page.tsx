"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";

const UploadPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      console.error("Invalid file format. Please select a PDF file.");
    }
  };

  const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      console.error("No file selected for upload");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("payslip", file);

      const response = await fetch(
        "http://localhost:3000/payment/payment-slip/upload/10",
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText: string = await response.text();
        throw new Error(
          `Upload failed with status ${response.status}: ${errorText}`
        );
      }

      console.log("File uploaded successfully");
    } catch (error: any) {
      console.error("Error during file upload:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center">
          File Upload Page
        </h1>
        <form onSubmit={handleUpload} className="mt-8 space-y-6">
          <div className="mb-4">
            <label
              htmlFor="fileInput"
              className="block text-sm font-medium text-gray-700"
            >
              Select PDF File:
            </label>
            <input
              type="file"
              id="fileInput"
              accept=".pdf"
              onChange={handleFileChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 w-full"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadPage;
