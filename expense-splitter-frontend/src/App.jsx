import { useState } from "react";
import { AddExpense } from "./AddExpense";
import { AddMember } from "./AddMember";
import './App.css';
import { Balances } from "./Balances";
import { CreateGroup } from "./CreateGroup";
import { Login } from "./Login";
import { Register } from "./Register";

export const App = () => {
  const [currentPage, setCurrentPage] = useState('register');

  return (
  <div className="container">
    <nav>
      <button onClick={() => setCurrentPage('register')}>Register</button>
      <button onClick={() => setCurrentPage('login')}>Login</button>
      <button onClick={() => setCurrentPage('creategroup')}>Create Group</button>
      <button onClick={() => setCurrentPage('addmember')}>Add Member</button>
      <button onClick={() => setCurrentPage('addexpense')}>Add Expense</button>
      <button onClick={() => setCurrentPage('balances')}>Balances</button>
    </nav>

    {currentPage === 'register' && <Register />}
    {currentPage === 'login' && <Login />}
    {currentPage === 'creategroup' && <CreateGroup />}
    {currentPage === 'addmember' && <AddMember />}
    {currentPage === 'addexpense' && <AddExpense />}
    {currentPage === 'balances' && <Balances />}
  </div>
);
};

export default App;