// HomePage.tsx

import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen  bg-gradient-to-r from-blue-300 via-purple-400 to-gray-500 text-white">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between w-full max-w-5xl px-6 md:px-10">
        <div className="flex-shrink-0 mb-8 md:mb-0">
          <img
            src="/download.jpeg"
            alt="Home Image"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className=" text-center md:text-left max-w-xl">
          <h1 className="text-4xl font-extrabold mb-4">
            Accelerate growth with Stripe Billing
          </h1>
          <p className="text-lg mb-8">
            Stripe Billing lets you bill and manage customers however you
            want—from simple recurring billing to usage-based billing and
            sales-negotiated contracts. Collect and retain more revenue,
            automate revenue management workflows, and accept payments globally.
          </p>
          <div className="flex space-x-4">
            <a
              href="/signin"
              className="bg-orange-500 text-white rounded-full px-6 py-2 hover:bg-orange-600 hover:text-black hover:underline"
            >
              Sign In
            </a>
            <a
              href="/signup"
              className="bg-green-500 text-white rounded-full px-6 py-3 hover:bg-green-600 hover:text-black hover:underline"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
