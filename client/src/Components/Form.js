import React, { useState } from 'react'
import { styled } from 'styled-components'
import useTransactions from '../Hooks/useTransactions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from './Button';
import { plus } from '../utils/icons';

export default function Form({submitFunction,categories}) {
  const { err, setErr } = useTransactions();
  const [input, setInput] = useState({
    title: '',
    amount: '',
    date: '',
    description: '',
    category: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    submitFunction(input);
    setInput({
      title: '',
      amount: '',
      date: '',
      description: '',
      category: ''
    });
  }

  const handleChange = (e) => {
    // console.log(e.target.value);
    setInput({ ...input, [e.target.name]: e.target.value });
    setErr('');
  }

  return (
    <IncomeFromStyle onSubmit={handleSubmit}>
      {err && <p className='error'>{err}</p>}
      <div className='input-con'>
        <input required type='text' name='title' value={input.title} placeholder='Title' onChange={handleChange} />
      </div>
      <div className='input-con'>
        <input required type='text' name='amount' value={input.amount} placeholder='Amount' onChange={handleChange} />
      </div>
      <div className='input-con'>
        <DatePicker
          required
          id='date'
          placeholderText='Date'
          selected={input.date}
          dateFormat="dd/MM/yyyy"
          onChange={(d) => setInput({ ...input, date: d })}
        />
      </div>
      <div className='input-con'>
        <select required value={input.category} name='category' onChange={handleChange}>
          <option value="" disabled >Select Option</option>
          {categories.map((cat,ind)=>{
            return (<option key={ind} value={cat}>{cat}</option>);
          })}
        </select>
      </div>
      <div className='input-con' >
        <textarea required name='description' value={input.description} onChange={handleChange} placeholder='Add any description' cols='30' rows='4'  ></textarea>
      </div>
      <div className="submit-btn">
        <Button
          name={'Add Income'}
          icon={plus}
          pad={'.8rem 1.6rem'}
          rad={'30px'}
          bg={'var(--color-accent'}
          color={'#fff'}
        />
      </div>
    </IncomeFromStyle>
  )
}

const IncomeFromStyle = styled.form`
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
