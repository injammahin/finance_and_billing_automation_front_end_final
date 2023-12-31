
import React from 'react';
import { StockItemDto } from '../../../faba/backend/src/inventory/dto/stock-item.dto';

interface InventoryTableProps {
  inventory: StockItemDto[];
  onDelete: (itemCode: string) => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({ inventory, onDelete }) => {
  return (
    <table className="border-collapse border w-full">
      <thead>
        <tr>
          <th className="border p-2">Item Code</th>
          <th className="border p-2">Name</th>
          <th className="border p-2">Price</th>
          <th className="border p-2">Quantity</th>
          <th className="border p-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {inventory.map((item) => (
          <tr key={item.itemCode}>
            <td className="border p-2">{item.itemCode}</td>
            <td className="border p-2">{item.name}</td>
            <td className="border p-2">{item.price}</td>
            <td className="border p-2">{item.quantity}</td>
            <td className="border p-2">
              <button
                className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 transition"
                onClick={() => onDelete(item.itemCode)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InventoryTable;
