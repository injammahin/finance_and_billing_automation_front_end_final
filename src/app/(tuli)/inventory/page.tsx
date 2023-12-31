"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import InventoryTable from "@/app/components/InventoryTable";
import { StockItemDto } from "@/backend/src/inventory/dto/stock-item.dto";
import Link from "next/link";
// import Cookies from 'js-cookie';
import { cookies } from "next/headers";

const InventoryPage = () => {
  // console.log(props);
  const [inventory, setInventory] = useState<StockItemDto[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<StockItemDto[]>([]);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const token = localStorage.getItem("auth_token"); // Retrieve token from cookies
        // console.log(token);
        if (token) {
          const response = await axios.get(
            "http://localhost:8000/inventory/get-inventory",
            {
              withCredentials: true,
            }
          );
          setInventory(response.data.data);
          ///
          const timer = setTimeout(() => {
            localStorage.removeItem("auth_token");
            // window.location.href = "/signin";
          }, 30 * 60 * 1000); // 30 minutes in milliseconds (if u want to change the time change 30)

          // Clear the timer when the component is unmounted
          return () => clearTimeout(timer);
        } else {
          console.error("JWT token not found in cookies.");
          // window.location.href = "/signin";
        }
      } catch (error: any) {
        if (error.response.status === 403) {
          setError("User Unauthorized");
        }
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventory();
  }, []);

  useEffect(() => {
    // Filter items based on search query
    const results = inventory.filter(
      (item) =>
        item.itemCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(results);
    setNotFound(results.length === 0);
  }, [searchQuery, inventory]);

  const handleDelete = async (itemCode: string) => {
    try {
      await axios.delete(`http://localhost:8000/inventory/delete/${itemCode}`);
      setInventory((prevInventory) =>
        prevInventory.filter((item) => item.itemCode !== itemCode)
      );
    } catch (error) {
      console.error("Error deleting inventory item:", error);
    }
  };
  //search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container mx-auto mt-8 p-8 bg-gray-100 rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-6">Inventory</h1>
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by Item Code or Name"
          className="w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:border-blue-500 transition"
        />
      </div>
      {/* <Link href="inventory/create" className="text-blue-500">
        Create New Item
      </Link> */}

      {notFound ? (
        <p className="text-red-500 mt-4">No items found.</p>
      ) : (
        <InventoryTable inventory={searchResults} onDelete={handleDelete} />
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default InventoryPage;
