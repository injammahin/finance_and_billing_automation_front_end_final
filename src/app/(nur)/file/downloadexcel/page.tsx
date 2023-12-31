"use client";
import React from "react";

export default function Home() {
  const handleClick = async () => {
    const response = await fetch("http://localhost:2000/excel");

    if (response.status !== 200) {
      console.error(response.status, response.statusText);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "datasheet.";
    link.click();
  };

  return (
    <button
      className=" font-semibold font-serif bg-red-600  px-8 py-4 rounded-xl"
      type="button"
      onClick={handleClick}
    >
      Download excel
    </button>
  );
}
