import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [expenses, setExpenses] = useState([]);

  // Load expenses from localStorage
  useEffect(() => {
    const data = localStorage.getItem("myExpenses");
    if (data) {
      setExpenses(JSON.parse(data));
    }
  }, []);

  // Save expenses to localStorage
  useEffect(() => {
    localStorage.setItem("myExpenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleAdd = () => {
    if (amount === '' || description === '' || date === '') {
      alert("Please fill all fields");
      return;
    }

    const newExpense = {
      id: Date.now(),
      amount: Number(amount),
      description: description,
      date: date
    }

    setExpenses([...expenses, newExpense]);

    setAmount('');
    setDescription('');
    setDate('');
  }

  const handleDelete = (id) => {
    const filteredExpenses = expenses.filter((item) => item.id !== id);
    setExpenses(filteredExpenses);
  }

  const totalExpense = expenses.reduce((acc, item) => acc + item.amount, 0);

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <h2>Total Expense: ₹ {totalExpense}</h2>

      <div>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button onClick={handleAdd}>Add</button>
      </div>

      <h3>Expenses:</h3>
      {expenses.length === 0 && <p>No expenses added</p>}

      {expenses.map((item) => (
        <div key={item.id} className="expense-item">
          <p>{item.date} - ₹ {item.amount} - {item.description}</p>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
