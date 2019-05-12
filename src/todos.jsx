import { lf, observable, observableKeyedArray } from '@lluz55/lightframework'

export const App = () => {
  let todos = observableKeyedArray()
  let _newTodoValue = observable("")

  let todo = (item, key) => {
    let _checked = observable('text-decoration: none')
    function check(e){
      _checked.setValue(e.target.checked ? 'text-decoration:line-through' : 'text-decoration:none')
    }

    return(
      <li class="item">
        <input type="checkbox" oninput={(e)=>check(e)} name={key}/>
        <label for={key} style={_checked} onclick={(e)=>check(e)}> {item} </label>
        <button onclick={()=>removeTodo(key)}>x</button>
      </li>
    ) 
  }

  let removeTodo = (key) => {
    todos.remove(key)
  }

  let addItemHandler = (e) => {
    if(e.keyCode === 13){
      if(_newTodoValue.getValue() === '') return
      let index = (_newTodoValue.getValue() + todos.getLength()).toString()
      todos.push(index,todo(_newTodoValue.getValue(), index))
      _newTodoValue.setValue('')
      e.target.value = ""
      return
    }
    _newTodoValue.setValue(e.target.value)
  }

  return (
    <div class="content">
      <div class="title">Todo</div>
      <br/>
      <div>
        <input onkeyup={e=> addItemHandler(e)} placeholder={"Adicione um item"} type="text"/>
        {todos}
      </div>
    </div>
  )
}

App.mount = () => {
  document.body.appendChild(App())
}