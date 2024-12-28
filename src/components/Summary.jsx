import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowDownIcon, AlertTriangle, DollarSign, CreditCard, Calendar, PiggyBank, TrendingUp } from 'lucide-react'

export function Summary({
  data
}) {
  return (
    (<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${data.totalIncome.toFixed(2)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${data.totalExpenses.toFixed(2)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Net Savings</CardTitle>
          <PiggyBank className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div
            className={`text-2xl font-bold ${data.netSavings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${Math.abs(data.netSavings).toFixed(2)}
            {data.netSavings < 0 && <ArrowDownIcon className="h-4 w-4 inline ml-1" />}
          </div>
        </CardContent>
      </Card>
      {data.deficit > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deficit</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${data.deficit.toFixed(2)}</div>
          </CardContent>
        </Card>
      )}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Budget Utilization</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <Progress value={data.budgetUtilization} className="w-full" />
          <p className="mt-2 text-sm text-muted-foreground">{data.budgetUtilization.toFixed(1)}% used</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Upcoming Bills</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${data.upcomingBillsTotal.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">Due in the next 7 days</p>
        </CardContent>
      </Card>
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px]">
            {data.recentTransactions.map((transaction, index) => (
              <div key={index} className="flex justify-between items-center mb-2">
                <span>{('name' in transaction) ? transaction.name : transaction.source}</span>
                <Badge variant={('paymentStatus' in transaction) ? 'destructive' : 'default'}>
                  ${transaction.amount.toFixed(2)}
                </Badge>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Savings Goal Progress</CardTitle>
          <PiggyBank className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <Progress value={data.savingsGoalProgress} className="w-full" />
          <p className="mt-2 text-sm text-muted-foreground">{data.savingsGoalProgress.toFixed(1)}% achieved</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Financial Health Score</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.financialHealthScore}</div>
          <p className="text-xs text-muted-foreground">Out of 100</p>
        </CardContent>
      </Card>
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Alerts & Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Budget Warning</AlertTitle>
            <AlertDescription>
              You've exceeded 90% of your monthly budget. Consider reducing expenses.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>)
  );
}

