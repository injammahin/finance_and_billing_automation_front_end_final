// pages/bank-info.tsx
'use client'
import React, { useState, useEffect } from 'react';

// Define the type for bank info data
interface BankInfo {
  id: number;
  accountId: number;
  BankName: string;
  companyLoan: number;
  accountStatus: string;
}

function BankInfoPage() {
  const [bankInfo, setBankInfo] = useState<BankInfo[]>([]); // Specify the type here

  useEffect(() => {
    fetchBankInfoList();
  }, []);

  const fetchBankInfoList = async () => {
    try {
      const response = await fetch('http://localhost:4003/Bank');
      const data = await response.json();
      setBankInfo(data);
    } catch (error) {
      console.error('Error fetching bank info:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:4003/Bank/${id}`, {
        method: 'DELETE',
      });
      // Update the list of bank info after deletion
      fetchBankInfoList();
    } catch (error) {
      console.error('Error deleting bank info:', error);
    }
  };
  if (!bankInfo.length) return <p>Loading bank info...</p>;

  return (
    <div className="table-container">
      <h1 className="title">Bank Info</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Account ID</th>
            <th>Bank Name</th>
            <th>Company Loan</th>
            <th>Account Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bankInfo.map(bank => (
            <tr key={bank.id}>
              <td>{bank.id}</td>
              <td>{bank.accountId}</td>
              <td>{bank.BankName}</td>
              <td>{bank.companyLoan}</td>
              <td>{bank.accountStatus}</td>
              <button onClick={() => handleDelete(bank.id)}>Delete</button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BankInfoPage;
