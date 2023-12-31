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
            selectedItem === "bills" ? "bg-blue-600" : "bg-blue-500"
          } text-white p-4 rounded-md text-center transition duration-300 hover:bg-blue-600`}
          onClick={() => navigateTo("../dashboard/bill")}
        >
          Bill
        </button>
        <button
          className={`${
            selectedItem === "payment-schedule"
              ? "bg-green-600"
              : "bg-green-500"
          } text-white p-4 rounded-md text-center transition duration-300 hover:bg-green-600`}
          onClick={() => navigateTo("../dashboard/paymentschedule")}
        >
          Payment Schedule
        </button>
        <button
          className={`${
            selectedItem === "vendors" ? "bg-yellow-600" : "bg-yellow-500"
          } text-white p-4 rounded-md text-center transition duration-300 hover:bg-yellow-600`}
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
      </div>
    </div>
  );
};

export default DashboardPage;
