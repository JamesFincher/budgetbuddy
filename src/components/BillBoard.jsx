'use client';
import { useState } from 'react'
import { MonthlyView } from './MonthlyView'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function BillBoard({
  bills,
  todos,
  paychecks,
  onEditBill,
  onTogglePaid,
  onEditTodo,
  onToggleCompleteTodo,
  onEditPaycheck
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState('list')

  const filteredBills = bills.filter(bill =>
    bill.name.toLowerCase().includes(searchTerm.toLowerCase()))
  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase()))
  const filteredPaychecks = paychecks.filter(paycheck =>
    paycheck.source.toLowerCase().includes(searchTerm.toLowerCase()))

  if (viewMode === 'list') {
    return null // List view is now handled by separate components
  }

  return (
    (<div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64" />
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            onClick={() => setViewMode('list')}>
            List View
          </Button>
          <Button
            variant={viewMode === 'monthly' ? 'default' : 'outline'}
            onClick={() => setViewMode('monthly')}>
            Monthly View
          </Button>
        </div>
      </div>
      <MonthlyView
        bills={filteredBills}
        todos={filteredTodos}
        paychecks={filteredPaychecks}
        onEditBill={onEditBill}
        onTogglePaid={onTogglePaid}
        onEditTodo={onEditTodo}
        onToggleCompleteTodo={onToggleCompleteTodo}
        onEditPaycheck={onEditPaycheck} />
    </div>)
  );
}

