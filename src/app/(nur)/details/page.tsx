"use client";
import { useState, useEffect } from "react";
import axios from "axios";

interface UserDetails {
  id: number;
  name: string;
  phone: string;
  email: string;
  companyName: string;
  Connect_bank: any[];
  Payments: any[];
}

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:2000/auth/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const userData = response.data as UserDetails;
        setUserDetails(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            User Profile
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <p>ID: {userDetails.id}</p>
          <p>Name: {userDetails.name}</p>
          <p>Email: {userDetails.email}</p>
          <p>Phone: {userDetails.phone}</p>
          <p>Company Name: {userDetails.companyName}</p>

          {userDetails.Connect_bank && (
            <div>
              <h3>Connect Bank Details:</h3>
              {userDetails.Connect_bank.map((bank) => (
                <div key={bank.id}>
                  <p>Description: {bank.description}</p>
                </div>
              ))}
            </div>
          )}

          {userDetails.Payments && (
            <div>
              <h3>Payments:</h3>
              {userDetails.Payments.map((payment) => (
                <div key={payment.id}>
                  <p>Amount: {payment.amount}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
