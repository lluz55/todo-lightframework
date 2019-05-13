import { lf, observable } from "@lluz55/lightframework";

const todoComp = (todo, removeTodo, todos) => {
  let checkedClass = observable(todo.checked ? 'item-checked' : 'text-decoration: none')
  let removeBtn = observable('display: none')

  function check(e) {
    let checked = e.target.checked
    todo.checked = checked
    localStorage.setItem('todos', JSON.stringify(todos))
    checkedClass.setValue(checked ? 'item-checked' : '')
  }

  function onInitCheck(e) {
    e.checked = todo.checked
  }

  return (
    <li class="item" onmouseenter={() => removeBtn.setValue('display: block')}
      onmouseleave={() => removeBtn.setValue('display: none')}
    >
      <label class={checkedClass} onclick={(e) => check(e)}>
        <input type="checkbox" oncreate={onInitCheck} oninput={(e) => check(e)} />
        <div>{todo.description}</div>
        <span class="checkmark"></span>
      </label>
      <button style={removeBtn} onclick={() => removeTodo(todo)}>x</button>
    </li>
  )
}

export { todoComp }