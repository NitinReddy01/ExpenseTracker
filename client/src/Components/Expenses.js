import React, { useEffect } from 'react'
import useTransactions from '../Hooks/useTransactions';
import { InnerLayout } from '../Styles/Layout';
import TransactionItem from './TransactionItem';
import { styled } from 'styled-components';
import Form from './Form';

export default function Expenses() {
  const {expenses,totalExpenses,deleteExpense,getExpenses,addExpense}=useTransactions();
  const categories=["education","food","health","subscriptions","takeaways","clothing","travelling","other"];
  useEffect(()=>{
    getExpenses();
  },[])  
  return (
    <IncomeStyle>
      <InnerLayout>
        <h1>Expenses</h1>
        <h2 className='total'>Total Expenses: <span>${totalExpenses()}</span></h2>
        <div className='content'>
          <div className='form'>
            <Form submitFunction={addExpense} categories={categories} butName="Add Expense" />
          </div>
          <div className='incomes'>
            {expenses.map((expense)=>{
              // console.log(expense);
              const {_id,title,amount,date,category,description,type} = expense;
              return <TransactionItem
                       key={_id}
                       id={_id}
                       title={title}
                       description={description}
                       amount={amount}
                       date={date}
                       category={category}
                       type={type}
                       indicator="var(--color-green)"
                       deleteItem={deleteExpense} 
                        />
            })}
          </div>
        </div>
      </InnerLayout>
    </IncomeStyle>   
  )
}
const IncomeStyle=styled.div`
  display: flex;
  overflow: auto;
  .total{
      display: flex;
      justify-content: center;
      align-items: center;
      background: #FCF6F9;
      border: 2px solid #FFFFFF;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      border-radius: 20px;
      padding: 1rem;
      margin: 1rem 0;
      font-size: 2rem;
      gap: .5rem;
      span{
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--color-green);
      }
  }
  .content{
      display: flex;
      gap: 2rem;
      .incomes{
          flex: 1;
      }
  }
`;