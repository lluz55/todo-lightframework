import { lf, observable, observableKeyedArray } from '@lluz55/lightframework'

export const App = () => {  

  let todosComponet = () => {
    let todosView = observableKeyedArray()
    let uid = 0
    let todos = []


    let addTodo = (e) => {
      let val = e.target.value
      if(e.keyCode === 13){        
        if(val === '') return 
        let newTodo = {
          id: uid,
          checked: false,
          description: val
        }
        todos.push(newTodo)
        uid++
        todosView.push(newTodo.id,todoComp(newTodo))
        e.target.value = ''        
      }      
    }

    return {
      view: todosView,
      addTodo: addTodo
    }
  }

  let todoComp = newTodo => {
    let _checked = observable('text-decoration: none')
    let _canRemove = observable('display: none')
    function check(e){
      let checked = e.target.checked
      _checked.setValue(checked ? 'item-checked' : '')
      newTodo.checked = checked
    }

    return(
      <li class="item" onmouseenter={()=> _canRemove.setValue('display: block')}
      onmouseleave={()=> _canRemove.setValue('display: none')}
      >
        <label class={_checked} onclick={(e)=>check(e)}>
          <input type="checkbox" oninput={(e)=>check(e)}/>
          {newTodo.description}        
          <span class="checkmark"></span>
        </label> 
        <button style={_canRemove} onclick={()=>removeTodo(newTodo)}>x</button>
      </li>
    ) 
  }

  let removeTodo = todo => {
    todosView.remove(todo.id)
  }

  let todosComp = todosComponet()

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