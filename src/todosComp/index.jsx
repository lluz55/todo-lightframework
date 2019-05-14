import { lf, observableKeyedArray } from '@lluz55/lightframework'

import { todoComp } from '../todoComp'

// Component for todos list
const todosComp = (() => {
  // Holds todos list items
  let todosView = observableKeyedArray()
  // Holds todos items (object)
  let todos = []

  // Remove from list and from view
  let removeTodo = todo => {
    todos.splice(todos.indexOf(todo), 1)
    todosView.remove(todo.id)
  }

  // Start up setup
  let onInit = (() => {
    // Get items saved in localStorage
    todos = localStorage.getItem('todos') && JSON.parse(localStorage.getItem('todos'))
    if (todos === null) {
      todos = []
    } else {
      todos.forEach(todo => {
        todosView.push(todo.id, todoComp(todo, removeTodo, todos))
      })
    }
    // Listen for any change in todos view. e.g new todos being added or removed
    // and save changes to localStorage
    todosView.subscribe(() => {
      localStorage.setItem('todos', JSON.stringify(todos))
    })
  })()

  // Add new todo in todos view and todos object
  let addTodo = (e) => {
    let val = e.target.value
    // Check if enter was pressed
    if (e.keyCode === 13) {
      if (val === '') return
      // Creates the new todo with unic id
      let newTodo = {
        id: Date.now(),
        checked: false,
        description: val
      }
      // adds to todos object and todos view
      todos.push(newTodo)
      todosView.push(newTodo.id, todoComp(newTodo, removeTodo, todos))
      // clear todo input field
      e.target.value = ''
    }
  }

  // Return an object containing the view (todos items) and function to add new todo
  // from outside this function
  return {
    view: todosView,
    addTodo: addTodo
  }
})()

export { todosComp }