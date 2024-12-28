import { useState } from 'react'
import { BillCard } from './BillCard'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function MonthlyView({
  bills,
  onEditBill,
  onTogglePaid
}) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const filteredBills = bills.filter(bill => {
    const billDate = new Date(bill.dueDate)
    return billDate.getMonth() === currentDate.getMonth() && billDate.getFullYear() === currentDate.getFullYear();
  })

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  return (
    (<div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button onClick={prevMonth} variant="outline" size="icon">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <Button onClick={nextMonth} variant="outline" size="icon">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-semibold">
            {day}
          </div>
        ))}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1
          const dayBills = filteredBills.filter(bill => new Date(bill.dueDate).getDate() === day)
          return (
            (<div key={day} className="border p-2 h-40 overflow-y-auto">
              <div className="text-sm font-semibold mb-1">{day}</div>
              {dayBills.map(bill => (
                <BillCard
                  key={bill.id}
                  bill={bill}
                  onEdit={onEditBill}
                  onTogglePaid={onTogglePaid}
                  compact />
              ))}
            </div>)
          );
        })}
      </div>
    </div>)
  );
}

