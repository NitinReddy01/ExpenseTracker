import React, { useEffect } from 'react';
import useTransactions from '../../Hooks/useTransactions';
import History from '../History/History';
import { dollar } from '../../utils/icons';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';
import './dashboard.css';

export default function Dashboard() {
  const { totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } =
    useTransactions();

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    getExpenses();
    getIncomes();
  }, [])

  return (
    <div className='dashboard'>
      <div className='innerlayout'>
        <h1>All Transactions</h1>
        <div className='stats'>
          <div className='chart'>
            <div className='amount'>
              <div className='income'>
                <h2>Total Income</h2>
                <p>
                  {dollar} {totalIncome()}
                </p>
              </div>
              <div className='expense'>
                <h2>Total Expense</h2>
                <p>
                  {dollar} {totalExpenses()}
                </p>
              </div>
              <div className='balance'>
                <h2>Total Balance</h2>
                <p>
                  {dollar} {totalBalance()}
                </p>
              </div>
            </div>
          </div>
          <div className='history'>
            <History />
            <h2 className='salary-title'>Min <span>Salary</span> Max</h2>
            <div className='salary-item'>
              <p>
                ${Math.min(...incomes.map(item => item.amount))}
              </p>
              <p>
                ${Math.max(...incomes.map(item => item.amount))}
              </p>
            </div>
            <h2 className='salary-title'>Min <span>Expense</span> Max</h2>
            <div className='salary-item'>
              <p>
                ${Math.min(...expenses.map(item => item.amount))}
              </p>
              <p>
                ${Math.max(...expenses.map(item => item.amount))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
