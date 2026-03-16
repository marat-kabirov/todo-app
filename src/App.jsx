import './App.css'
import { useState, useEffect } from 'react'


function App() {

  const [filter, setFilter] = useState('all')
  const [input, setInput] = useState('')

  const [todos, setTodos] = useState(() => {
  const saved = localStorage.getItem('todos')
  return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (input.trim() === '' ) return
    setTodos([... todos, {id: Date.now(), text: input, completed: false}])
    setInput('')
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => todo.id === id? {...todo,completed: !todo.completed}: todo))
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  return (
    <div className ="container">
      <h1>Todo App</h1>
      <div className="input-row">
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={addTodo}>Add</button>
      </div>
      <div className = "filters">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>
      {filteredTodos.map(todo => (
        <div  className="todo-item" key={todo.id}>
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
          <button onClick={()=>toggleTodo(todo.id)}>✓</button>
          <button onClick={()=> deleteTodo(todo.id)}>✕</button>
        </div>
      ))}
    </div>
  )
}

export default App