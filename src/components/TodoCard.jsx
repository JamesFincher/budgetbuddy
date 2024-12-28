import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Pencil } from 'lucide-react'

const priorityColors = {
  low: "bg-blue-500",
  medium: "bg-yellow-500",
  high: "bg-red-500"
}

export function TodoCard({
  todo,
  onEdit,
  onToggleComplete,
  compact = false
}) {
  const [isCompleted, setIsCompleted] = useState(todo.completed)

  const handleToggleComplete = () => {
    setIsCompleted(!isCompleted)
    onToggleComplete({
      ...todo,
      completed: !isCompleted
    })
  }

  if (compact) {
    return (
      (<div className="flex items-center justify-between p-1 text-xs border-b">
        <span className={`font-semibold ${isCompleted ? 'line-through' : ''}`}>{todo.title}</span>
        <Badge className={priorityColors[todo.priority]}>
          {todo.priority}
        </Badge>
      </div>)
    );
  }

  return (
    (<Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {todo.title}
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Badge className={priorityColors[todo.priority]}>
            {todo.priority}
          </Badge>
          <Button size="icon" variant="ghost" onClick={() => onEdit(todo)}>
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`todo-${todo.id}`}
              checked={isCompleted}
              onCheckedChange={handleToggleComplete} />
            <label
              htmlFor={`todo-${todo.id}`}
              className={`text-sm ${isCompleted ? 'line-through' : ''}`}>
              {todo.title}
            </label>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Due: {todo.dueDate.toLocaleDateString()}
        </p>
        {todo.recurrence && (
          <p className="mt-1 text-xs text-muted-foreground">
            Recurs: {todo.recurrence.toText()}
          </p>
        )}
      </CardContent>
    </Card>)
  );
}

