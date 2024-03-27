"use client"
import React from 'react'
import {
 Chart as ChartJS,
 CategoryScale,
 LinearScale,
 Tooltip,
 PointElement,
 LineElement,
 BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { InterfaceExpense } from '@/types/types';
// Register ChartJS components using ChartJS.register
ChartJS.register(
 CategoryScale,
 LinearScale,
 PointElement,
 LineElement,
 BarElement,
 Tooltip
);

const BarChar = ({expenses}:{expenses:InterfaceExpense[]}) => {
    const groupedExpenses: { [key: string]: number } = {}
    expenses?.forEach((expense) => {
      const date = new Date(expense.createdAt).toLocaleDateString();
      if (groupedExpenses[date]) {
        groupedExpenses[date] += expense.amount;
      } else {
        groupedExpenses[date] = expense.amount;
      }
    });
    
    const labels = Object.keys(groupedExpenses);
    const amount = Object.values(groupedExpenses);

    const data = {
        labels: labels,
        datasets: [
          {
            label: 'Price',
            data:amount,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
    
      return (
        <div className='w-full h-64'>
          <Bar data={data} />
        </div>
      );
}

export default BarChar