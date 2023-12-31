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
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            payment details
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          {userDetails.Payments && (
            <div>
              <ul>
                {userDetails.Payments.map((payment) => (
                  <li key={payment.id} className="mb-4">
                    <div className="bg-slate-400 shadow-xl rounded-lg pl-2">
                      <p className="py-1 font-semibold">
                        Payment Way: {payment.paymentway}
                      </p>
                      <p className="py-1 font-semibold">
                        reference: {payment.reference}
                      </p>
                      <p className="py-1 font-semibold">
                        Amount: {payment.amount}
                      </p>
                      <p className="py-1 font-semibold">due: {payment.due}</p>
                      {/* Include other properties */}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
