"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { NextResponse } from "next/server";
import InvoiceForm from "@/app/components/InvoiceForm";
import { Invoice } from "@/backend/src/invoices/entities/invoices.entity";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../components/ui/collapsible";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

const Invoices = () => {
  // State to store the list of invoices
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const router = useRouter();
  // Fetch invoices from the server
  const fetchInvoices = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      if (token) {
        const response = await axios.get("http://localhost:8000/invoices/all", {
          withCredentials: true,
        });
        setInvoices(response.data);
        const timer = setTimeout(() => {
          localStorage.removeItem("auth_token");
          window.location.href = "/signin";
        }, 30 * 60 * 1000); // 30 minutes in milliseconds (if u want to change the time change 1st num)

        // Clear the timer when the component is unmounted
        return () => clearTimeout(timer);
      } else {
        console.error("JWT token not found in cookies.");
        window.location.href = "/signin";
        //router.push("/signin");
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  // Use useEffect to fetch invoices
  useEffect(() => {
    fetchInvoices();
  }, []);

  // Handle invoice creation by updating the list of invoices
  const handleCreateInvoice = async () => {
    await fetchInvoices();
  };

  return (
    <div className="container mx-auto mt-8 p-8 bg-gray-100 rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-4">Invoices</h1>
      {/* InvoiceForm component for creating new invoices */}
      <InvoiceForm onCreate={handleCreateInvoice} /> <br />
      <Collapsible>
        <CollapsibleTrigger onClick={() => setCollapseOpen(!collapseOpen)}>
          <h2 className="text-2xl font-bold mb-2 cursor-pointer">
            Show All Invoices History &nbsp;
            {collapseOpen ? "-" : "+"}
          </h2>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <ul>
            {invoices.map((invoice) => (
              <li
                key={invoice.id}
                className="border p-4 mb-4 rounded-md shadow-md bg-white hover:shadow-lg transition duration-300"
              >
                <p className="font-bold text-blue-500">ID: {invoice.id}</p>

                <p className="mt-2">Products:</p>
                <ul className="list-disc ml-6">
                  {invoice.products.map((product) => (
                    <li key={product.id}>
                      {`Description: ${product.description}, Amount: $${product.amount}`}
                    </li>
                  ))}
                </ul>
                <br />
                <p>Total Expense: ${invoice.totalExpense}</p>
              </li>
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default Invoices;
