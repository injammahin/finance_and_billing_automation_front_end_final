// pages/vendor.tsx
'use client'
import React, { useState, useEffect } from 'react';

interface vendor {
    id: number;
    referenceNumber: number;
    name: string;
    phoneNumber: string;
    email: string;
  }

function VendorsPage() {
  const [vendors, setVendors] = useState<vendor[]>([]);
 

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await fetch('http://localhost:4003/vendor');
      const data = await response.json();
      setVendors(data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:4003/vendor/${id}`, {
        method: 'DELETE',
      });
      // Update the list of vendors after deletion
      fetchVendors();
    } catch (error) {
      console.error('Error deleting vendor:', error);
    }
  };

  if (!vendors.length) return <p>Loading vendors...</p>;

  return (
    <div className="table-container">
      <h1 className="title">Vendors</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Reference Number</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map(vendor => (
            <tr key={vendor.id}>
              <td>{vendor.id}</td>
              <td>{vendor.referenceNumber}</td>
              <td>{vendor.name}</td>
              <td>{vendor.phoneNumber}</td>
              <td>{vendor.email}</td>
              <button onClick={() => handleDelete(vendor.id)}>Delete</button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VendorsPage;
