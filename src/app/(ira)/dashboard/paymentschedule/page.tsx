'use client'

// pages/payments.tsx

import React, { useState, useEffect } from 'react';

interface paymentschedule {
    id: number;
    referenceNumber: number;
    companyName: string;
    paymentDate: string;
    amount: number;
  }

function PaymentsPage() {
  const [payments, setPaymentSchedules] = useState<paymentschedule[]>([]);

    useEffect(() => {
      fetchPaymentSchedules();
    }, []);
  
    const fetchPaymentSchedules = async () => {
      try {
        const response = await fetch('http://localhost:4003/paymentSchedule');
        const data = await response.json();
        setPaymentSchedules(data);
      } catch (error) {
        console.error('Error fetching payment schedules:', error);
      }
    };
  
    const handleDelete = async (id: number) => {
      try {
        await fetch(`http://localhost:4003/paymentSchedule/${id}`, {
          method: 'DELETE',
        });
        // Update the list of payment schedules after deletion
        fetchPaymentSchedules();
      } catch (error) {
        console.error('Error deleting payment schedule:', error);
      }
    };

  if (!payments.length) return <p>Loading payments...</p>;

  return (
    <div className="table-container">
      <h1 className="title">Payment Schedule</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Reference Number</th>
            <th>Company Name</th>
            <th>Payment Date</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment.id}>
              <td>{payment.id}</td>
              <td>{payment.referenceNumber}</td>
              <td>{payment.companyName}</td>
              <td>{payment.paymentDate}</td>
              <td>{payment.amount}</td>
              <button onClick={() => handleDelete(payment.id)}>Delete</button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentsPage;
