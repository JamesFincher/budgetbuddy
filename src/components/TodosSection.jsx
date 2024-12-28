import { useState } from 'react'
import { TodoCard } from './TodoCard'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { TodoForm } from './TodoForm'

export function TodosSection({
  todos,
  onAddTodo,
  onEditTodo,
  onToggleCompleteTodo
}) {
  const [isAddingTodo, setIsAddingTodo] = useState(false)
  const [editingTodo, setEditingTodo] = useState(null)

  const handleAddTodo = (todo) => {
    onAddTodo(todo)
    setIsAddingTodo(false)
  }

  const handleEditTodo = (todo) => {
    onEditTodo(todo)
    setEditingTodo(null)
  }

  return (
    (<div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Todos</h2>
        <Dialog
          open={isAddingTodo || editingTodo !== null}
          onOpenChange={(open) => {
            if (!open) {
              setIsAddingTodo(false)
              setEditingTodo(null)
            }
          }}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsAddingTodo(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Todo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingTodo ? 'Edit Todo' : 'Add New Todo'}</DialogTitle>
            </DialogHeader>
            <TodoForm
              onSubmit={editingTodo ? handleEditTodo : handleAddTodo}
              initialTodo={editingTodo || undefined} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {todos.map(todo => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onEdit={setEditingTodo}
            onToggleComplete={onToggleCompleteTodo} />
        ))}
      </div>
    </div>)
  );
}

