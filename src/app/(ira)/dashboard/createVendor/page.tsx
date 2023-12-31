// pages/CreateVendorPage.tsx
'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react';

const CreateVendorPage: React.FC = () => {
  const [formData, setFormData] = useState({
    referenceNumber: '',
    name: '',
    phoneNumber: '',
    email: '',
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
      const response = await fetch('http://localhost:4003/vendor', {
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
          name: '',
          phoneNumber: '',
          email: '',
        });

        console.log('Vendor created successfully!');
      } else {
        const errorMessage = await response.text();
        console.error('Error creating vendor:', errorMessage);
      }
    } catch (error) {
      console.error('Error creating vendor:', error);
    }
  };


  return (
    <div className="form-container" style={{ textAlign: 'center' }}>
      <h1 className="title">Add New Vendor</h1>
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
                <label>Name:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Phone Number:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Email:</label>
              </td>
              <td>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Create Vendor</button>
      </form>
    </div>
  );
};

export default CreateVendorPage;
