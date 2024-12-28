'use client';
import { useState, useEffect } from 'react'
import { Layout } from '@/components/Layout'
import { Summary } from '@/components/Summary'
import { BillsSection } from '@/components/BillsSection'
import { TodosSection } from '@/components/TodosSection'
import { PaychecksSection } from '@/components/PaychecksSection'
import { RRule } from 'rrule'

export default function Home() {
  const [bills, setBills] = useState([])
  const [todos, setTodos] = useState([])
  const [paychecks, setPaychecks] = useState([])
  const [summaryData, setSummaryData] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    netSavings: 0,
    deficit: 0,
    budgetUtilization: 0,
    upcomingBillsTotal: 0,
    recentTransactions: [],
    savingsGoalProgress: 0,
    financialHealthScore: 0
  })

  useEffect(() => {
    // Fetch data from API or database
    // For now, we'll use mock data
    const mockBills = [
      {
        id: '1',
        name: 'Netflix Subscription',
        amount: 14.99,
        dueDate: new Date('2024-03-15'),
        recurrence: new RRule({ freq: RRule.MONTHLY, interval: 1 }),
        notes: 'Family plan',
        priority: 'low',
        paymentStatus: 'paid',
        paymentMethod: 'Credit Card'
      },
      {
        id: '2',
        name: 'Rent',
        amount: 1500,
        dueDate: new Date('2024-03-01'),
        recurrence: new RRule({ freq: RRule.MONTHLY, interval: 1 }),
        notes: 'Due on the 1st of each month',
        priority: 'high',
        paymentStatus: 'unpaid',
        paymentMethod: 'Bank Transfer'
      },
    ]
    setBills(mockBills)

    const mockTodos = [
      {
        id: '1',
        title: 'Buy groceries',
        completed: false,
        dueDate: new Date('2024-03-10'),
        recurrence: new RRule({ freq: RRule.WEEKLY, interval: 1 }),
        notes: 'Remember to bring reusable bags',
        priority: 'medium'
      },
      {
        id: '2',
        title: 'Call mom',
        completed: false,
        dueDate: new Date('2024-03-05'),
        recurrence: null,
        notes: '',
        priority: 'low'
      },
    ]
    setTodos(mockTodos)

    const mockPaychecks = [
      {
        id: '1',
        source: 'Main Job',
        amount: 2000,
        date: new Date('2024-03-15'),
        recurrence: new RRule({ freq: RRule.MONTHLY, interval: 1 }),
        notes: 'Direct deposit',
        tithe: 200
      },
      {
        id: '2',
        source: 'Side Gig',
        amount: 500,
        date: new Date('2024-03-20'),
        recurrence: null,
        notes: 'Project completion bonus',
        tithe: 50
      },
    ]
    setPaychecks(mockPaychecks)
  }, [])

  useEffect(() => {
    // Calculate summary data based on bills, todos, and paychecks
    const totalIncome = paychecks.reduce((sum, paycheck) => sum + paycheck.amount, 0);
    const totalExpenses = bills.reduce((sum, bill) => sum + bill.amount, 0);
    
    setSummaryData(prev => ({
      ...prev,
      totalIncome,
      totalExpenses,
      netSavings: totalIncome - totalExpenses
    }));
  }, [bills, paychecks]);

  const handleAddItem = (item) => {
    if ('paymentStatus' in item) {
      setBills([...bills, item])
    } else if ('completed' in item) {
      setTodos([...todos, item])
    } else {
      setPaychecks([...paychecks, item])
    }
  }

  const handleEditItem = (updatedItem) => {
    if ('paymentStatus' in updatedItem) {
      setBills(bills.map(bill => bill.id === updatedItem.id ? updatedItem : bill))
    } else if ('completed' in updatedItem) {
      setTodos(todos.map(todo => todo.id === updatedItem.id ? updatedItem : todo))
    } else {
      setPaychecks(
        paychecks.map(paycheck => paycheck.id === updatedItem.id ? updatedItem : paycheck)
      )
    }
  }

  const handleTogglePaid = (updatedBill) => {
    setBills(bills.map(bill => bill.id === updatedBill.id ? updatedBill : bill))
  }

  const handleToggleCompleteTodo = (updatedTodo) => {
    setTodos(todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo))
  }

  return (
    (<Layout>
      <div className="space-y-8">
        <BillsSection
          bills={bills}
          onAddBill={handleAddItem}
          onEditBill={handleEditItem}
          onTogglePaid={handleTogglePaid} />
        <TodosSection
          todos={todos}
          onAddTodo={handleAddItem}
          onEditTodo={handleEditItem}
          onToggleCompleteTodo={handleToggleCompleteTodo} />
        <PaychecksSection
          paychecks={paychecks}
          onAddPaycheck={handleAddItem}
          onEditPaycheck={handleEditItem} />
        <div>
          <h2 className="text-2xl font-bold mb-4">Financial Summary</h2>
          <Summary data={summaryData} />
        </div>
      </div>
    </Layout>)
  );
}

