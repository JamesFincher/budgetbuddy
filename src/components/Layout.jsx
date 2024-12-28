import { useState } from 'react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Receipt, CalendarDays, CheckSquare, DollarSign, Menu, X } from 'lucide-react'
import Link from 'next/link'

export function Layout({
  children
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Bills', href: '/bills', icon: Receipt },
    { name: 'Calendar', href: '/calendar', icon: CalendarDays },
    { name: 'Todos', href: '/todos', icon: CheckSquare },
    { name: 'Paychecks', href: '/paychecks', icon: DollarSign },
  ]

  return (
    (<div className="flex h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
        <div
          className="flex items-center justify-between h-16 px-6 bg-gray-800 text-white">
          <span className="text-2xl font-semibold">BillBuddy</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden">
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="mt-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100">
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden">
                <Menu className="h-6 w-6" />
              </Button>
              <div className="flex items-center">
                <span className="text-xl font-semibold text-gray-800">Dashboard</span>
              </div>
              <div className="flex items-center">
                {/* Add user menu or other top-right items here */}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>)
  );
}

