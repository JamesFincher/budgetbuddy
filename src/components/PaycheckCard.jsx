import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pencil, DollarSign } from 'lucide-react'

export function PaycheckCard({
  paycheck,
  onEdit,
  compact = false
}) {
  if (compact) {
    return (
      (<div className="flex items-center justify-between p-1 text-xs border-b">
        <span className="font-semibold">{paycheck.source}</span>
        <div className="flex items-center space-x-2">
          <span className="font-bold text-green-600">${paycheck.amount.toFixed(2)}</span>
          <span className="text-blue-600">(Tithe: ${paycheck.tithe})</span>
        </div>
      </div>)
    );
  }

  return (
    (<Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {paycheck.source}
        </CardTitle>
        <Button size="icon" variant="ghost" onClick={() => onEdit(paycheck)}>
          <Pencil className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-green-600">${paycheck.amount.toFixed(2)}</div>
          <div className="flex items-center space-x-1 text-blue-600">
            <DollarSign className="h-4 w-4" />
            <span className="font-semibold">Tithe: ${paycheck.tithe}</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Date: {paycheck.date.toLocaleDateString()}
        </p>
        {paycheck.recurrence && (
          <p className="mt-1 text-xs text-muted-foreground">
            Recurs: {paycheck.recurrence.toText()}
          </p>
        )}
        {paycheck.notes && (
          <p className="mt-2 text-sm">{paycheck.notes}</p>
        )}
      </CardContent>
    </Card>)
  );
}

