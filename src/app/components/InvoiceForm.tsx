 'use client'
import React, { useState } from 'react';
import axios from 'axios';

interface Product {
  description: string;
  amount: number;
}

interface InvoiceFormProps {
  onCreate: () => void;
}

const initialProductState: Product = { description: '', amount: 0.00 };

const InvoiceForm: React.FC<InvoiceFormProps> = ({ onCreate }) => {
  const [products, setProducts] = useState<Product[]>([initialProductState]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleChange = (index: number, field: keyof Product, value: string | number) => {
    const updatedProducts = [...products];

    if (field === 'description') {
      updatedProducts[index].description = value as string;
    } else if (field === 'amount') {
      updatedProducts[index].amount = value as number;
    }

    setProducts(updatedProducts);
  };

  const addProduct = () => {
    setProducts([...products, { description: '', amount: 0.00 }]);
  };
  
  const removeProduct = (index: number) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const calculateTotal = (): number => {
    return products.reduce((total, product) => total + product.amount, 0);
  };

  const handleCreate = async () => {
    const errors: string[] = [];

    // Validate products
    products.forEach((product, index) => {
      if (!product.description.trim()) {
        errors.push(`Description cannot be empty for product ${index + 1}`);
      }

      if (product.amount <= 0) {
        errors.push(`Amount must be greater than 0 for product ${index + 1}`);
      }
    });

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      await axios.post('http://localhost:8000/invoices/create', { products },);
      setValidationErrors([]); // Clear validation errors on success
      setProducts([{ description: '', amount: 0.00 }]); // Reset the form to its initial state
      onCreate();
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  return (
    <div className="space-y-4">
      {products.map((product, index) => (
        <div key={index} className="flex space-x-4 items-center">
          <h2  className="text-lg font-bold mb-2">Product no. {index + 1}:</h2>
          <div className="flex flex-col">
            
            <input
              type="text"
              placeholder={`Description`}
              value={product.description}
              onChange={(e) => handleChange(index, 'description', e.target.value)}
              className="p-2 border rounded-md focus:outline-none focus:border-blue-500 transition"
            />
          </div>
          <div className="flex flex-col">
            <input
              type="number"
              placeholder={`Amount`}
              value={product.amount}
              onChange={(e) => handleChange(index, 'amount', parseFloat(e.target.value))}
              className="p-2 border rounded-md focus:outline-none focus:border-blue-500 transition"
            />
          </div>
          {index > 0 && (
            <button
              onClick={() => removeProduct(index)}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 hover:text-white focus:outline-none focus:ring focus:border-blue-300 transition"
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <div className="flex items-center space-x-4">
        <h2 className="text-2xl font-bold text-blue-500">Total: {calculateTotal()}</ h2 >
      </div>
      <button
        onClick={addProduct}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
      >
        Add Product
      </button>
      <button
        onClick={handleCreate}
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
      >
        Create Invoice
      </button>
      {validationErrors.length > 0 && (
        <div className="text-red-500 mt-4">
          {validationErrors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default InvoiceForm;
