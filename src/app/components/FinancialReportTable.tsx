import React from 'react';
import { formatCurrency } from '../utils/format';
import { FinancialReport } from '../../../faba/backend/src/report/entities/financial-report.entity'; // Adjust path if needed

interface FinancialReportTableProps {
  reports: FinancialReport[] | null | undefined;
}

const FinancialReportTable: React.FC<FinancialReportTableProps> = ({ reports }) => {
  if (!reports) {
    return <p>Loading reports...</p>;
  }

  const navigateToExpenseChart = () => {
    window.location.href = 'financial/ExpenseChart';
  };
  const navigateToCreate = () => {
    window.location.href = 'financial/create';
  };

  return (
    <div className="container mx-auto mt-8 p-8 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-3xl font-bold mb-6">Financial Reports</h2>
      <div>
        <button
          onClick={navigateToExpenseChart}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 flex justify-end mt-4"
        >
          View Charts
        </button>
        <button
          onClick={navigateToCreate}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 flex justify-end mt-4"
        >
          Create New Financial Report
        </button>
      </div>
      <br/>
      <table className="w-full table-fixed">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Date</th>
            <th className="border p-2">Total Expense</th>
            <th className="border p-2">Description</th>
            {/* <th className="border p-2">View Chart</th> */}
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => {
            const isDateValid = report.date;

            return (
              <tr key={report.id}>
                <td className="border p-2">
                  {isDateValid
                    ? new Date(report.date).toLocaleDateString()
                    : 'Invalid Date'}
                </td>
                <td className="border p-2">{report.totalExpense}</td>
                <td className="border p-2">
                  {report.expenses.map((expense: any) => (
                    <span key={expense.id}>{expense.description} = {expense.price} <br/></span>
                  ))}
                </td>
                {/* <td className="border p-2"> */}
                  {/* Call navigateToExpenseChart when the button is clicked */}
                  {/* <button onClick={navigateToExpenseChart}>View Chart</button> */}
                {/* </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FinancialReportTable;
