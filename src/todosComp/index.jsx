import { lf, observableKeyedArray } from '@lluz55/lightframework'

import { todoComp } from '../todoComp'

const todosComp = (() => {
  let todosView = observableKeyedArray()
  let todos = []

  let removeTodo = todo => {
    todos.splice(todos.indexOf(todo), 1)
    todosView.remove(todo.id)
  }

  let onInit = (() => {
    todos = localStorage.getItem('todos') && JSON.parse(localStorage.getItem('todos'))
    if (todos === null) {
      todos = []
    } else {
      todos.forEach(todo => {
        todosView.push(todo.id, todoComp(todo, removeTodo, todos))
      })
    }
    todosView.subscribe(() => {
      localStorage.setItem('todos', JSON.stringify(todos))
    })
  })()

  let addTodo = (e) => {
    let val = e.target.value
    if (e.keyCode === 13) {
      if (val === '') return
      let newTodo = {
        id: Date.now(),
        checked: false,
        description: val
      }
      todos.push(newTodo)
      todosView.push(newTodo.id, todoComp(newTodo, removeTodo, todos))
      e.target.value = ''
    }
  }

  return {
    view: todosView,
    addTodo: addTodo
  }
})()

export { todosComp }