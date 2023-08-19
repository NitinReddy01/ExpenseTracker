import React, { createContext, useState } from 'react'
import useAuth from '../Hooks/useAuth';
import useAxiosPriate from '../Hooks/useAxiosPrivate';

const TransactionContext=createContext();

export const TransactionProvider=(props) =>{
    const axiosPrivate=useAxiosPriate();
    const {user} = useAuth();
    const [incomes,setIncomes] = useState([]);
    const [expenses,setExpenses] = useState([]);
    const [err,setErr] = useState();

    const addIncome = async (income)=>{
        try{
            await axiosPrivate.post('/transaction/add_income',{id:user?.id,data:income});
            getIncomes();
        }
        catch (err){
            setErr(err.response.data.message);
        }
    }

    const getIncomes = async ()=>{
        try{
            const res= await axiosPrivate.get(`/transaction/get_incomes/${user?.id}`);
            setIncomes(res.data.incomes);
        }
        catch(err){
            setErr(err.response.data.message);
        }
    }

    const deleteIncome = async (id)=>{
        try{
            await axiosPrivate.delete(`/transaction/delete_income/${id}`);
            getIncomes();
        }catch (err){
            setErr(err.response.data.message);
        }
    }

    const totalIncome =()=>{
        let total=0;
        incomes.forEach((income)=>{
            total+=income.amount;
        })
        return total;
    }

    const addExpense = async (expense)=>{
        try{
            await axiosPrivate.post('/transaction/add_expense',{id:user?.id,data:expense});
            getExpenses();
        }
        catch (err){
            setErr(err.response.data.message);
        }
    }

    const getExpenses = async ()=>{
        try{
            const res= await axiosPrivate.get(`/transaction/get_expenses/${user?.id}`);
            setExpenses(res.data.expenses);
            // console.log(res.data.expenses);
        }
        catch(err){
            setErr(err.response.data.message);
        }
    }

    const deleteExpense = async (id)=>{
        try{
            await axiosPrivate.delete(`/transaction/delete_expense/${id}`);
            getExpenses();
        }catch (err){
            setErr(err.response.data.message);
        }
    }

    const totalExpenses=  ()=>{
        let total=0;
        expenses.forEach((expense)=>{
            total+=expense.amount;
        })
        return total;
    }

    const totalBalance = ()=>{
        return totalIncome()-totalExpenses();
    }

    const transactionHistory = ()=>{
        const hist=[...incomes,...expenses]
        hist.sort((a,b)=>{
            return new Date(b.createdAt)-new Date(a.createdAt);
        });
        // console.log(hist.slice(0,3));
        return hist.slice(0,3);
    }

    return (
        <TransactionContext.Provider value={
            {addIncome,getIncomes,deleteIncome,totalIncome,addExpense,getExpenses,deleteExpense,totalExpenses,
            totalBalance,transactionHistory,incomes,expenses,err,setErr}
            }>
            {props.children}
        </TransactionContext.Provider>
    )
}

export default TransactionContext;
