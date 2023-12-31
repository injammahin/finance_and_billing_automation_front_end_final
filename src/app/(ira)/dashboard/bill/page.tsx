'use client'

import React, { useState, useEffect } from 'react';

interface bill {
  id: number;
  referenceNumber: string;
  company: string;
  purchaseDate: string;
  dueDate: string;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
}

function BillsPage() {
  const [bills, setBills] = useState<bill[]>([]);

  useEffect(() => {
    fetchBills(); }, []);

    const fetchBills = async () => {
      try {
        const response = await fetch('http://localhost:4003/bill');
        const data = await response.json();
        setBills(data);
      }
  
  catch (error) {
    console.error('Error fetching bills:', error);
  }

[]};

const handleDelete = async (id: number) => {
  try {
    await fetch(`http://localhost:4003/bill/${id}`, {
      method: 'DELETE',
    });
    // Update the list of bills after deletion
    fetchBills();
  } catch (error) {
    console.error('Error deleting bill:', error);
  }
};

  if (!bills.length) return <p>Loading bills...</p>;

  return (
    <div className="table-container">
      <h1 className="title">Bills</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Reference Number</th>
            <th>Company</th>
            <th>Purchase Date</th>
            <th>Due Date</th>
            <th>Total Amount</th>
            <th>Paid Amount</th>
            <th>Pending Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bills.map(bill => (
            <tr key={bill.id}>
              <td>{bill.id}</td>
              <td>{bill.referenceNumber}</td>
              <td>{bill.company}</td>
              <td>{bill.purchaseDate}</td>
              <td>{bill.dueDate}</td>
              <td>{bill.totalAmount}</td>
              <td>{bill.paidAmount}</td>
              <td>{bill.pendingAmount}</td>
              <button onClick={() => handleDelete(bill.id)}>Delete</button>
            </tr>
          ))}
        </tbody>
      </table>

      </div>
  );
}

export default BillsPage;