
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FinancialReport } from '../../../faba/backend/src/report/entities/financial-report.entity'; // Adjust path if needed

interface ExpenseBarChartProps {
    reports: FinancialReport[] | null | undefined;
  }
  
  const ExpenseBarChart: React.FC<ExpenseBarChartProps> = ({ reports }) => {
    const [groupBy, setGroupBy] = useState<string>('day');
  
    if (!reports) {
      return <p>Loading chart...</p>;
    }
  
    const groupData = (data: FinancialReport[], groupBy: string) => {
        return data.reduce((acc, report) => {
          const dateKey =
            groupBy === 'day'
              ? new Date(report.date).toLocaleDateString()
              : new Date(report.date).toLocaleDateString('default', { month: 'long' });
      
          if (!acc[dateKey]) {
            acc[dateKey] = { date: dateKey, totalExpense: 0 };
          }
      
          const expense = parseFloat(report.totalExpense as any); // 'as any' to avoid TypeScript error
      
          acc[dateKey].totalExpense += isNaN(expense) ? 0 : expense; // Check for NaN and handle it
      
          return acc;
        }, {} as Record<string, { date: string; totalExpense: number }>);
      };
  
    const groupedData: { [key: string]: { date: string; totalExpense: number } } = groupData(reports, groupBy);
  
    const chartData = Object.values(groupedData);
  
    console.log('Grouped Data:', groupedData);
    console.log('Chart Data:', chartData);
  return (
    <div>
      <div className="mb-4">
        <label className="mr-2">Group by:</label>
        <select
          value={groupBy}
          onChange={(e) => setGroupBy(e.target.value)}
          className="px-2 py-1 border rounded-md bg-white focus:outline-none focus:border-blue-500 transition"
        >
          <option value="day">Day</option>
          <option value="month">Month</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="date" />
          <YAxis  dataKey="totalExpense" />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalExpense" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseBarChart;
