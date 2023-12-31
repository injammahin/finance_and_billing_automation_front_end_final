import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "F & B | Analytics",
  description: "",
};

const Analytics = async () => {
  const res = await fetch("http://localhost:5000/analytics/view-analytics");
  const data = await res.json();
  return (
    <div>
      <h1 className="text-4xl text-black font-bold text-center my-14">
        Analytics
      </h1>
      <div className="flex justify-center items-center gap-5">
        {data.map(
          ({
            id,
            revenue,
            expense,
            profit,
            financialHealth,
            returnOnInvestment,
          }) => (
            <div key={id} className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">
                  Revenue: {revenue}K
                  <div className="badge badge-secondary">{financialHealth}</div>
                </h2>
                <p>Expense: {expense}K</p>
                <p>Profit: {profit}k</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">
                    ROI {returnOnInvestment}
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Analytics;
