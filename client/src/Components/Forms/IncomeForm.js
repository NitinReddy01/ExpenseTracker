import React, { useState } from 'react'
import { styled } from 'styled-components'
import useTransactions from '../../Hooks/useTransactions';

export default function IncomeForm() {
  const {addIncome,err,setErr} = useTransactions();
  const [input,setInput] = useState({
    title:'',
    amount:'',
    date:'',
    description:'',
    category:''
  })

  const handleSubmit=(e)=>{
    e.preventDefault();
  }

  const handleChange=(e)=>{
    setInput({...input, [e.target.name]: e.target.value});
  }

  return (
    <IncomeFromStyle onSubmit={handleSubmit}>
      <div className='input-con'>
        <input type='text' name='title' value={input.title} placeholder='Title' onChange={handleChange} />
      </div>
      <div className='input-con'>
        <input type='text' name='amount' value={input.amount} placeholder='Amount' onChange={handleChange} />
      </div>
    </IncomeFromStyle>
  )
}

const IncomeFromStyle=styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  input, textarea, select{
      font-family: inherit;
      font-size: inherit;
      outline: none;
      border: none;
      padding: .5rem 1rem;
      border-radius: 5px;
      border: 2px solid #fff;
      background: transparent;
      resize: none;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      color: rgba(34, 34, 96, 0.9);
      &::placeholder{
          color: rgba(34, 34, 96, 0.4);
      }
  }
  .input-con{
      input{
          width: 100%;
      }
  }

  .selects{
      display: flex;
      justify-content: flex-end;
      select{
          color: rgba(34, 34, 96, 0.4);
          &:focus, &:active{
              color: rgba(34, 34, 96, 1);
          }
      }
  }

  .submit-btn{
      button{
          box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
          &:hover{
              background: var(--color-green) !important;
          }
      }
  }
`;
