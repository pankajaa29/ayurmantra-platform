import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: todos, error } = await supabase.from('todos').select()

  if (error) {
    return <div className="p-8 text-red-500">Error fetching todos: {error.message}</div>
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Supabase Connection Test</h1>
      {todos && todos.length > 0 ? (
        <ul className="space-y-3">
          {todos.map((todo: any) => (
            <li key={todo.id} className="p-4 bg-white rounded-lg shadow border border-gray-100">
              {todo.name || todo.title}
            </li>
          ))}
        </ul>
      ) : (
        <div className="p-8 bg-gray-50 rounded-lg text-center text-gray-500">
          No todos found in the database. But the connection was successful!
        </div>
      )}
    </div>
  )
}
