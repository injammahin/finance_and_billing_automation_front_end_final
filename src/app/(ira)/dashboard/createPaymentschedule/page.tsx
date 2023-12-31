'use client'
// pages/CreatePaymentSchedulePage.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';

const CreatePaymentSchedulePage: React.FC = () => {
  const [formData, setFormData] = useState({
    referenceNumber: '',
    companyName: '',
    paymentDate: '',
    amount: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4003/paymentSchedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Reset form data
        setFormData({
          referenceNumber: '',
          companyName: '',
          paymentDate: '',
          amount: '',
        });

        console.log('Payment schedule created successfully!');
      } else {
        const errorMessage = await response.text();
        console.error('Error creating payment schedule:', errorMessage);
      }
    } catch (error) {
      console.error('Error creating payment schedule:', error);
    }
  };

  return (
    <div className="form-container" style={{ textAlign: 'center' }}>
      <h1 className="title">Add New Payment Schedule</h1>
      <form onSubmit={handleSubmit}>
        <table style={{ width: '600px !important' }}>
          <tbody>
            <tr>
              <td>
                <label>Reference Number:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="referenceNumber"
                  value={formData.referenceNumber}
                  onChange={handleInputChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Company Name:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Payment Date:</label>
              </td>
              <td>
                <input
                  type="date"
                  name="paymentDate"
                  value={formData.paymentDate}
                  onChange={handleInputChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Amount:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Create Payment Schedule</button>
      </form>
    </div>
  );
};

export default CreatePaymentSchedulePage;
