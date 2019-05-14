import { lf } from '@lluz55/lightframework'

import { todosComp } from './todosComp'

export const App = () => {

  return (
    <div class="content">
      <div class="title">Todo</div>
      <br />
      <div>
        <input onkeyup={e => todosComp.addTodo(e)} placeholder="What needs to be done?" type="text" />
        <ul>{todosComp.view}</ul>
      </div>
    </div>
  )
}

// Render app to the DOM
App.mount = () => {
  document.body.appendChild(App())
}