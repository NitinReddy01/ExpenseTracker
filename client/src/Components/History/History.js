import React, { useEffect, useState } from 'react'
import useTransactions from '../../Hooks/useTransactions';
import './history.css';

export default function History() {
  const { transactionHistory } = useTransactions();
  const history = transactionHistory();

  return (
    <div className='history'>
      <h2>Recent History</h2>
      {history.map((item) => {
        const { _id, title, amount, type } = item;
        return (
          <div key={_id} className='history-item' >
            <p style={{
              color: type === 'expense' ? 'red' : 'var(--color-green)'
            }}>
              {title}
            </p>
            <p style={{
              color: type === 'expense' ? 'red' : 'var(--color-green)'
            }}>
              {
                type === 'expense' ? `-${amount <= 0 ? 0 : amount}` : `+${amount <= 0 ? 0 : amount}`
              }
            </p>
          </div>
        );
      })}
    </div>
  )
}
