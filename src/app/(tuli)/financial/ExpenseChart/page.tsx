"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ExpenseBarChart from "../../../components/ExpenseBarChart";
import { FinancialReport } from "../../../backend/src/report/entities/financial-report.entity";

const ExpenseChartPage = () => {
  const [reports, setReports] = useState<FinancialReport[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        if (token) {
          const response = await axios.get(
            "http://localhost:8000/financial/all-reports",
            {
              withCredentials: true,
            }
          );

          setReports(response.data);
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
      <h1 className="text-3xl font-bold mb-6">Expense Bar Chart</h1>

      {reports.length > 0 ? (
        <ExpenseBarChart reports={reports} />
      ) : (
        <p>Loading reports...</p>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default ExpenseChartPage;
