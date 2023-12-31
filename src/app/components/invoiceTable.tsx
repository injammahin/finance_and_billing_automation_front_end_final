
import React from 'react';

interface InvoiceProps {
  id: string;
  totalExpense: number;
}

const invoiceTable: React.FC<InvoiceProps> = ({ id, totalExpense }) => {
  return (
    <li className="border p-4 mb-4 rounded-md bg-gray-100 hover:bg-gray-200">
      {`ID: ${id}, Total Expense: ${totalExpense}`}
    </li>
  );
};

export default invoiceTable;
