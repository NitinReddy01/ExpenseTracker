import {dashboard, expenses, transactions, trend} from './icons';

export const  menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        link: '/dashboard',
        active:false
    },
    {
        id: 2,
        title: "View Transactions",
        icon: transactions,
        link: "/dashboard",
        active:false
    },
    {
        id: 3,
        title: "Incomes",
        icon: trend,
        link: "/incomes",
        active:false
    },
    {
        id: 4,
        title: "Expenses",
        icon: expenses,
        link: "/expense",
        active:false
    },
]