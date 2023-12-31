'use client'

import React, { useState } from 'react';
import axios from 'axios';

const FinancialReportCreatePage = () => {
  const [newReport, setNewReport] = useState({
    //date: '',
    expenses: [
      {
        description: '',
        price: 0.00,
      },
    ],
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewReport({
      ...newReport,
      [name]: value,
    });
  };

  const handleExpenseChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const updatedExpenses = [...newReport.expenses];
    updatedExpenses[index] = {
      ...updatedExpenses[index],
      [name]: value,
    };

    setNewReport({
      ...newReport,
      expenses: updatedExpenses,
    });
  };

  const addExpense = () => {
    setNewReport({
      ...newReport,
      expenses: [
        ...newReport.expenses,
        {
          description: '',
          price: 0.00,
        },
      ],
    });
  };

  const removeExpense = (index: number) => {
    const updatedExpenses = [...newReport.expenses];
    updatedExpenses.splice(index, 1);

    setNewReport({
      ...newReport,
      expenses: updatedExpenses,
    });
  };

  const validateForm = async (): Promise<boolean>  => {
    const errors: Record<string, string> = {};

    // // Validate date
    // if (!newReport.date.trim()) {
    //   errors.date = 'Date cannot be empty';
    // }

    // Validate expenses
    newReport.expenses.forEach((expense, index) => {
      if (!expense.description.trim()) {
        errors[`expenses[${index}].description`] = 'Expense description cannot be empty';
      }

      if (expense.price <= 0) {
        errors[`expenses[${index}].price`] = 'Expense price must be greater than 0';
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreate = async () => {
    
    try {
      const token = localStorage.getItem('auth_token');
      
      if (!(await(validateForm()))) {
        return;
      }
      if(token){
        await axios.post('http://localhost:8000/financial/report',
        newReport,
        {withCredentials: true,}
        )
      }
      // console.log(newReport);
      // await axios.post('http://localhost:8000/financial/report', newReport);
      else {
        console.error('JWT token not found in cookies.');
        window.location.href = '/signin';
        //router.push("/signin");
      
      } 
      window.location.href = '/financial';
    } catch (error) {
      console.error('Error creating financial report:', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-8 bg-white rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Create New Financial Report</h1>
      <form className="flex flex-col gap-4">
        {/* <label className="flex flex-col">
          <span className="mb-1">Date:</span>
          <input
            type="date"
            name="date"
            value={newReport.date}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition"
          />
          {validationErrors.date && <p className="text-red-500">{validationErrors.date}</p>}
        </label> */}

        {newReport.expenses.map((expense, index) => (
          <div key={index} className="flex gap-4">
            <label className="flex flex-col">
              <span className="mb-1">Expense Description:</span>
              <input
                type="text"
                name="description"
                value={expense.description}
                onChange={(e) => handleExpenseChange(index, e)}
                className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition"
              />
              {validationErrors[`expenses[${index}].description`] && (
                <p className="text-red-500">{validationErrors[`expenses[${index}].description`]}</p>
              )}
            </label>

            <label className="flex flex-col">
              <span className="mb-1">Expense Price:</span>
              <input
                type="number"
                name="price"
                value={expense.price}
                onChange={(e) => handleExpenseChange(index, e)}
                className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition"
              />
              {validationErrors[`expenses[${index}].price`] && (
                <p className="text-red-500">{validationErrors[`expenses[${index}].price`]}</p>
              )}
            </label>

            {index > 0 && (
              <button 
              type="button" 
              className="bg-red-500 text-white py-2 px-2 rounded-md hover:bg-red-600 hover:text-white focus:outline-none focus:ring focus:border-blue-300 transition"
              onClick={() => removeExpense(index)}>
                Remove
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={addExpense}>
          Add Expense
        </button>

        <button
          type="button"
          onClick={handleCreate}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          Create Financial Report
        </button>
      </form>
    </div>
  );
};

export default FinancialReportCreatePage;
