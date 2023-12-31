"use client";
import { useState, useEffect } from "react";
import axios from "axios";

interface UserDetails {
  Connect_bank: any[];
}

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:2000/auth/profile", {
          headers: {
            id: `${localStorage.getItem("id")}`,
          },
        });
        const userData = response.data as UserDetails;
        console.log("ok", userData);
        setUserDetails(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  if (!userDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Bank Transaction
          </h2>
        </div>
        <div className="mt-8 space-y-6 pt-3 py-4 ">
          {userDetails.Connect_bank && (
            <div className="bg-white p-6 rounded shadow-md bg-gray-400">
              <div key={userDetails.Connect_bank.id}>
                <p className="text-gray-800 font-semibold">
                  Category: {userDetails.Connect_bank.category}
                </p>
                <p className="text-gray-800 font-semibold">
                  Description: {userDetails.Connect_bank.description}
                </p>
                <p className="text-gray-800 font-semibold">
                  Payee: {userDetails.Connect_bank.payee}
                </p>
                <p className="text-gray-800 font-semibold">
                  Received: {userDetails.Connect_bank.received}
                </p>
                <p className="text-gray-800 font-semibold">
                  Spend: {userDetails.Connect_bank.spend}
                </p>
                <p className="text-gray-800 font-semibold">
                  UserID: {userDetails.Connect_bank.userId}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
