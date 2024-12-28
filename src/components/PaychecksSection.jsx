import { useState } from 'react'
import { PaycheckCard } from './PaycheckCard'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PaycheckForm } from './PaycheckForm'

export function PaychecksSection({
  paychecks,
  onAddPaycheck,
  onEditPaycheck
}) {
  const [isAddingPaycheck, setIsAddingPaycheck] = useState(false)
  const [editingPaycheck, setEditingPaycheck] = useState(null)

  const handleAddPaycheck = (paycheck) => {
    onAddPaycheck(paycheck)
    setIsAddingPaycheck(false)
  }

  const handleEditPaycheck = (paycheck) => {
    onEditPaycheck(paycheck)
    setEditingPaycheck(null)
  }

  return (
    (<div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Paychecks</h2>
        <Dialog
          open={isAddingPaycheck || editingPaycheck !== null}
          onOpenChange={(open) => {
            if (!open) {
              setIsAddingPaycheck(false)
              setEditingPaycheck(null)
            }
          }}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsAddingPaycheck(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Paycheck
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingPaycheck ? 'Edit Paycheck' : 'Add New Paycheck'}</DialogTitle>
            </DialogHeader>
            <PaycheckForm
              onSubmit={editingPaycheck ? handleEditPaycheck : handleAddPaycheck}
              initialPaycheck={editingPaycheck || undefined} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {paychecks.map(paycheck => (
          <PaycheckCard key={paycheck.id} paycheck={paycheck} onEdit={setEditingPaycheck} />
        ))}
      </div>
    </div>)
  );
}

