import { lf,  observable } from "@lluz55/lightframework";

const todoComp = (newTodo, removeTodo) => {
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
        <div>{newTodo.description}</div>
        <span class="checkmark"></span>
      </label> 
      <button style={_canRemove} onclick={()=>removeTodo(newTodo)}>x</button>
    </li>
  ) 
}

export { todoComp }