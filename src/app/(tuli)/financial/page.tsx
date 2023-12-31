"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import FinancialReportTable from "../../components/FinancialReportTable"; // Assuming a table component for display
import { FinancialReport } from "../../../faba/backend/src/report/entities/financial-report.entity";
import { cookies } from "next/headers";

const FinancialReportPage = () => {
  const [reports, setReports] = useState<FinancialReport[]>([]); // Explicitly declare reports as an array
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        //console.log(token);
        if (token) {
          const response = await axios.get(
            "http://localhost:8000/financial/all-reports",
            {
              withCredentials: true,
            }
          );

          setReports(response.data);
          //console.log(response.data)
          const timer = setTimeout(() => {
            localStorage.removeItem("auth_token");
            window.location.href = "/signin";
          }, 30 * 60 * 1000); // 30 minutes in milliseconds (if u want to change the time change 30)

          return () => clearTimeout(timer);
        } else {
          console.error("JWT token not found in cookies.");
          window.location.href = "/signin";
        }
      } catch (error: any) {
        setError("Failed to fetch reports: " + error.message);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="container mx-auto mt-8 p-8 bg-gray-100 rounded-md shadow-md">
      {/* <h1 className="text-3xl font-bold mb-6">Financial Reports</h1> */}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {/* <button onClick={navigateToExpenseChart}>View Chart</button> */}
      {reports.length > 0 ? (
        <FinancialReportTable reports={reports} />
      ) : reports.length === 0 ? (
        <p className="text-center text-gray-500">No financial reports found.</p>
      ) : (
        <p className="text-center text-gray-500">Loading reports...</p>
      )}
    </div>
  );
};

export default FinancialReportPage;
