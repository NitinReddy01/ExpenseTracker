import React, { useEffect } from 'react'
import { styled } from 'styled-components'
import useTransactions from '../Hooks/useTransactions';
import {InnerLayout} from '../Styles/Layout';
import TransactionItem from './TransactionItem';
import IncomeForm from './Form';

export default function Incomes() {
  const {incomes,totalIncome,deleteIncome,getIncomes,addIncome}=useTransactions();
  const categories=["salary","investment","freelancing","bitcoin","bank transfer","youtube","other"];
  useEffect(()=>{
    getIncomes();
  },[])
  return (
    <IncomeStyle>
      <InnerLayout>
        <h1>Incomes</h1>
        <h2 className='total'>Total Income: <span>${totalIncome()}</span></h2>
        <div className='content'>
          <div className='form'>
            <IncomeForm submitFunction={addIncome} categories={categories} butName="Add Income" />
          </div>
          <div className='incomes'>
            {incomes.map((income)=>{
              // console.log(income);
              const {_id,title,amount,date,category,description,type} = income;
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
                       deleteItem={deleteIncome} 
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