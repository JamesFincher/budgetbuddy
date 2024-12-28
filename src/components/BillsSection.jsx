import { useState } from 'react'
import { BillCard } from './BillCard'
import { MonthlyView } from './MonthlyView'
import { Button } from '@/components/ui/button'
import { PlusCircle, List, Calendar } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { BillForm } from './BillForm'

export function BillsSection({
  bills,
  onAddBill,
  onEditBill,
  onTogglePaid
}) {
  const [isAddingBill, setIsAddingBill] = useState(false)
  const [editingBill, setEditingBill] = useState(null)
  const [viewMode, setViewMode] = useState('list')

  const handleAddBill = (bill) => {
    onAddBill(bill)
    setIsAddingBill(false)
  }

  const handleEditBill = (bill) => {
    onEditBill(bill)
    setEditingBill(null)
  }

  return (
    (<div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Bills</h2>
        <div className="flex space-x-2">
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}>
            <List className="mr-2 h-4 w-4" />
            List
          </Button>
          <Button
            variant={viewMode === 'calendar' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('calendar')}>
            <Calendar className="mr-2 h-4 w-4" />
            Calendar
          </Button>
          <Dialog
            open={isAddingBill || editingBill !== null}
            onOpenChange={(open) => {
              if (!open) {
                setIsAddingBill(false)
                setEditingBill(null)
              }
            }}>
            <DialogTrigger asChild>
              <Button onClick={() => setIsAddingBill(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Bill
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{editingBill ? 'Edit Bill' : 'Add New Bill'}</DialogTitle>
              </DialogHeader>
              <BillForm
                onSubmit={editingBill ? handleEditBill : handleAddBill}
                initialBill={editingBill || undefined} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {viewMode === 'list' ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bills.map(bill => (
            <BillCard
              key={bill.id}
              bill={bill}
              onEdit={setEditingBill}
              onTogglePaid={onTogglePaid} />
          ))}
        </div>
      ) : (
        <MonthlyView
          bills={bills}
          todos={[]}
          paychecks={[]}
          onEditBill={setEditingBill}
          onTogglePaid={onTogglePaid}
          onEditTodo={() => {}}
          onToggleCompleteTodo={() => {}}
          onEditPaycheck={() => {}} />
      )}
    </div>)
  );
}

