import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Pencil } from 'lucide-react'

const priorityColors = {
  low: "bg-blue-500",
  medium: "bg-yellow-500",
  high: "bg-red-500"
}

export function BillCard({
  bill,
  onEdit,
  onTogglePaid,
  compact = false
}) {
  const [isPaid, setIsPaid] = useState(bill.paymentStatus === 'paid')

  const handleTogglePaid = () => {
    setIsPaid(!isPaid)
    onTogglePaid({
      ...bill,
      paymentStatus: isPaid ? 'unpaid' : 'paid'
    })
  }

  if (compact) {
    return (
      (<div className="flex items-center justify-between p-1 text-xs border-b">
        <span className="font-semibold">{bill.name}</span>
        <Badge className={priorityColors[bill.priority]}>
          ${bill.amount.toFixed(2)}
        </Badge>
      </div>)
    );
  }

  return (
    (<Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {bill.name}
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Badge className={priorityColors[bill.priority]}>
            {bill.priority}
          </Badge>
          <Button size="icon" variant="ghost" onClick={() => onEdit(bill)}>
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">${bill.amount.toFixed(2)}</div>
          <div className="flex items-center space-x-2">
            <span className="text-sm">Paid</span>
            <Switch checked={isPaid} onCheckedChange={handleTogglePaid} />
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Due: {bill.dueDate.toLocaleDateString()}
        </p>
        {bill.recurrence && (
          <p className="mt-1 text-xs text-muted-foreground">
            Recurs: {bill.recurrence.toText()}
          </p>
        )}
      </CardContent>
    </Card>)
  );
}

