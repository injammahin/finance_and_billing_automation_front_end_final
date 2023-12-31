'use client'
// pages/CreateBankPage.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';

const CreateBankPage: React.FC = () => {
  const [formData, setFormData] = useState({
    accountId: '',
    BankName: '',
    companyLoan: '',
    accountStatus: '',
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
      const response = await fetch('http://localhost:4003/Bank', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Reset form data
        setFormData({
          accountId: '',
          BankName: '',
          companyLoan: '',
          accountStatus: '',
        });

        console.log('Bank created successfully!');
      } else {
        const errorMessage = await response.text();
        console.error('Error creating bank:', errorMessage);
      }
    } catch (error) {
      console.error('Error creating bank:', error);
    }
  };

  return (
    <div className="form-container" style={{ textAlign: 'center' }}>
      <h1 className="title">Add New Bank Account</h1>
      <form onSubmit={handleSubmit}>
        <table style={{ width: '600px' }}>
          <tbody>
            <tr>
              <td>
                <label>Account ID:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="accountId"
                  value={formData.accountId}
                  onChange={handleInputChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Bank Name:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="BankName"
                  value={formData.BankName}
                  onChange={handleInputChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Company Loan:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="companyLoan"
                  value={formData.companyLoan}
                  onChange={handleInputChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Account Status:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="accountStatus"
                  value={formData.accountStatus}
                  onChange={handleInputChange}
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Create Bank</button>
      </form>
    </div>
  );
};

export default CreateBankPage;
