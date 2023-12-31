'use client';
import { useState } from 'react';
import axios from 'axios';
import { StockItemDto } from '@/backend/src/inventory/dto/stock-item.dto';

const CreateInventoryPage = () => {
  const [newItem, setNewItem] = useState<StockItemDto>({
    itemCode: ' ',
    name: ' ',
    price: 0.00,
    quantity: 0,
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Convert price to float and quantity to integer
    const newValue =
      name === 'price' ? parseFloat(value) : name === 'quantity' ? parseInt(value, 10) : value;

    setNewItem({
      ...newItem,
      [name]: newValue,
    });
  };

  const validateForm = async (): Promise<boolean> => {
    const errors: Record<string, string> = {};

    if (!newItem.itemCode.trim()) {
      errors.itemCode = 'Item Code cannot be empty';
    } else {
      // Check if the item code already exists
      try {
        const response = await axios.get(`http://localhost:8000/inventory/search-inventory/${newItem.itemCode}`);
        if (response.data.message === 'Stock Item not found :(') {

        } else {
          errors.itemCode = 'Item Code already exists';
        }
      } catch (error) {
        console.error('Error checking existing item code:', error);
      }
    }

    if (!newItem.name.trim()) {
      errors.name = 'Name cannot be empty';
    }

    if (newItem.price <= 0) {
      errors.price = 'Price must be greater than 0';
    }

    if (newItem.quantity <= 0) {
      errors.quantity = 'Quantity must be greater than 0';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreate = async () => {
    try {
      if (!(await validateForm())) {
        return;
      }
      const token = localStorage.getItem('auth_token');
      if(token){
        await axios.post('http://localhost:8000/inventory/create-inventory', 
        newItem,
        {withCredentials : true}
        );

      }
      
      console.log(newItem);

      window.location.href = '/inventory';
    } catch (error) {
      console.error('Error creating inventory item:', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-8 bg-white rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Create New Inventory Item</h1>
      <form className="flex flex-col gap-4">
        <label className="flex flex-col">
          <span className="mb-1">Item Code:</span>
          <input
            type="text"
            name="itemCode"
            value={newItem.itemCode}
            onChange={handleChange}
            placeholder="Enter Item Code"
            className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition"
          />
          {validationErrors.itemCode && <p className="text-red-500">{validationErrors.itemCode}</p>}
        </label>

        <label className="flex flex-col">
          <span className="mb-1">Name:</span>
          <input
            type="text"
            name="name"
            value={newItem.name}
            onChange={handleChange}
            placeholder="Enter Name"
            className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition"
          />
          {validationErrors.name && <p className="text-red-500">{validationErrors.name}</p>}
        </label>

        <label className="flex flex-col">
          <span className="mb-1">Price:</span>
          <input
            type="number"
            name="price"
            value={newItem.price}
            onChange={handleChange}
            placeholder="Enter Price"
            className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition"
          />
          {validationErrors.price && <p className="text-red-500">{validationErrors.price}</p>}
        </label>

        <label className="flex flex-col">
          <span className="mb-1">Quantity:</span>
          <input
            type="number"
            name="quantity"
            value={newItem.quantity}
            onChange={handleChange}
            placeholder="Enter Quantity"
            className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition"
          />
          {validationErrors.quantity && <p className="text-red-500">{validationErrors.quantity}</p>}
        </label>

        <button
          type="button"
          onClick={handleCreate}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          Create Item
        </button>
      </form>
    </div>
  );
};

export default CreateInventoryPage;
