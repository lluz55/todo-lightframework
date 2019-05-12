import { lf, observable, observableKeyedArray } from '@lluz55/lightframework'

import { todosComp } from './todosComp'

export const App = () => {  

  // let todosComp = (() => {
  //   let todosView = observableKeyedArray()
  //   let uid = 0
  //   let todos = []

  //   let removeTodo = todo => {
  //     todos.splice(todos.indexOf(todo), 1)
  //     todosView.remove(todo.id)
  //   }

  //   let onInit = (() => {
  //     todos = localStorage.getItem('todos') && JSON.parse(localStorage.getItem('todos'))
  //     if(todos === null) {
  //       todos = []
  //     } else {
  //       todos.forEach(todo => {
  //         todosView.push(todo.id, todoComp(todo, removeTodo))
  //       })
  //     }
  //     todosView.subscribe(()=> {
  //       localStorage.setItem('todos', JSON.stringify(todos))
  //     })
  //   })()

  //   let addTodo = (e) => {
  //     let val = e.target.value
  //     if(e.keyCode === 13){        
  //       if(val === '') return 
  //       let newTodo = {
  //         id: uid,
  //         checked: false,
  //         description: val
  //       }
  //       todos.push(newTodo)
  //       uid++
  //       todosView.push(newTodo.id,todoComp(newTodo,removeTodo))
  //       e.target.value = ''        
  //     }
  //   }

  //   return {
  //     view: todosView,
  //     addTodo: addTodo
  //   }
  // })()

  return (
    <div class="content">
      <div class="title">Todo</div>
      <br/>
      <div>
        <input onkeyup={e=> todosComp.addTodo(e)} placeholder="What needs to be done?" type="text"/>
        <ul>{todosComp.view}</ul>
      </div>
    </div>
  )
}


App.mount = () => {
  document.body.appendChild(App())
}