import { useState } from "react"
import "./style.css"

export default function App(){
  const [newItem, setNewItem] = useState('')
  const [todo, setTodo] = useState([])

  function handleSubmit(e){
    e.preventDefault();
// if you want to pass the current value, you need to pass the current value
    setTodo((currentTodos)=>{
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title: newItem, completed: false}
      ]
    })
    setNewItem('')
    // This sets search bar to zero

  }

  function toggleTodo(id, completed){
    setTodo(currentTodos => {
      return currentTodos.map(todo =>{
        if(todo.id === id){
          return { ...todo, completed}
          // This creates a new state object instead of mutating the state
        }
        return todo;
      })
    })
  }

  function deleteTodo(id){
    setTodo(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
    <>
  <h1 className="header">TimeTamer</h1>
  <p>Take Control of Your Life</p>
  <form className="new-item-form" onSubmit={handleSubmit}>
    <div className="form-row">
      <label htmlFor="item">Add New Item</label>
      <input value={newItem} onChange={e => setNewItem(e.target.value)} type="text" id="item"/>
      {/* setNewItem(e.target.value) is getting the value of the input and setting it as "newItem" This allows us to insert text that is not set in the useState() **UPDATING** */}
    </div>
    <button className="btn">Add+</button>
  </form>
  <h1 className="header"></h1>
  <ul className="list">
    {todo.length === 0 && "No Todos"}
    {todo.map(todo =>{
      return (
        <li key={todo.id}>
          {/* ALWAYS PUT KEY  */}
          {/* id is needed to modify single element without effectiong others */}
          <label>
          <input type="checkbox" checked={todo.completed} onChange={e => toggleTodo(todo.id, e.target.checked)}/>
            {todo.title}
          </label>
          <button className="btn btn-danger" onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
    )
    })}
  </ul>
  </>
  )
}