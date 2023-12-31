'use client'
// pages/CreateBillPage.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Bill {
  referenceNumber: string;
  company: string;
  purchaseDate: string;
  dueDate: string;
  totalAmount: string;
  paidAmount: string;
  pendingAmount: string;
}

const CreateBillPage: React.FC = () => {
  const [formData, setFormData] = useState<Bill>({
    referenceNumber: '',
    company: '',
    purchaseDate: '',
    dueDate: '',
    totalAmount: '',
    paidAmount: '',
    pendingAmount: '',
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
      const response = await fetch('http://localhost:4003/bill', {
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
          company: '',
          purchaseDate: '',
          dueDate: '',
          totalAmount: '',
          paidAmount: '',
          pendingAmount: '',
        });

        console.log('Bill created successfully!');
      } else {
        const errorMessage = await response.text();
        console.error('Error creating bill:', errorMessage);
      }
    } catch (error) {
      console.error('Error creating bill:', error);
    }
  };

  return (
    <div className="form-container" style={{ textAlign: 'center' }}>
      <h1 className="title">Add New Bill</h1>
      <form onSubmit={handleSubmit}>
        <table style={{ width: '600px' }}>
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
                <label>Company:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Purchase Date:</label>
              </td>
              <td>
                <input
                  type="date"
                  name="purchaseDate"
                  value={formData.purchaseDate}
                  onChange={handleInputChange}
                  required
                />
              </td>
              </tr>
              <tr>
              <td>
                <label>Due Date:</label>
              </td>
              <td>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  required
                />
              </td>
              </tr>
              <tr>
              <td>
                <label>Total Amount:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="totalAmount"
                  value={formData.totalAmount}
                  onChange={handleInputChange}
                  required
                />
              </td>
              </tr>
              <tr>
              <td>
                <label>Paid Amount:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="paidAmount"
                  value={formData.paidAmount}
                  onChange={handleInputChange}
                  required
                />
              </td>
              </tr>
              <tr>
              <td>
                <label>Pending Amount:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="pendingAmount"
                  value={formData.pendingAmount}
                  onChange={handleInputChange}
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Create Bill</button>
      </form>
    </div>
  );
};

export default CreateBillPage;
