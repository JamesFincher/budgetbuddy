'use client';
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { RRule } from 'rrule'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  dueDate: z.date(),
  notes: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']),
  isRecurring: z.boolean().default(false),
  frequency: z.enum(['NONE', 'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY']).default('NONE'),
  interval: z.number().min(1).optional(),
})

export function TodoForm({
  onSubmit,
  initialTodo
}) {
  const [isRecurring, setIsRecurring] = useState(initialTodo?.recurrence !== null)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialTodo
      ? {
          ...initialTodo,
          dueDate: new Date(initialTodo.dueDate),
          isRecurring: initialTodo.recurrence !== null,
          frequency: initialTodo.recurrence?.options.freq || 'NONE',
          interval: initialTodo.recurrence?.options.interval || 1,
        }
      : {
          title: '',
          dueDate: new Date(),
          notes: '',
          priority: 'medium',
          isRecurring: false,
          frequency: 'NONE',
          interval: 1,
        },
  })

  const handleSubmit = (values) => {
    const todo = {
      id: initialTodo?.id || Date.now().toString(),
      title: values.title,
      completed: initialTodo?.completed || false,
      dueDate: values.dueDate,
      notes: values.notes || '',
      priority: values.priority,
      recurrence: values.isRecurring && values.frequency !== 'NONE' && values.interval
        ? new RRule({
            freq: RRule[values.frequency],
            interval: values.interval,
            dtstart: values.dueDate,
          })
        : null,
    }
    onSubmit(todo)
  }

  return (
    (<Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )} />
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Due Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  onChange={(e) => field.onChange(new Date(e.target.value))} />
              </FormControl>
            </FormItem>
          )} />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )} />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
            </FormItem>
          )} />
        <FormField
          control={form.control}
          name="isRecurring"
          render={({ field }) => (
            <FormItem
              className="flex flex-row items-center justify-between space-y-0 rounded-lg border p-4">
              <FormLabel>Recurring</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked)
                    setIsRecurring(checked)
                  }} />
              </FormControl>
            </FormItem>
          )} />
        {isRecurring && (
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frequency</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="NONE">Not recurring</SelectItem>
                      <SelectItem value="DAILY">Daily</SelectItem>
                      <SelectItem value="WEEKLY">Weekly</SelectItem>
                      <SelectItem value="MONTHLY">Monthly</SelectItem>
                      <SelectItem value="YEARLY">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )} />
            <FormField
              control={form.control}
              name="interval"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interval</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value, 10))} />
                  </FormControl>
                </FormItem>
              )} />
          </div>
        )}
        <Button type="submit" className="w-full">Save Todo</Button>
      </form>
    </Form>)
  );
}

