import create from 'zustand'
import { Todo } from '../types'

interface TodoStore {
  todos: Todo[]
  addTodo: (todo: Todo) => void
  toggleTodo: (todoId: Todo['id']) => void
  removeTodo: (todoId: Todo['id']) => void
}

const useTodos = create<TodoStore>((set) => ({
  todos: [],
  addTodo: (todo) => set((state) => ({ todos: [todo, ...state.todos] })),
  toggleTodo: (todoId) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
  removeTodo: (todoId) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== todoId),
    })),
}))

export default useTodos
