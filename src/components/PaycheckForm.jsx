'use client';
import { useState, useEffect } from 'react'
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
  source: z.string().min(1, 'Source is required'),
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  date: z.date(),
  notes: z.string().optional(),
  isRecurring: z.boolean().default(false),
  frequency: z.enum(['NONE', 'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY']).default('NONE'),
  interval: z.number().min(1).optional(),
  tithe: z.number(),
})

export function PaycheckForm({
  onSubmit,
  initialPaycheck
}) {
  const [isRecurring, setIsRecurring] = useState(initialPaycheck?.recurrence !== null)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialPaycheck
      ? {
          ...initialPaycheck,
          date: new Date(initialPaycheck.date),
          isRecurring: initialPaycheck.recurrence !== null,
          frequency: initialPaycheck.recurrence?.options.freq || 'NONE',
          interval: initialPaycheck.recurrence?.options.interval || 1,
        }
      : {
          source: '',
          amount: 0,
          date: new Date(),
          notes: '',
          isRecurring: false,
          frequency: 'NONE',
          interval: 1,
          tithe: 0,
        },
  })

  useEffect(() => {
    const amount = form.getValues('amount');
    const tithe = Math.round(amount * 0.1 / 10) * 10;
    form.setValue('tithe', tithe);
  }, [form.watch('amount')]);

  const handleSubmit = (values) => {
    const tithe = Math.round(values.amount * 0.1 / 10) * 10;
    const paycheck = {
      id: initialPaycheck?.id || Date.now().toString(),
      source: values.source,
      amount: values.amount,
      date: values.date,
      notes: values.notes || '',
      recurrence: values.isRecurring && values.frequency !== 'NONE' && values.interval
        ? new RRule({
            freq: RRule[values.frequency],
            interval: values.interval,
            dtstart: values.date,
          })
        : null,
      tithe: tithe,
    }
    onSubmit(paycheck)
  }

  return (
    (<Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="source"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Source</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )} />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))} />
              </FormControl>
            </FormItem>
          )} />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
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
        <FormField
          control={form.control}
          name="tithe"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tithe (10%)</FormLabel>
              <FormControl>
                <Input type="number" {...field} readOnly />
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
        <Button type="submit" className="w-full">Save Paycheck</Button>
      </form>
    </Form>)
  );
}

