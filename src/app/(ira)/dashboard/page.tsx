// pages/dashboard/index.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const DashboardPage: React.FC = () => {
  const router = useRouter();

  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const navigateTo = (path: string) => {
    setSelectedItem(path);
    router.push(`/dashboard/${path}`);
  };

  return (
    <div className="bg-gray-100 h-screen p-8">
      <h1 className="text-3xl font-semibold mb-8">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <button
          className={`${
            selectedItem === "Bank-info" ? "bg-indigo-600" : "bg-indigo-500"
          } text-white p-4 rounded-md text-center transition duration-300 hover:bg-indigo-600`}
          onClick={() => navigateTo("../dashboard/bill")}
        >
          Bill
        </button>
        <button
          className={`${
            selectedItem === "Bank-info" ? "bg-indigo-600" : "bg-indigo-500"
          } text-white p-4 rounded-md text-center transition duration-300 hover:bg-indigo-600`}
          onClick={() => navigateTo("../dashboard/paymentschedule")}
        >
          Payment Schedule
        </button>
        <button
          className={`${
            selectedItem === "Bank-info" ? "bg-indigo-600" : "bg-indigo-500"
          } text-white p-4 rounded-md text-center transition duration-300 hover:bg-indigo-600`}
          onClick={() => navigateTo("../dashboard/vendor")}
        >
          Vendor
        </button>
        <button
          className={`${
            selectedItem === "Bank-info" ? "bg-indigo-600" : "bg-indigo-500"
          } text-white p-4 rounded-md text-center transition duration-300 hover:bg-indigo-600`}
          onClick={() => navigateTo("../dashboard/Bank")}
        >
          Bank Info
        </button>
        <button
          className={`${
            selectedItem === "Bank-info" ? "bg-indigo-600" : "bg-indigo-500"
          } text-white p-4 rounded-md text-center transition duration-300 hover:bg-indigo-600`}
          onClick={() => navigateTo("../financial")}
        >
          financial
        </button>
        <button
          className={`${
            selectedItem === "inventory" ? "bg-indigo-600" : "bg-indigo-500"
          } text-white p-4 rounded-md text-center transition duration-300 hover:bg-indigo-600`}
          onClick={() => navigateTo("../inventory")}
        >
          inventory
        </button>
        <button
          className={`${
            selectedItem === "inventory" ? "bg-indigo-600" : "bg-indigo-500"
          } text-white p-4 rounded-md text-center transition duration-300 hover:bg-indigo-600`}
          onClick={() => navigateTo("../invoices")}
        >
          invoices
        </button>
        <button
          className={`${
            selectedItem === "inventory" ? "bg-indigo-600" : "bg-indigo-500"
          } text-white p-4 rounded-md text-center transition duration-300 hover:bg-indigo-600`}
          onClick={() => navigateTo("/Bank")}
        >
          Bank Reconcilation
        </button>
        <button
          className={`${
            selectedItem === "inventory" ? "bg-indigo-600" : "bg-indigo-500"
          } text-white p-4 rounded-md text-center transition duration-300 hover:bg-indigo-600`}
          onClick={() => navigateTo("../details")}
        >
          Payment Details
        </button>
        <button
          className={`${
            selectedItem === "inventory" ? "bg-indigo-600" : "bg-indigo-500"
          } text-white p-4 rounded-md text-center transition duration-300 hover:bg-indigo-600`}
          onClick={() => navigateTo("../file/downloadexcel")}
        >
          dowloadexcel
        </button>
        <button
          className={`${
            selectedItem === "inventory" ? "bg-indigo-600" : "bg-indigo-500"
          } text-white p-4 rounded-md text-center transition duration-300 hover:bg-indigo-600`}
          onClick={() => navigateTo("../file/downloadpdf")}
        >
          dowload pdf
        </button>
        <button
          className={`${
            selectedItem === "inventory" ? "bg-indigo-600" : "bg-indigo-500"
          } text-white p-4 rounded-md text-center transition duration-300 hover:bg-indigo-600`}
          onClick={() => navigateTo("../file/upload")}
        >
          upload file
        </button>
        <button
          className={`${
            selectedItem === "inventory" ? "bg-indigo-600" : "bg-indigo-500"
          } text-white p-4 rounded-md text-center transition duration-300 hover:bg-indigo-600`}
          onClick={() => navigateTo("../payment/form")}
        >
          Payment Methoad
        </button>
        <button
          className={`${
            selectedItem === "inventory" ? "bg-indigo-600" : "bg-indigo-500"
          } text-white p-4 rounded-md text-center transition duration-300 hover:bg-indigo-600`}
          onClick={() => navigateTo("../accounting-dashboard/analytics")}
        >
          analytics
        </button>
        <button
          className={`${
            selectedItem === "inventory" ? "bg-indigo-600" : "bg-indigo-500"
          } text-white p-4 rounded-md text-center transition duration-300 hover:bg-indigo-600`}
          onClick={() => navigateTo("../accounting-dashboard/fixed-assets")}
        >
          show assets
        </button>
        <button
          className={`${
            selectedItem === "inventory" ? "bg-indigo-600" : "bg-indigo-500"
          } text-white p-4 rounded-md text-center transition duration-300 hover:bg-indigo-600`}
          onClick={() => navigateTo("../quotes")}
        >
          Quotes
        </button>
        <button
          className={`${
            selectedItem === "inventory" ? "bg-indigo-600" : "bg-indigo-500"
          } text-white p-4 rounded-md text-center transition duration-300 hover:bg-indigo-600`}
          onClick={() => navigateTo("../sales-tax")}
        >
          sales and tax
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
